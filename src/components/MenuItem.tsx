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
import { Textarea } from "./ui/textarea";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
}

function MenuItem({ imageSrc, title, ...props }: MenuItemProps) {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
  const [cupSize, setCupSize] = useState<"SMALL" | "MEDIUM" | "LARGE">("SMALL");
  const [sugarLevel, setSugarLevel] = useState<number>(0.25);

  return (
    <Dialog>
      <DialogTrigger>
        <div {...props} className={cn(props.className, "border")}>
          {!isImageLoaded ? (
            <Skeleton className="aspect-square w-full object-cover" />
          ) : null}
          <img
            className="aspect-square w-full object-cover"
            src={imageSrc}
            alt={title}
            hidden={!isImageLoaded}
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
              <Label className="text-xl font-bold">Size</Label>
              <div className="mt-2 flex gap-2">
                <div
                  className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-lg font-bold outline-none outline data-[active]:outline-slate-300"
                  data-active={cupSize === "SMALL" ? true : undefined}
                  onClick={() => {
                    setCupSize("SMALL");
                  }}
                >
                  S
                </div>
                <div
                  className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-lg font-bold outline-none outline data-[active]:outline-slate-300"
                  data-active={cupSize === "MEDIUM" ? true : undefined}
                  onClick={() => {
                    setCupSize("MEDIUM");
                  }}
                >
                  M
                </div>
                <div
                  className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-lg font-bold outline-none outline data-[active]:outline-slate-300"
                  data-active={cupSize === "LARGE" ? true : undefined}
                  onClick={() => {
                    setCupSize("LARGE");
                  }}
                >
                  L
                </div>
              </div>
            </div>
            <div className="w-full">
              <Label className="text-xl font-bold">Quantity</Label>
              <Input type="number" value={1} className="mt-2" />
            </div>
          </div>
          <div className="my-2 mt-5 flex w-full justify-between gap-10">
            <div className="w-full">
              <Label className="text-xl font-bold">Sugar Levels</Label>
              <div className="mt-2 flex gap-2">
                <div
                  className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                  data-active={sugarLevel === 0.25 ? true : undefined}
                  onClick={() => {
                    setSugarLevel(0.25);
                  }}
                >
                  25%
                </div>
                <div
                  className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                  data-active={sugarLevel === 0.5 ? true : undefined}
                  onClick={() => {
                    setSugarLevel(0.5);
                  }}
                >
                  50%
                </div>
                <div
                  className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                  data-active={sugarLevel === 0.75 ? true : undefined}
                  onClick={() => {
                    setSugarLevel(0.75);
                  }}
                >
                  75%
                </div>
              </div>
            </div>
            <div className="w-full">
              <Label className="text-xl font-bold">Discount</Label>
              <Input type="number" value={10} className="mt-2" />
            </div>
          </div>
          <div className="my-2 w-full">
            <Label className="text-xl font-bold">Attributes</Label>
            <Textarea placeholder="Write out your note here" className="mt-2" />
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
