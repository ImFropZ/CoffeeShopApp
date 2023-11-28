import { ColumnDef } from "@tanstack/react-table";
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
import { StockItemDataTable } from ".";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useAppSelector } from "@/hooks/redux";
import { format } from "date-fns";

export type Stock = {
  id: string;
  name: string;
};

export const stockColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ cell }) => {
      return (
        <div className="w-32 overflow-clip whitespace-nowrap">
          {cell.row.original.id}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ cell }) => {
      const stockItems = useAppSelector((state) => {
        const stocks = state.stocks.data;

        const id = cell.row.original.id;
        const stock = stocks.find((stock) => stock.id === id);

        return stock?.items || [];
      });

      return (
        <AlertDialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Stock</Button>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="ml-2 bg-red-500 text-white hover:bg-red-600 hover:text-white"
              >
                Remove
              </Button>
            </AlertDialogTrigger>
            <DialogContent className="sm:max-w-[42rem]">
              <DialogHeader>
                <DialogTitle>Edit stock items</DialogTitle>
                <DialogDescription>
                  Make changes to your stock items here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="relative h-72">
                <StockItemDataTable
                  columns={stockItemColumns}
                  data={stockItems}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                The remove actions will not create a stock report. You can
                decrease the quantity instead.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export type StockItem = {
  id: string;
  expiresDate: string;
  quantity: number;
  price: number;
};

export const stockItemColumns: ColumnDef<StockItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ cell }) => {
      return (
        <div className="w-32 overflow-clip whitespace-nowrap">
          {cell.row.original.id}
        </div>
      );
    },
  },
  {
    id: "expiresDate",
    accessorKey: "expiresDate",
    header: "Expires Date",
    cell: ({ cell }) => {
      return (
        <div className="w-32 overflow-clip whitespace-nowrap">
          {format(new Date(cell.row.original.expiresDate), "d MMM yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    header: "Actions",
    cell: () => {
      return (
        <AlertDialog>
          <div className="flex gap-2">
            <Button variant="outline">-</Button>
            <Button variant="outline">+</Button>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
              >
                x
              </Button>
            </AlertDialogTrigger>
          </div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                The remove actions will not create a stock report. You can
                decrease the quantity instead.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
