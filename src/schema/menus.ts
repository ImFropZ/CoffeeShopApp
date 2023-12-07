import * as z from "zod";
import { cupSizeSchema, drinkTypeSchema } from ".";

export const menuItemSchema = z.object({
  id: z.string().uuid(),
  cupSize: cupSizeSchema,
  price: z.number().min(0),
  picture: z.string(),
  isActive: z.boolean(),
});

export const menuSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  drinkType: drinkTypeSchema,
  categories: z.array(z.string()),
  menuItems: z.array(menuItemSchema),
});
