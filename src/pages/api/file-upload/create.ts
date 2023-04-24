import { type NextApiRequest, type NextApiResponse } from "next";
import formidable from "formidable";
import { getSession } from "next-auth/react";
import { type MenuRequest, type ServerFile } from "@/api-contract/menu.schema";
import pdfParse from "pdf-parse";
import { readFileSync } from "fs";
import { Configuration, OpenAIApi } from "openai";
import { prisma } from "@/server/db";

const configuration = new Configuration({
  organization: "org-jGwCTgBd7LlDlhS1hi6UwrDD",
  apiKey: process.env.OPEN_AI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;

  const session = await getSession({ req });
  const openai = new OpenAIApi(configuration);

  if (!session) {
    return res.status(401).json("Not authenticated");
  }

  try {
    const { files, fields } = await parseRequest(req);
    const data = files as unknown as ServerFile;
    const restaurantId = fields.restaurantId as string;
    const buffer = readFileSync(data.file.filepath);
    const fileData2 = await pdfParse(buffer);
    const textData = `${fileData2.text.substring(0, 4000)}`;
    const prompt = `${textData}. Can you please return a JSON representation of the provided data?.`;
    const JSONResult = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1.0,
    });

    const menus = transformData(JSONResult.data.choices[0]?.text);

    if (!menus)
      return res.status(400).json("Sorry, could not complete request");

    const response = await saveToDB(menus, restaurantId);

    console.log(response);

    return res.status(201).json({ restaurantId });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    throw error;
  }
}

function parseRequest(
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const options: formidable.Options = {
      multiples: false,
      allowEmptyFiles: false,
      keepExtensions: true,
    };
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files });
    });
  });
}

interface ParsedData {
  [title: string]: {
    [item: string]: string;
  };
}

function transformData(data?: string) {
  if (!data) return;
  const menus: MenuRequest[] = [];
  const parsedResponse = JSON.parse(data) as ParsedData;
  for (const menu in parsedResponse) {
    const menuItems = [];
    for (const item in parsedResponse[menu]) {
      menuItems.push({
        title: item,
        price: parsedResponse[menu]?.[item] || "",
      });
    }
    menus.push({ title: menu, items: menuItems });
  }
  return menus;
}

async function saveToDB(menus: MenuRequest[], restaurantId: string) {
  const menuPromise = menus.map((menu) => {
    return prisma.menu.create({
      data: {
        title: menu.title,
        restaurant: {
          connect: { id: restaurantId },
        },
        items: {
          createMany: {
            data: menu.items.map((item) => ({
              title: item.title,
              price: `${item.price}`,
            })),
          },
        },
      },
    });
  });

  const response = await Promise.all(menuPromise);
  return response;
}