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

export type Stock = {
  id: string;
  name: string;
};

export const stockColumns: ColumnDef<Stock>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      // Mock Data
      const data: StockItem[] = [];
      Array.from({ length: 100 }).forEach((_, index) => {
        data.push({
          id: index + "",
          expireDate: "2021-10-10",
          quantity: 10,
          price: 100,
        });
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
                <StockItemDataTable columns={stockItemColumns} data={data} />
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
  expireDate: string;
  quantity: number;
  price: number;
};

export const stockItemColumns: ColumnDef<StockItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "expireDate",
    accessorKey: "expireDate",
    header: "Expire Date",
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
