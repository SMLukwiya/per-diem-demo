import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { menuItemRequestSchema } from "@/api-contract/menu.schema";
import {
  menuItemListSchema,
  menuItemSchema,
} from "@/api-contract/menuItem.schema";

export const menuItemRouter = createTRPCRouter({
  create: protectedProcedure
    .input(menuItemRequestSchema)
    .mutation(async ({ input, ctx }) => {
      const { title, description, price, menuId } = input;
      const response = await ctx.prisma.menuItem.create({
        data: {
          title,
          description,
          price,
          menu: {
            connect: { id: menuId },
          },
        },
      });

      return response;
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(menuItemSchema)
    .query(async ({ input, ctx }) => {
      const menuItem = await ctx.prisma.menuItem.findUnique({
        where: { id: input.id },
      });

      if (!menuItem) {
        throw new Error("Not Found");
      }

      return menuItem;
    }),
  list: protectedProcedure
    .input(z.object({ menuId: z.string() }))
    .output(menuItemListSchema)
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.menuItem.findMany({
        where: {
          menuId: input.menuId,
        },
      });

      return response;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string(), menuId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { menuId, id } = input;
      const menuItem = await ctx.prisma.menuItem.findUnique({
        where: { id: menuId },
      });

      if (menuItem?.menuId !== menuId) {
        throw new Error("Forbidden");
      }

      return await ctx.prisma.menuItem.delete({ where: { id: id } });
    }),
});
