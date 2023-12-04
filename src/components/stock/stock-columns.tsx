import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { format } from "date-fns";
import { removeStockItem, updateStockItem } from "@/redux/stock";

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
        <div className="w-32 overflow-auto pb-4 whitespace-nowrap">
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Stock</Button>
          </DialogTrigger>

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
                stockId={cell.row.original.id}
              />
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export type StockItem = {
  id: string;
  expiresDate: string;
  quantity: number;
  price: number;
  stockId: string;
};

export const stockItemColumns: ColumnDef<StockItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ cell }) => {
      return (
        <div className="w-32 overflow-auto whitespace-nowrap pb-4">
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
        <div className="w-32 whitespace-nowrap">
          {format(new Date(cell.row.original.expiresDate), "d MMM yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ cell }) => {
      const { id } = cell.row.original;
      const stockUpdates = useAppSelector((state) => state.stocks.stockUpdates);

      const updateStockItemQty = stockUpdates.find((stock) => stock.id === id)
        ?.quantity;

      const quantity =
        updateStockItemQty === undefined
          ? cell.row.original.quantity
          : updateStockItemQty;

      return (
        <div className="w-16 overflow-clip whitespace-nowrap">{quantity}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    header: "Actions",
    cell: ({ cell }) => {
      const dispatch = useAppDispatch();
      const stockUpdates = useAppSelector((state) => state.stocks.stockUpdates);
      const { id, stockId } = cell.row.original;

      const updateStockItemQty = stockUpdates.find((stock) => stock.id === id)
        ?.quantity;

      const quantity =
        updateStockItemQty === undefined
          ? cell.row.original.quantity
          : updateStockItemQty;

      return (
        <AlertDialog>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                dispatch(
                  updateStockItem({
                    id,
                    quantity: quantity - 1,
                  }),
                );
              }}
            >
              -
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                dispatch(
                  updateStockItem({
                    id,
                    quantity: quantity + 1,
                  }),
                );
              }}
            >
              +
            </Button>
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
              <AlertDialogAction
                onClick={() => {
                  dispatch(removeStockItem({ stockId, stockItemId: id }));
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
