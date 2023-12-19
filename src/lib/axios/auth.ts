import { formAxios, jsonAxios } from "@/config/axios";
import {
  loginResponseSchema,
  loginSchema,
  profileSchema,
  registerResponseSchema,
  registerSchema,
} from "@/schema/auth";
import * as z from "zod";

export async function getProfile() {
  return jsonAxios
    .get<z.infer<typeof profileSchema>>("/auth/me")
    .then((res) => res.data);
}

export async function login(data: z.infer<typeof loginSchema>) {
  return jsonAxios
    .post<z.infer<typeof loginResponseSchema>>("/auth/login", data)
    .then((res) => res.data);
}

export async function register(data: z.infer<typeof registerSchema>) {
  return jsonAxios
    .post<z.infer<typeof registerResponseSchema>>("/auth/register", data)
    .then((res) => res.data);
}

export async function updateProfile(data: FormData) {
  return formAxios
    .put<z.infer<typeof profileSchema>>("/auth/me", data)
    .then((res) => res.data);
}

export async function forgotPassword(data: string) {
  return jsonAxios
    .post<{ message: string }>("/auth/forgot-password", {
      data,
    })
    .then((res) => res.data.message);
}

export async function verifyToken(data: {
  data: string;
  newPassword: string;
  token: string;
}) {
  return jsonAxios
    .post<{ message: string }>("/auth/verify-token", data)
    .then((res) => res.data.message);
}
