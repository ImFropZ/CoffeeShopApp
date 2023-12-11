import { formAxios, jsonAxios } from "@/config/axios";
import { drinkTypeSchema } from "@/schema";
import { menuSchema } from "@/schema/menus";
import * as z from "zod";

export type CreateMenu = {
  name: string;
  drinkType: z.infer<typeof drinkTypeSchema>;
  categories: string;
};

export type UpdateMenu = {
  name?: string;
  drinkType?: z.infer<typeof drinkTypeSchema>;
  categories?: string;
};

export type UpdateMenuItem = {
  id: string;
  price?: number;
  picture?: File;
  isActive?: boolean;
};

export async function getMenus() {
  return await jsonAxios
    .get<{ data: Array<z.infer<typeof menuSchema>> }>("/menus")
    .then((res) => res.data);
}

export async function createMenu(data: CreateMenu) {
  return await jsonAxios
    .post<{ data: z.infer<typeof menuSchema> }>("/menus", data)
    .then((res) => res.data.data);
}

export async function updateMenu(id: string, data: UpdateMenu) {
  return await jsonAxios
    .put<{ data: z.infer<typeof menuSchema> }>("/menus/" + id, data)
    .then((res) => res.data.data);
}

export async function updateMenuItems(id: string, data: UpdateMenuItem[]) {
  const promises = data.map((item) => {
    const form = new FormData();
    form.append("id", item.id);
    if (item.price) form.append("price", item.price.toString());
    if (item.picture) form.append("picture", item.picture);
    if (item.isActive) form.append("isActive", item.isActive.toString());

    return formAxios.put<z.infer<typeof menuSchema>>(
      "/menus/" + id + "/items",
      item,
    );
  });

  return Promise.all(promises).then((res) => res.map((r) => r.data));
}
