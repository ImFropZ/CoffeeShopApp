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
  data.discount = data.discount / 100;

  return await jsonAxios
    .post<{ data: string }>("/orders", data)
    .then((res) => res.data.data);
}
