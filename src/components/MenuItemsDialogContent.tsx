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
import { UpdateMenuItem } from "@/lib/axios/menus";
import { useAppDispatch } from "@/hooks/redux";
import { updateMenuItems } from "@/redux";

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
  items,
}: MenuItemsProps) {
  const dispatch = useAppDispatch();
  const [smallItem, mediumItem, largeItem] = [...items].sort((a) => {
    if (a.cupSize === "SMALL") return -1;
    if (a.cupSize === "MEDIUM") return 0;
    if (a.cupSize === "LARGE") return 1;
    return 0;
  });

  const [smallUpdateItem, setSmallUpdateItem] = useState<
    UpdateMenuItem & { cupSize: string; pictureUrl: string }
  >({
    id: smallItem.id,
    isActive: smallItem.isActive,
    price: smallItem.price ?? 0,
    cupSize: "SMALL",
    picture: undefined,
    pictureUrl: smallItem.picture,
  });

  const [mediumUpdateItem, setMediumUpdateItem] = useState<
    UpdateMenuItem & { cupSize: string; pictureUrl: string }
  >({
    id: mediumItem.id,
    isActive: mediumItem.isActive,
    price: mediumItem.price ?? 0,
    cupSize: "MEDIUM",
    picture: undefined,
    pictureUrl: mediumItem.picture,
  });

  const [largeUpdateItem, setLargeUpdateItem] = useState<
    UpdateMenuItem & { cupSize: string; pictureUrl: string }
  >({
    id: largeItem.id,
    isActive: largeItem.isActive,
    price: largeItem.price ?? 0,
    cupSize: "LARGE",
    picture: undefined,
    pictureUrl: largeItem.picture,
  });

  const onSaveHandler = () => {
    // if (updateItems) {
    //   dispatch(updateMenuItems({ id: menuId, items: updateItems }));
    // }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <h1 className="text-xl font-bold">Edit Menu</h1>
      </DialogHeader>

      <div className="flex gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Switch
              checked={smallUpdateItem.isActive}
              onCheckedChange={(isCheck) => {
                console.log(smallUpdateItem);
                setSmallUpdateItem((prev) => ({
                  ...prev,
                  isActive: isCheck,
                }));
              }}
            />
            <Label>{smallUpdateItem.cupSize} Cup</Label>
          </div>
          <div>
            <Label>Picture</Label>
            <div className="relative aspect-square w-32">
              <img
                src={smallUpdateItem.pictureUrl}
                alt=""
                className={`${
                  smallUpdateItem.isActive ? "" : "opacity-30"
                } aspect-square w-full object-contain`}
              />
              <input
                type="file"
                disabled={!smallUpdateItem.isActive}
                className="absolute inset-0 cursor-pointer opacity-0"
                title="Upload picture"
                accept="image/*"
                onChange={(event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];
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

                    setSmallUpdateItem((prev) => ({
                      ...prev,
                      picture: file,
                      pictureUrl: URL.createObjectURL(file),
                    }));
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
              disabled={!smallUpdateItem.isActive}
              defaultValue={smallUpdateItem.price ?? 0}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Switch
              checked={mediumUpdateItem.isActive}
              onCheckedChange={(isCheck) => {
                setMediumUpdateItem((prev) => ({
                  ...prev,
                  isActive: isCheck,
                }));
              }}
            />
            <Label>{mediumUpdateItem.cupSize} Cup</Label>
          </div>
          <div>
            <Label>Picture</Label>
            <div className="relative aspect-square w-32">
              <img
                src={mediumUpdateItem.pictureUrl}
                alt=""
                className={`${
                  mediumUpdateItem.isActive ? "" : "opacity-30"
                } aspect-square w-full object-contain`}
              />
              <input
                type="file"
                disabled={!mediumUpdateItem.isActive}
                className="absolute inset-0 cursor-pointer opacity-0"
                title="Upload picture"
                accept="image/*"
                onChange={(event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];
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

                    setMediumUpdateItem((prev) => ({
                      ...prev,
                      picture: file,
                      pictureUrl: URL.createObjectURL(file),
                    }));
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
              disabled={!mediumUpdateItem.isActive}
              defaultValue={mediumUpdateItem.price ?? 0}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Switch
              checked={largeUpdateItem.isActive}
              onCheckedChange={(isCheck) => {
                setLargeUpdateItem((prev) => ({
                  ...prev,
                  isActive: isCheck,
                }));
              }}
            />
            <Label>{largeUpdateItem.cupSize} Cup</Label>
          </div>
          <div>
            <Label>Picture</Label>
            <div className="relative aspect-square w-32">
              <img
                src={largeUpdateItem.pictureUrl}
                alt=""
                className={`${
                  largeUpdateItem.isActive ? "" : "opacity-30"
                } aspect-square w-full object-contain`}
              />
              <input
                type="file"
                disabled={!largeUpdateItem.isActive}
                className="absolute inset-0 cursor-pointer opacity-0"
                title="Upload picture"
                accept="image/*"
                onChange={(event) => {
                  const file = (event.target as HTMLInputElement).files?.[0];
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

                    setLargeUpdateItem((prev) => ({
                      ...prev,
                      picture: file,
                      pictureUrl: URL.createObjectURL(file),
                    }));
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
              disabled={!largeUpdateItem.isActive}
              defaultValue={largeUpdateItem.price ?? 0}
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button className="mr-2" variant={"secondary"}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="mr-2">Save</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
