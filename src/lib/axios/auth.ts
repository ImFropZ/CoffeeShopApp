import axios from "@/config/axios";
import { messageResponseSchema } from "@/schema";
import {
  loginSchema,
  profileSchema,
  registerResponseSchema,
  registerSchema,
} from "@/schema/auth";
import * as z from "zod";

export async function getProfile() {
  return axios
    .get<z.infer<typeof profileSchema>>("/auth/me")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function login(data: z.infer<typeof loginSchema>) {
  return axios
    .post<z.infer<typeof messageResponseSchema>>("/auth/login", data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function logout() {
  return axios
    .post<z.infer<typeof messageResponseSchema>>("/auth/logout")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function register(data: z.infer<typeof registerSchema>) {
  return axios
    .post<z.infer<typeof registerResponseSchema>>("/auth/register", data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
