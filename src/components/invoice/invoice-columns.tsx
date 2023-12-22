import { ColumnDef } from "@tanstack/react-table";
import { LuEye, LuPrinter } from "react-icons/lu";
import { Button } from "../ui/button";
import { z } from "zod";
import { invoiceSchema } from "@/schema";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

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
      return <div>{cell.row.original.discount * 100}</div>;
    },
  },
  {
    header: "Subtotal",
    cell: ({ cell }) => {
      return <div>{cell.row.original.subTotal}</div>;
    },
  },
  {
    header: "Total",
    cell: ({ cell }) => {
      return <div>{cell.row.original.total}</div>;
    },
  },
  {
    header: "Actions",
    cell: ({ cell }) => {
      const { items } = cell.row.original;

      return (
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-slate-200 text-black hover:bg-slate-300 hover:text-black"
              >
                <LuEye />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl">
              <table className="table-auto border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="py-2 text-left">Name</th>
                    <th className="py-2 text-left">Price</th>
                    <th className="py-2 text-left">Quantity</th>
                    <th className="py-2 text-left">Sugar</th>
                    <th className="py-2 text-left">Ice</th>
                    <th className="py-2">Attributes</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    return (
                      <tr
                        key={`${item.id}-${item.cupSize}-${item.ice}-${item.price}-${item.attributes}-${item.sugar}`}
                      >
                        <td className="py-2">
                          {item.name} - {item.cupSize}
                        </td>
                        <td className="py-2">{item.price}</td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">{item.sugar}</td>
                        <td className="py-2">{item.ice}</td>
                        <td className="py-2">
                          {item.attributes !== "" ? (
                            item.attributes
                          ) : (
                            <span className="inline-block w-full text-center text-gray-400">
                              (none)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="bg-blue-200 text-black hover:bg-blue-300 hover:text-black"
          >
            <LuPrinter />
          </Button>
        </div>
      );
    },
  },
];
