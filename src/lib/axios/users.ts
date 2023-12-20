import { jsonAxios } from "@/config/axios";
import { roleSchema } from "@/schema";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  username: z.string(),
  role: roleSchema,
  email: z.string().email().nullable(),
});

export type UpdateUser = {
  fullName?: string;
  role?: z.infer<typeof roleSchema>;
  email?: string;
  newPassword?: string;
};

export async function getUsers() {
  return await jsonAxios.get<{ data: unknown }>("/users").then(async (res) => {
    const result = await z.array(userSchema).spa(res.data.data);
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data;
  });
}

export async function updateUser(username: string, user: UpdateUser) {
  return await jsonAxios.put(`/users/${username}`, user);
}
