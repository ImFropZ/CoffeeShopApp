import axios from "@/config/axios";
import { placeOrderSchema } from "@/schema/order";
import { z } from "zod";

export async function placeOrder(data: z.infer<typeof placeOrderSchema>) {
  return axios.post<{ data: string }>("/orders", data).then((res) => res.data);
}
