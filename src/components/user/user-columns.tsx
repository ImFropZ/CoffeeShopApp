import { ColumnDef } from "@tanstack/react-table";
import { LuPen, LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type User = {
  id: string;
  name: string;
  permission: string;
  picture: string;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "permission",
    header: "Permission",
  },
  {
    header: "Picture",
    cell: ({ cell }) => (
      <Link to={cell.row.original.picture} target="_blank">
        View Picture
      </Link>
    ),
  },
  {
    header: "Actions",
    cell: () => {
      return (
        <Dialog>
          <AlertDialog>
            <div className="flex gap-4">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
                >
                  <LuPen />
                </Button>
              </DialogTrigger>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                >
                  <LuTrash />
                </Button>
              </AlertDialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update your user information.
                </DialogDescription>
                <div className="relative">
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                      <Label>Picture</Label>
                      <Input type="file" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a permission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Permissions</SelectLabel>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="cashier">Cashier</SelectItem>
                          <SelectItem value="stockManager">
                            Stock Manager
                          </SelectItem>
                          <SelectItem value="accounting">Accounting</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Label>Name</Label>
                  <Input defaultValue={"Lim Tangmeng"} />
                  <Label>Password</Label>
                  <Input type="password" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action can not be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Dialog>
      );
    },
  },
];
