import { ColumnDef } from "@tanstack/react-table";
import { LuPrinter } from "react-icons/lu";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Customer } from "../customer";
import { User } from "../user";

export type Invoice = {
  id: string;
  customer: Customer;
  cashier: User;
  date: string;
  discount: number;
  totalPrice: number;
};

export const invoiceColumns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    header: "Customer",
    cell: ({ cell }) => {
      return <div>{cell.row.original.customer.name}</div>;
    },
  },
  {
    header: "Cashier",
    cell: ({ cell }) => {
      return <div>{cell.row.original.cashier.name}</div>;
    },
  },
  {
    header: "Date",
    cell: ({ cell }) => {
      return <div>{cell.row.original.date}</div>;
    },
  },
  {
    header: "Discount%",
    cell: ({ cell }) => {
      return <div>{cell.row.original.discount}</div>;
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
