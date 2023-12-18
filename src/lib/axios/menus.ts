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
  image?: File;
  isActive?: boolean;
};

export async function getMenus(category?: string) {
  const params = {
    category: category ? category : "",
  };
  return await jsonAxios
    .get<{ data: Array<z.infer<typeof menuSchema>> }>("/menus", { params })
    .then((res) => res.data.data);
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
  const form = new FormData();

  data.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      // @ts-ignore
      if (!item[key]) {
        return;
      }

      form.append(
        `items[${index}][${key}]`,
        // @ts-ignore
        item[key] instanceof File ? item[key] : item[key].toString(),
      );
    });
  });

  return await formAxios.put<{ data: z.infer<typeof menuSchema> }>(
    "/menus/" + id + "/items",
    form,
  );
}
