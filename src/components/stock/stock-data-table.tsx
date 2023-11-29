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
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addStock, resetStockUpdates, updateStockItems } from "@/redux/stock";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function StockDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const [newStock, setNewStock] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const stockUpdates = useAppSelector((state) => state.stocks.stockUpdates);

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
      <div className="flex items-center justify-end">
        <Input
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="m-2 mr-auto w-1/3 text-lg"
        />
        <Button
          className={cn("mr-2", stockUpdates.length === 0 ? "hidden" : "")}
          onClick={() => {
            dispatch(updateStockItems(stockUpdates));
          }}
        >
          Save Changes
        </Button>
        <Button
          className={cn("mr-2", stockUpdates.length === 0 ? "hidden" : "")}
          onClick={() => {
            dispatch(resetStockUpdates());
          }}
        >
          Reset to Defaults
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mr-2" variant="outline">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[42rem]">
            <DialogHeader>
              <DialogTitle>Add new stock</DialogTitle>
              <DialogDescription>
                Fill in the details of the new stock here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Label>Name</Label>
              <Input
                value={newStock}
                onChange={(e) => {
                  setNewStock(e.currentTarget.value);
                }}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  onClick={() => {
                    dispatch(addStock(newStock));
                    setNewStock("");
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
