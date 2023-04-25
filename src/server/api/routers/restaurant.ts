import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  restaurantRequestSchema,
  restaurantSchema,
} from "@/api-contract/restautant.schema";
import { RestaurantEntity } from "@/business-logic/restaurant";

export const restaurantRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ data: restaurantRequestSchema, userId: z.string() }))
    .mutation(async ({ input }) => {
      const entity = new RestaurantEntity();

      return await entity.create(input.data, input.userId);
    }),
  show: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .output(restaurantSchema)
    .query(async ({ input }) => {
      const entity = new RestaurantEntity();

      return await entity.show(input.userId);
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const { userId, id } = input;
      const entity = new RestaurantEntity();

      return await entity.delete(id, userId);
    }),
});
