import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { menuSchema } from "@/api-contract/menu.schema";

export const menuRouter = createTRPCRouter({
  show: protectedProcedure
    .input(z.object({ restaurantId: z.string() }))
    .output(z.nullable(menuSchema))
    .query(async ({ input, ctx }) => {
      const menu = await ctx.prisma.menu.findUnique({
        where: { id: input.restaurantId },
        include: { items: true },
      });

      return menu;
    }),
  list: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.menu.findMany({
        where: {
          restaurantId: input.id,
        },
        include: { items: true },
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
