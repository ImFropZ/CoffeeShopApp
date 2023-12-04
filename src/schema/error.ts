import * as z from "zod";

export const ErrorSchema = z.object({
  message: z.string(),
});
