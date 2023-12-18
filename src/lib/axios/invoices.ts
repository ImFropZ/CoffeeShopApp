import { jsonAxios } from "@/config/axios";
import { invoiceSchema } from "@/schema";
import { z } from "zod";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export async function getInvoices(dateRange?: DateRange) {
  return jsonAxios
    .get<{ data: unknown }>("/invoices", {
      params: {
        start_date: dateRange?.from && dateRange?.to
          ? format(dateRange.from, "yyyy-MM-dd")
          : undefined,
        end_date: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
      },
    })
    .then(async (res) => {
      const result = await z.array(invoiceSchema).spa(res.data.data);
      if (!result.success) {
        throw new Error(result.error.message);
      }

      return result.data;
    });
}
