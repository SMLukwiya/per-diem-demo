import { z } from "zod";

export const menuItemRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  menuId: z.string(),
});

export const menuItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  menuId: z.string(),
  createdAt: z.date().or(z.string()),
});

export const menuItemListSchema = z.array(menuItemSchema);
