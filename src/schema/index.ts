import * as z from "zod";

export const messageResponseSchema = z.object({
  message: z.string(),
});

export const roleSchema = z.enum(["ADMIN", "USER", "CASHIER", "STOCK"]);

export const cupSizeSchema = z.enum(["SMALL", "MEDIUM", "LARGE"]);

export const drinkTypeSchema = z.enum(["COLD", "HOT", "FRAPPE"]);
