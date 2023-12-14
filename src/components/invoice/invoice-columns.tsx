import { ColumnDef } from "@tanstack/react-table";
import { LuPrinter } from "react-icons/lu";
import { Button } from "../ui/button";
import { z } from "zod";
import { invoiceSchema } from "@/schema";

export const invoiceColumns: ColumnDef<z.infer<typeof invoiceSchema>>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    header: "Customer",
    cell: ({ cell }) => {
      return <div>{cell.row.original.customer?.name || ""}</div>;
    },
  },
  {
    header: "Cashier",
    cell: ({ cell }) => {
      return <div>{cell.row.original.cashier.fullName}</div>;
    },
  },
  {
    header: "Date",
    cell: ({ cell }) => {
      return <div>{cell.row.original.createdAt}</div>;
    },
  },
  {
    header: "Discount%",
    cell: ({ cell }) => {
      return <div>{0}</div>;
    },
  },
  {
    header: "Actions",
    cell: () => {
      return (
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="bg-slate-200 text-black hover:bg-slate-300 hover:text-black"
          >
            <LuPrinter />
          </Button>
        </div>
      );
    },
  },
];
