import { ColumnDef } from "@tanstack/react-table";
import { LuPen } from "react-icons/lu";
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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { roleSchema, userSchema } from "@/schema";
import { z } from "zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UpdateUser, updateUser } from "@/lib/axios/users";
import { queryClient } from "@/main";

export const userColumns: ColumnDef<z.infer<typeof userSchema>>[] = [
  {
    accessorKey: "fullName",
    header: "Display Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Actions",
    cell: ({ cell }) => {
      const user = cell.row.original;

      const { mutate } = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: (uUser: UpdateUser) =>
          updateUser(user.username, {
            ...(uUser.email ? { email: uUser.email } : {}),
            ...(uUser.fullName ? { fullName: uUser.fullName } : {}),
            ...(uUser.newPassword ? { newPassword: uUser.newPassword } : {}),
            role: uUser.role,
          }),
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      });

      const [username, setUsername] = useState(user.username ?? "");
      const [email, setEmail] = useState(user.email ?? "");
      const [newPassword, setNewPassword] = useState("");
      const [fullName, setFullName] = useState(user.fullName ?? "");
      const [role, setRole] = useState<z.infer<typeof roleSchema>>(user.role);

      const onSaveChange = () => {
        mutate({
          newPassword,
          fullName,
          email,
          role,
        });
      };

      return (
        <Dialog>
          <div className="flex gap-4">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
              >
                <LuPen />
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update your user information.
              </DialogDescription>
              <div className="relative">
                <Label>Full Name</Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.currentTarget.value)}
                />
                <Label>Username</Label>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <Label>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <Label>Role</Label>
                <div className="my-2 flex gap-5">
                  <Select
                    value={role}
                    onValueChange={(value: z.infer<typeof roleSchema>) =>
                      setRole(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="CASHIER">Cashier</SelectItem>
                        <SelectItem value="STOCK">Stock</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Label>Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.currentTarget.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" onClick={onSaveChange}>
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
