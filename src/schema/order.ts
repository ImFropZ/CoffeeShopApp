import { z } from "zod";
import { cupSizeSchema } from ".";

export const menuItemOrderSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().min(1),
  sugar: z.number().min(0).max(1),
  ice: z.number().min(0).max(1),
  cupSize: cupSizeSchema,
  attributes: z.string(),
});

export const placeOrderSchema = z.object({
  menus: z.array(menuItemOrderSchema),
  customerId: z.string().uuid(),
});
