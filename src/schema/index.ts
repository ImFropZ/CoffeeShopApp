import * as z from "zod";

export const messageResponseSchema = z.object({
  message: z.string(),
});

export const roleSchema = z.enum(["ADMIN", "USER", "CASHIER", "STOCK"]);

export const cupSizeSchema = z.enum(["SMALL", "MEDIUM", "LARGE"]);

export const drinkTypeSchema = z.enum(["COLD", "HOT", "FRAPPE"]);

export const invoiceItemSchema = z.object({
  id: z.string(),
  quantity: z.preprocess((val) => Number(val), z.number()),
  sugar: z.preprocess((val) => Number(val), z.number()),
  ice: z.preprocess((val) => Number(val), z.number()),
  price: z.preprocess((val) => Number(val), z.number()),
  attributes: z.string(),
});

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  address: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  username: z.string(),
  role: roleSchema,
  email: z.string().or(z.null()),
});

export const invoiceSchema = z.object({
  id: z.string(),
  cashier: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string().or(z.null()),
  }),
  createdAt: z.string(),
  customer: customerSchema.or(z.null()),
  discount: z.preprocess((val) => Number(val), z.number()),
  total: z.preprocess((val) => Number(val), z.number()),
  items: z.array(invoiceItemSchema),
});
