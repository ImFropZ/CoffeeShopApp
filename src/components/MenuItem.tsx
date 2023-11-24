import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
}

function MenuItem({ imageSrc, title, ...props }: MenuItemProps) {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
  return (
    <Dialog>
      <DialogTrigger>
        <div {...props} className={cn(props.className, "border")}>
          {!isImageLoaded ? (
            <Skeleton className="aspect-square w-full" />
          ) : null}
          <img
            src={imageSrc}
            alt={title}
            onLoad={() => {
              setImageLoaded(true);
            }}
          />
          <div className="my-2 text-center text-xl font-bold">{title}</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center">
          <Label className="text-2xl font-bold underline">Menu</Label>
          <div className="my-4 flex w-full gap-2 rounded">
            <img
              src={imageSrc}
              alt={title}
              className="aspect-square w-16"
              onLoad={() => {
                setImageLoaded(true);
              }}
            />
            <div className="text-xl">{title}</div>
          </div>
          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            <div className="w-full">
              <Label>Size</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SMALL">Small</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LARGE">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label>Quantity</Label>
              <Input type="number" value={1} />
            </div>
          </div>
          <div className="my-2 flex w-full justify-between gap-10">
            <div className="w-full">
              <Label>Sugar Levels</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sugar Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.25">25%</SelectItem>
                  <SelectItem value="0.50">50%</SelectItem>
                  <SelectItem value="0.75">75%</SelectItem>
                  <SelectItem value="1">100%</SelectItem>
                  <SelectItem value="1.25">125%</SelectItem>
                  <SelectItem value="1.50">150%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label>Discount</Label>
              <Input type="number" value={10} />
            </div>
          </div>
          <div className="my-2 w-full">
            <Label>Attributes</Label>
            <Textarea placeholder="Write out your note here" />
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-3">
            <DialogClose asChild>
              <Button variant={"ghost"}>Back</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Add</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MenuItem;
