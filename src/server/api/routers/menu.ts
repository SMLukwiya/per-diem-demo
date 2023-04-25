import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { menuSchema } from "@/api-contract/menu.schema";
import { MenuEntity } from "@/business-logic/menu";

export const menuRouter = createTRPCRouter({
  show: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(z.nullable(menuSchema))
    .query(async ({ input }) => {
      const entity = new MenuEntity();

      return await entity.show(input.id);
    }),
  list: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const entity = new MenuEntity();

      return await entity.list(input.id);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string(), restaurantId: z.string() }))
    .mutation(async ({ input }) => {
      const entity = new MenuEntity();

      return await entity.delete(input.id, input.restaurantId);
    }),
});
