import { useState } from "react";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useAppDispatch } from "@/hooks/redux";
import { updateMenuItems } from "@/redux";
import { z } from "zod";
import { menuItemSchema } from "@/schema/menus";

interface MenuItemsProps {
  menuId: string;
  items: {
    id: string;
    cupSize: "SMALL" | "MEDIUM" | "LARGE";
    price?: number;
    picture: string;
    isActive: boolean;
  }[];
}

export default function MenuItemsDialogContent({
  menuId,
  items: _items,
}: MenuItemsProps) {
  const dispatch = useAppDispatch();

  const [items, setItems] = useState(
    [..._items]
      .sort((a) => {
        if (a.cupSize === "SMALL") return -1;
        if (a.cupSize === "MEDIUM") return 0;
        if (a.cupSize === "LARGE") return 1;
        return 0;
      })
      .map((item) => {
        return { ...item, pictureFile: undefined } as z.infer<
          typeof menuItemSchema
        > & {
          pictureFile: File | undefined;
        };
      }),
  );

  const onSaveHandler = () => {
    if (items) {
      dispatch(
        updateMenuItems({
          id: menuId,
          items: items.map((i) => {
            return {
              id: i.id,
              cupSize: i.cupSize,
              price: i.price,
              image: i.pictureFile,
              isActive: i.isActive,
            };
          }),
        }),
      );
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <h1 className="text-xl font-bold">Edit Menu</h1>
      </DialogHeader>

      <div className="flex gap-2">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <div className="flex items-center gap-2">
                <Switch
                  checked={item.isActive}
                  onCheckedChange={(isCheck) => {
                    setItems((prev) => {
                      const index = prev.findIndex((i) => i.id === item.id);
                      if (index == -1) {
                        return prev;
                      }

                      prev[index].isActive = isCheck;

                      return [...prev];
                    });
                  }}
                />
                <Label>{item.cupSize} Cup</Label>
              </div>
              <div>
                <Label>Picture</Label>
                <div className="relative aspect-square w-32">
                  <img
                    src={
                      item.pictureFile
                        ? URL.createObjectURL(new Blob([item.pictureFile]))
                        : item.picture
                    }
                    alt=""
                    className={`${
                      item.isActive ? "" : "opacity-30"
                    } aspect-square w-full object-contain`}
                  />
                  <input
                    type="file"
                    disabled={!item.isActive}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    title="Upload picture"
                    accept="image/*"
                    onChange={(event) => {
                      const file = (event.target as HTMLInputElement)
                        .files?.[0];
                      if (file) {
                        // Check if file is an image
                        if (!file.type.startsWith("image/")) {
                          console.log("File must be an image.");
                          return;
                        }

                        // Check if file is larger than 5MB
                        if (file.size > 5 * 1024 * 1024) {
                          console.log("File must be smaller than 5MB.");
                          return;
                        }

                        setItems((prev) => {
                          const index = prev.findIndex((i) => i.id === item.id);
                          if (index === -1) {
                            return prev;
                          }

                          prev[index].picture = URL.createObjectURL(file);
                          prev[index].pictureFile = file;

                          return [...prev];
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  min={0}
                  disabled={!item.isActive}
                  defaultValue={item.price ?? 0}
                  onChange={(e) => {
                    setItems((prev) => {
                      const index = prev.findIndex((i) => i.id === item.id);
                      if (index === -1) {
                        return prev;
                      }

                      prev[index].price = e.target.valueAsNumber;

                      return [...prev];
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button className="mr-2" variant={"secondary"}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="mr-2" onClick={onSaveHandler}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
