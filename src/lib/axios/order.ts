import { jsonAxios } from "@/config/axios";
import { placeOrderSchema } from "@/schema/order";
import { z } from "zod";

export async function placeOrder(data: z.infer<typeof placeOrderSchema>) {
  return jsonAxios
    .post<{ data: string }>("/orders", data)
    .then((res) => res.data);
}
