import axios from "@/config/axios";
import {
  createMenuSchema,
  menuSchema,
  menuItemResponseSchema,
} from "@/schema/menus";
import * as z from "zod";

export async function getMenus() {
  return axios
    .get<{ data: Array<z.infer<typeof menuSchema>> }>("/menus")
    .then((res) => res.data);
}

export async function createMenu(data: z.infer<typeof createMenuSchema>) {
  return axios
    .post<z.infer<typeof menuItemResponseSchema>>("/menus", data)
    .then((res) => res.data);
}

export async function updateMenu(
  id: string,
  data: z.infer<typeof createMenuSchema>,
) {
  return axios
    .put<z.infer<typeof menuItemResponseSchema>>("/menus/" + id, data)
    .then((res) => res.data);
}
