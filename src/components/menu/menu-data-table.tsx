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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MenuDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [newMenu, setNewMenu] = useState({
    name: "",
    iamge: "",
    price: 0,
    cupSize: "SMALL" as "SMALL" | "MEDIUM" | "LARGE",
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
      iamge: "",
      price: 0,
      cupSize: "SMALL",
    });
  };

  const onSubmit = () => {
    console.log(newMenu);
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
            <DialogHeader>Add User</DialogHeader>
            <div>
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
                <Label>Price</Label>
                <Input
                  type="number"
                  value={newMenu.price}
                  onChange={(e) =>
                    setNewMenu((prev) => ({
                      ...prev,
                      price: Number(e.currentTarget.value),
                    }))
                  }
                />
              </div>
              <div>
                <Label>Cup Size</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SMALL">Small</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="LARGE">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <div>
                <Button variant="outline" onClick={resetFormValue}>
                  Cancel
                </Button>
                <Button onClick={onSubmit}>Add</Button>
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
