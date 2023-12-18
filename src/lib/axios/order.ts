import { jsonAxios } from "@/config/axios";

export type OrderParams = {
  customerId?: string;
  discount: number;
  menus: {
    id: string;
    quantity: number;
    ice: number;
    sugar: number;
    attributes: string;
  }[];
};

export async function placeOrder(data: OrderParams) {
  if (data.menus.length === 0) return;

  return await jsonAxios
    .post<{ data: string }>("/orders", data)
    .then((res) => res.data.data);
}
