import { type RestaurantRequest } from "@/api-contract/restautant.schema";
import { prisma } from "@/server/db";

export class RestaurantEntity {
  async create(data: RestaurantRequest, userId: string) {
    const { title, description } = data;
    const response = await prisma.restaurant.create({
      data: {
        title,
        description,
        user: {
          connect: { id: userId },
        },
      },
    });

    return response;
  }

  async show(userId: string) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { userId },
      include: { menu: true },
    });

    return restaurant;
  }

  async delete(id: string, userId: string) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
    });

    if (restaurant?.userId !== userId) {
      throw new Error("Forbidden");
    }

    return await prisma.restaurant.delete({ where: { id: id } });
  }
}
