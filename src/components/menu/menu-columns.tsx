import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { LuPen } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { useState } from "react";

export type Menu = {
  name: string;
};

export const menuColumns: ColumnDef<Menu>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Actions",
    cell: () => {
      const [cupSizeEnabled, setCupSizeEnabled] = useState({
        small: false,
        medium: false,
        large: false,
      });

      return (
        <Dialog>
          <div className="flex gap-2">
            <DialogTrigger asChild>
              <Button size="sm" className="bg-green-500 hover:bg-green-400">
                <LuPen />
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader>
              <h1 className="text-xl font-bold">Edit Menu</h1>
            </DialogHeader>

            <div className="flex gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="sm-cup"
                    onCheckedChange={(value) => {
                      setCupSizeEnabled((prev) => ({
                        ...prev,
                        small: value,
                      }));
                    }}
                  />
                  <Label htmlFor="sm-cup">Small Cup</Label>
                </div>
                <div>
                  <Label>Picture</Label>
                  <Input
                    type="file"
                    disabled={!cupSizeEnabled.small ?? undefined}
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    disabled={!cupSizeEnabled.small ?? undefined}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="md-cup"
                    onCheckedChange={(value) => {
                      setCupSizeEnabled((prev) => ({
                        ...prev,
                        medium: value,
                      }));
                    }}
                  />
                  <Label htmlFor="md-cup">Medium Cup</Label>
                </div>
                <div>
                  <Label>Picture</Label>
                  <Input
                    type="file"
                    disabled={!cupSizeEnabled.medium ?? undefined}
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    disabled={!cupSizeEnabled.medium ?? undefined}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="lg-cup"
                    onCheckedChange={(value) => {
                      setCupSizeEnabled((prev) => ({
                        ...prev,
                        large: value,
                      }));
                    }}
                  />
                  <Label htmlFor="lg-cup">Large Cup</Label>
                </div>
                <div>
                  <Label>Picture</Label>
                  <Input
                    type="file"
                    disabled={!cupSizeEnabled.large ?? undefined}
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    disabled={!cupSizeEnabled.large ?? undefined}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button className="mr-2" variant={"secondary"}>
                Cancel
              </Button>
              <Button className="mr-2">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
