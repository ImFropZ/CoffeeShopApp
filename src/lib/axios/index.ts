import { jsonAxios } from "@/config/axios";
import { z } from "zod";

export const getCategoies = async () => {
  return await jsonAxios
    .get<{ data: unknown }>("/menus/categories")
    .then(async (res) => {
      const result = await z.array(z.string()).spa(res.data.data);

      if (!result.success) {
        throw new Error("Invalid response");
      }

      return result.data;
    });
};
