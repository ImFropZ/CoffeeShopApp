import { z } from "zod";

export const stockItemSchema = z.object({
  id: z.string().uuid(),
  expiresDate: z.string(),
  quantity: z.number(),
  price: z.number(),
  stockId: z.string().uuid(),
});

export const stockSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  items: z.array(stockItemSchema),
});
