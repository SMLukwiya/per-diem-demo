import { type NextApiRequest, type NextApiResponse } from "next";
import formidable from "formidable";
import { getSession } from "next-auth/react";
import { type ServerFile } from "@/api-contract/menu.schema";
import { PDFExtract } from "pdf.js-extract";

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

  if (!session) {
    return res.status(401).json("Not authenticated");
  }

  try {
    const { files } = await parseRequest(req);
    const data = files as ServerFile;
    // parse file and make request to chatgpt
    const fileData = await extractPdf(data.file.filepath);
    console.log(fileData);
    return res.status(201).json({ message: "Done" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message);
    }
    throw error;
  }
}

function parseRequest(
  req: NextApiRequest
): Promise<{ files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const options = {
      multiple: false,
      allowEmptyFiles: false,
    };
    const form = formidable(options);

    form.parse(req, (err, _fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ files });
    });
  });
}

async function extractPdf(filePath: string) {
  const pdfExtract = new PDFExtract();
  const data = await pdfExtract.extract(filePath);
  return data;
}
