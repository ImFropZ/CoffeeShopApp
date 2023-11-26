import * as z from "zod";

export const messageResponseSchema = z.object({
  message: z.string(),
});

export const roleSchema = z.enum(["ADMIN", "USER", "CASHIER", "STOCK"]);
