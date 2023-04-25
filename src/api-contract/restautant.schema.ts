import { z } from "zod";

export const restaurantDefaultSchema = z.object({
  id: z.string(),
});

export const restaurantRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const restaurantSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
    createdAt: z.date().or(z.string()),
  })
  .nullable();

export const restaurantListSchema = z.array(restaurantSchema);

export type RestaurantRequest = z.TypeOf<typeof restaurantRequestSchema>;
export type RestaurantResponse = z.TypeOf<typeof restaurantSchema>;
