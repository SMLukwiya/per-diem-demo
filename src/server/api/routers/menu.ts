import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { menuRequestSchema, menuSchema } from "@/api-contract/menu.schema";

export const menuRouter = createTRPCRouter({
  create: protectedProcedure
    .input(menuRequestSchema)
    .mutation(async ({ input, ctx }) => {
      const { title, description, restaurantId } = input;
      const response = await ctx.prisma.menu.create({
        data: {
          title,
          description,
          restaurant: {
            connect: { id: restaurantId },
          },
        },
      });

      return response;
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(menuSchema)
    .query(async ({ input, ctx }) => {
      const menu = await ctx.prisma.menu.findUnique({
        where: { id: input.id },
        include: { items: true },
      });

      if (!menu) {
        throw new Error("Not Found");
      }

      return menu;
    }),
  list: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.menu.findMany({
        where: {
          restaurantId: input.id,
        },
      });

      return response;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string(), restaurantId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id, restaurantId } = input;
      const menu = await ctx.prisma.menu.findUnique({ where: { id: id } });

      if (menu?.restaurantId !== restaurantId) {
        throw new Error("Forbidden");
      }

      return await ctx.prisma.menu.delete({ where: { id } });
    }),
});
