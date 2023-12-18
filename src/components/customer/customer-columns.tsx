import { ColumnDef } from "@tanstack/react-table";
import { LuPen } from "react-icons/lu";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Customer } from "@/lib/axios/customers";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useAppDispatch } from "@/hooks/redux";
import { updateCustomer } from "@/redux";
import { useState } from "react";

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
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    header: "Actions",
    cell: ({ cell }) => {
      const { name, phone, address } = cell.row.original;
      const dispatch = useAppDispatch();
      const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

      const formSchema = z.object({
        name: z.string().min(3).max(100),
        phone: z.string().min(3).max(20),
        address: z.string().min(3).max(100),
      });

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: name,
          phone: phone,
          address: address,
        },
      });

      const onSubmit = () => {
        const { name, phone, address } = form.getValues();

        dispatch(
          updateCustomer({
            id: cell.row.original.id,
            customer: {
              ...(name ? { name } : {}),
              ...(phone ? { phone } : {}),
              ...(address ? { address } : {}),
            },
          }),
        );

        if (!name || !phone || !address) {
          return;
        }

        setDialogOpen(false);
      };

      return (
        <Dialog
          open={isDialogOpen}
          onOpenChange={() => {
            setDialogOpen((prev) => !prev);
          }}
        >
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
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>
                Update your customer information.
              </DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button type="submit">Save changes</Button>
                  </div>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
