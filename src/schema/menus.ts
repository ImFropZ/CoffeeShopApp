import * as z from "zod";
import { cupSizeSchema } from ".";

export const menuItemSchema = z.object({
  id: z.string().uuid(),
  price: z.number().min(0),
  cupSize: cupSizeSchema,
});

export const menuSchema = z.object({
  name: z.string(),
  picture: z.string().url(),
  data: z.array(menuItemSchema),
});

export const createMenuSchema = z.object({
  name: z.string(),
  picture: z.string(),
  price: z.number(),
  cupSize: cupSizeSchema,
});

export const updateMenuSchema = z.object({
  id: z.string(),
  name: z.string(),
  picture: z.string(),
  price: z.number().min(0),
  cupSize: cupSizeSchema,
});

// For update and create
export const menuItemResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  picture: z.string().url(),
  price: z.number().min(0),
  cupSize: cupSizeSchema,
});
