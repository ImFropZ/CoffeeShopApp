import axios from "@/config/axios";
import { StockUpdate } from "@/redux/stock";
import { stockItemSchema, stockSchema } from "@/schema/stock";
import { z } from "zod";

export const getStocks = async () => {
  const res = await axios.get<{ data: z.infer<typeof stockSchema>[] }>(
    "/stocks",
  );
  return res.data.data;
};

export const createStock = async (name: string) => {
  const res = await axios.post<{
    data: Omit<z.infer<typeof stockSchema>, "items">;
  }>("/stocks", {
    name,
  });
  return res.data.data;
};

export const getStockItems = async (id: string) => {
  const res = await axios.get<{ data: z.infer<typeof stockItemSchema>[] }>(
    "/stocks/" + id + "/items",
  );
  return res.data.data;
};

export const createStockItem = async (
  stockId: string,
  expiresDate: string,
  quantity: number,
  price: number,
) => {
  const res = await axios.post<{ data: z.infer<typeof stockItemSchema> }>(
    "/stocks/" + stockId + "/items",
    {
      expiresDate,
      quantity,
      price,
    },
  );
  return res.data.data;
};

export const removeStockItem = async (stockId: string, stockItemId: string) => {
  const res = await axios.delete<{ data: z.infer<typeof stockItemSchema> }>(
    "/stocks/" + stockId + "/items/" + stockItemId,
  );
  return res.data.data;
};

export const updateStockItems = async (data: StockUpdate[]) => {
  const res = await axios.put<{ data: z.infer<typeof stockItemSchema>[] }>(
    "/stocks/items",
    [...data],
  );
  return res.data.data;
};
