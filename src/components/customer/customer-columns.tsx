import { ColumnDef } from "@tanstack/react-table";
import { LuPen, LuTrash } from "react-icons/lu";
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

export type Customer = {
  id: string;
  name: string;
  phoneNumber: string;
};

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
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
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogDescription>
                  Update your customer information.
                </DialogDescription>
                <div className="relative">
                  <Label>Name</Label>
                  <Input defaultValue={"Lim Tangmeng"} />
                  <Label>Phone Number</Label>
                  <Input type="text" defaultValue="+855" />
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
