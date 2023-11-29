import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
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
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { format, set } from "date-fns";
import { useAppDispatch } from "@/hooks/redux";
import { addStockItem } from "@/redux/stock";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function StockItemDataTable<TData, TValue>({
  columns,
  data,
  stockId,
}: DataTableProps<TData, TValue> & { stockId: string }) {
  const dispatch = useAppDispatch();
  const [newStockItem, setNewStockItem] = useState({
    expireDate: new Date(),
    quantity: 1,
    price: 1,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="absolute inset-0 grid grid-rows-[auto,1fr] rounded-md border">
      <div className="flex items-center">
        <Input
          placeholder="Search..."
          value={
            (table.getColumn("expiresDate")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("expiresDate")?.setFilterValue(event.target.value)
          }
          className="m-2 w-1/3 text-lg"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto mr-2" variant="outline">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[42rem]">
            <DialogHeader>
              <DialogTitle>Add new stock item</DialogTitle>
              <DialogDescription>
                Fill in the details of the new stock item here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Label>Expire Date</Label>
              <Input
                type="date"
                value={format(newStockItem.expireDate, "yyyy-MM-dd")}
                onChange={(e) => {
                  setNewStockItem({
                    ...newStockItem,
                    expireDate: new Date(e.currentTarget.value),
                  });
                }}
              />
              <Label>Quantity</Label>
              <Input
                type="number"
                value={newStockItem.quantity}
                onChange={(e) => {
                  setNewStockItem({
                    ...newStockItem,
                    quantity: parseInt(e.currentTarget.value),
                  });
                }}
              />
              <Label>Price</Label>
              <Input
                type="number"
                value={newStockItem.price}
                onChange={(e) => {
                  setNewStockItem({
                    ...newStockItem,
                    price: parseFloat(e.currentTarget.value),
                  });
                }}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    dispatch(
                      addStockItem({
                        ...newStockItem,
                        stockId,
                        expiresDate: format(
                          newStockItem.expireDate,
                          "yyyy-MM-dd",
                        ),
                      }),
                    );
                    setNewStockItem({
                      expireDate: new Date(),
                      quantity: 1,
                      price: 1,
                    });
                  }}
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.id.includes("actions")
                        ? "w-[12rem] lg:w-[18rem]"
                        : cell.id.includes("id")
                        ? "w-[6rem]"
                        : ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
