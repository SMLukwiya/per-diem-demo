import { z } from "zod";

export const menuItemRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  menuId: z.string(),
});

export const menuRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  restaurantId: z.string(),
});

export const menuSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  restaurantId: z.string(),
  createdAt: z.date().or(z.string()),
});

export const menuListSchema = z.array(menuSchema);

export const serverFileSchema = z.object({
  file: z.object({
    filepath: z.string(),
    mimetype: z.string(),
    newFilename: z.string(),
    originalFilename: z.string(),
    size: z.number(),
    lastModifiedDate: z.date(),
  }),
});

export type ServerFile = z.TypeOf<typeof serverFileSchema>;
export type MenuItemRequest = z.TypeOf<typeof menuItemRequestSchema>;
export type MenuRequest = z.TypeOf<typeof menuRequestSchema>;
