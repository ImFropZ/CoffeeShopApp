import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { LuEye, LuPen } from "react-icons/lu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { menuSchema } from "@/schema/menus";
import { z } from "zod";
import { FaFire, FaGlassWater, FaRegSnowflake } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MenuItemsDialogContent } from "..";
import { updateMenu } from "@/lib/axios/menus";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";

export const menuColumns: ColumnDef<z.infer<typeof menuSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Drink Type",
    cell: ({ cell }) => {
      const { drinkType } = cell.row.original;

      return drinkType === "HOT" ? (
        <div className="flex items-center gap-2 text-red-500">
          <FaFire /> HOT
        </div>
      ) : drinkType === "FRAPPE" ? (
        <div className="flex items-center gap-2 text-blue-400">
          <FaGlassWater /> FRAPPE
        </div>
      ) : (
        <div className="flex items-center gap-2 text-blue-700">
          <FaRegSnowflake /> ICED
        </div>
      );
    },
  },
  {
    header: "Categories",
    cell: ({ cell }) => {
      const { categories } = cell.row.original;

      return (
        <div className="flex items-center gap-2">
          {categories.map((category) => {
            return (
              <div
                className="rounded-lg bg-slate-200 px-1 capitalize"
                key={category}
              >
                {category}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ cell }) => {
      const { id, name, drinkType, categories, menuItems } = cell.row.original;

      const { mutate } = useMutation({
        mutationKey: ["menus"],
        mutationFn: (newMenu: {
          name?: string;
          drinkType?: "COLD" | "HOT" | "FRAPPE";
          categories?: string;
        }) => updateMenu(id, newMenu),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["menus"] });
        },
      });

      const [newMenu, setNewMenu] = useState({
        name: name,
        drinkType: drinkType,
        categories: categories.join(","),
      });

      const onUpdate = () => {
        if (
          newMenu.name === name &&
          newMenu.drinkType === drinkType &&
          newMenu.categories === categories.join(",")
        ) {
          return;
        }

        mutate(newMenu);
      };

      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-green-400 hover:bg-green-300">
                <LuPen />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h1 className="text-xl font-bold">Edit Menu</h1>
              </DialogHeader>

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
                      defaultValue={newMenu.drinkType}
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
                <DialogClose asChild>
                  <Button className="mr-2" variant={"secondary"}>
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="mr-2" onClick={onUpdate}>
                    Save
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-blue-400 hover:bg-blue-300">
                <LuEye />
              </Button>
            </DialogTrigger>
            <MenuItemsDialogContent menuId={id} items={menuItems} />
          </Dialog>
        </div>
      );
    },
  },
];
