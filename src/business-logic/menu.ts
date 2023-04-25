import { type MenuRequest } from "@/api-contract/menu.schema";
import { prisma } from "@/server/db";

export class MenuEntity {
  async create(menus: MenuRequest[], restaurantId: string) {
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

  async show(id: string) {
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: { items: true },
    });

    return menu;
  }

  async list(id: string) {
    const response = await prisma.menu.findMany({
      where: {
        restaurantId: id,
      },
      include: { items: true },
    });

    return response;
  }

  async delete(id: string, restaurantId: string) {
    const menu = await prisma.menu.findUnique({ where: { id: id } });

    if (menu?.restaurantId !== restaurantId) {
      throw new Error("Forbidden");
    }

    return await prisma.menu.delete({ where: { id } });
  }
}
