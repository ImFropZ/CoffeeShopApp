import * as z from "zod";
import { roleSchema } from ".";

export const profileSchema = z.object({
  email: z.string().email().nullable(),
  username: z.string(),
  role: roleSchema,
  fullName: z.string(),
  picture: z.object({
    url: z.string(),
  }),
});

export const loginSchema = z.object({
  data: z.string().or(z.string().email()),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  tokenType: z.enum(["Bearer"]),
  expiresIn: z.number(),
  role: roleSchema,
});

export const registerSchema = z.object({
  email: z.string().email().optional(),
  username: z.string(),
  password: z.string(),
});

export const registerResponseSchema = z.object({
  username: z.string(),
  email: z.string().email().nullable(),
  role: roleSchema,
  fullName: z.string(),
});
