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

export type User = {
  id: string;
  name: string;
  permissions: string[];
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
    accessorKey: "permissions",
    header: "Permissions",
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
        <AlertDialog>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
            >
              <LuPen />
            </Button>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
              >
                <LuTrash />
              </Button>
            </AlertDialogTrigger>
          </div>
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
      );
    },
  },
];
