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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UserDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [newUser, setNewUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
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
    setNewUser({
      fullName: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const onSubmit = () => {
    console.log(newUser);
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
                <Label>Full Name</Label>
                <Input
                  value={newUser.fullName}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      fullName: e.currentTarget.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Username</Label>
                <Input
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      username: e.currentTarget.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      email: e.currentTarget.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      password: e.currentTarget.value,
                    }))
                  }
                />
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
