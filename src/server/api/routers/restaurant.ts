import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  restaurantListSchema,
  restaurantRequestSchema,
  restaurantSchema,
} from "@/api-contract/restautant.schema";

export const restaurantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(restaurantRequestSchema)
    .mutation(async ({ input, ctx }) => {
      const { title, description, userId } = input;
      const response = await ctx.prisma.restaurant.create({
        data: {
          title,
          description,
          user: {
            connect: { id: userId },
          },
        },
      });

      return response;
    }),
  getById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .output(restaurantSchema)
    .query(async ({ input, ctx }) => {
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { userId: input.userId },
        include: { menu: true },
      });

      return restaurant;
    }),
  list: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .output(restaurantListSchema)
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.restaurant.findMany({
        where: {
          userId: input.userId,
        },
      });

      return response;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId, id } = input;
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { id: userId },
      });

      if (restaurant?.userId !== userId) {
        throw new Error("Forbidden");
      }

      return await ctx.prisma.restaurant.delete({ where: { id: id } });
    }),
});
