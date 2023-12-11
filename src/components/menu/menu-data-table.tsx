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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppDispatch } from "@/hooks/redux";
import { addMenu } from "@/redux";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MenuDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const [newMenu, setNewMenu] = useState({
    name: "",
    drinkType: "COLD" as "COLD" | "HOT" | "FRAPPE",
    categories: "",
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

  const resetFormValue = () => {
    setNewMenu({
      name: "",
      drinkType: "COLD" as "COLD" | "HOT" | "FRAPPE",
      categories: "",
    });
  };

  const onSubmit = () => {
    dispatch(
      addMenu({
        name: newMenu.name,
        drinkType: newMenu.drinkType,
        categories: newMenu.categories
          .split(",")
          .map((category) => category.trim())
          .join(""),
      }),
    );
    resetFormValue();
  };

  return (
    <Dialog>
      <div className="grid h-full grid-rows-[auto,1fr] rounded-md border">
        <div className="flex p-2">
          <Input
            placeholder="Search..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="m-2 w-1/3 text-lg"
          />

          <DialogTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="font-bold">Add Menu</DialogHeader>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={newMenu.name}
                    onChange={(e) =>
                      setNewMenu((prev) => ({
                        ...prev,
                        name: e.currentTarget.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label>Drink type</Label>
                  <Select
                    defaultValue="COLD"
                    onValueChange={(e) => {
                      setNewMenu((prev) => ({
                        ...prev,
                        drinkType: e as "COLD" | "HOT" | "FRAPPE",
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COLD">COLD ❄️</SelectItem>
                      <SelectItem value="HOT">HOT 🔥</SelectItem>
                      <SelectItem value="FRAPPE">FRAPPE 🥤</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Categories</Label>
                <p className="text-sm text-muted-foreground">
                  The categories can be separate by ','
                </p>
                <Input
                  placeholder="Ex: Milk Tea, Fruit Tea, Smoothie"
                  value={newMenu.categories}
                  onChange={(e) =>
                    setNewMenu((prev) => ({
                      ...prev,
                      categories: e.currentTarget.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <div className="flex gap-4">
                <DialogClose asChild>
                  <Button variant="outline" onClick={resetFormValue}>
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={onSubmit}>Add</Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </div>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 overflow-y-auto">
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
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
