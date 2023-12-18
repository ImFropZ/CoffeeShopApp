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
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAppDispatch } from "@/hooks/redux";
import { addOrder } from "@/redux";

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
  data: {
    id: string;
    price: number;
    cupSize: "SMALL" | "MEDIUM" | "LARGE";
  }[];
}

function MenuItem({ imageSrc, title, data, ...props }: MenuItemProps) {
  const dispatch = useAppDispatch();

  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
  const [cupSize, setCupSize] = useState<"SMALL" | "MEDIUM" | "LARGE">(
    data[0].cupSize,
  );
  const [sugarLevel, setSugarLevel] = useState<number>(0.25);
  const [iceLevel, setIceLevel] = useState<number>(0.25);
  const [attributes, setAttributes] = useState<string>("");

  const resetState = () => {
    setCupSize(data[0].cupSize);
    setSugarLevel(0.25);
    setIceLevel(0.25);
    setAttributes("");
  };

  return (
    <div {...props} className={cn(props.className, "border")}>
      <Dialog>
        <DialogTrigger className="w-full">
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
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col items-center justify-center">
            <Label className="text-2xl font-bold underline">Menu</Label>
            <div className="my-4 flex w-full gap-2">
              <img
                src={imageSrc}
                alt={title}
                className="aspect-square w-16 rounded-lg object-cover"
              />
              <div className="text-xl">{title}</div>
            </div>
            <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
              <div className="w-full">
                <Label className="text-xl font-bold">Size</Label>
                <div className="mt-2 flex gap-2">
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-lg font-bold outline-none outline disabled:opacity-30 data-[active]:outline-slate-300"
                    data-active={cupSize === "SMALL" ? true : undefined}
                    disabled={
                      data.find((item) => item.cupSize === "SMALL") ===
                      undefined
                    }
                    onClick={() => {
                      setCupSize("SMALL");
                    }}
                  >
                    S
                  </button>
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-lg font-bold outline-none outline disabled:opacity-30 data-[active]:outline-slate-300"
                    data-active={cupSize === "MEDIUM" ? true : undefined}
                    disabled={
                      data.find((item) => item.cupSize === "MEDIUM") ===
                      undefined
                    }
                    onClick={() => {
                      setCupSize("MEDIUM");
                    }}
                  >
                    M
                  </button>
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-lg font-bold outline-none outline disabled:opacity-30 data-[active]:outline-slate-300"
                    data-active={cupSize === "LARGE" ? true : undefined}
                    disabled={
                      data.find((item) => item.cupSize === "LARGE") ===
                      undefined
                    }
                    onClick={() => {
                      setCupSize("LARGE");
                    }}
                  >
                    L
                  </button>
                </div>
              </div>
              <div className="w-full">
                <Label className="text-xl font-bold">Sugar Levels</Label>
                <div className="mt-2 flex gap-2">
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                    data-active={sugarLevel === 0.25 ? true : undefined}
                    onClick={() => {
                      setSugarLevel(0.25);
                    }}
                  >
                    25%
                  </button>
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                    data-active={sugarLevel === 0.5 ? true : undefined}
                    onClick={() => {
                      setSugarLevel(0.5);
                    }}
                  >
                    50%
                  </button>
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                    data-active={sugarLevel === 0.75 ? true : undefined}
                    onClick={() => {
                      setSugarLevel(0.75);
                    }}
                  >
                    75%
                  </button>
                </div>
              </div>
            </div>
            <div className="my-2 mt-5 flex w-full justify-between gap-10">
              <div className="w-full">
                <Label className="text-xl font-bold">Ice %</Label>
                <div className="mt-2 flex gap-2">
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                    data-active={iceLevel === 0.25 ? true : undefined}
                    onClick={() => {
                      setIceLevel(0.25);
                    }}
                  >
                    25%
                  </button>
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                    data-active={iceLevel === 0.5 ? true : undefined}
                    onClick={() => {
                      setIceLevel(0.5);
                    }}
                  >
                    50%
                  </button>
                  <button
                    className="grid aspect-square w-10 cursor-pointer place-content-center rounded-full bg-slate-100 text-sm outline-none outline data-[active]:outline-slate-300"
                    data-active={iceLevel === 0.75 ? true : undefined}
                    onClick={() => {
                      setIceLevel(0.75);
                    }}
                  >
                    75%
                  </button>
                </div>
              </div>
            </div>
            <div className="my-2 w-full">
              <Label className="text-xl font-bold">Attributes</Label>
              <Textarea
                placeholder="Write out your note here"
                className="mt-2"
                value={attributes}
                onChange={(e) => setAttributes(e.currentTarget.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3">
              <DialogClose asChild>
                <Button variant={"ghost"} onClick={resetState}>
                  Back
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    dispatch(
                      addOrder({
                        cupSize: cupSize,
                        ice: iceLevel,
                        sugar: sugarLevel,
                        quantity: 1,
                        id: data.find((item) => item.cupSize === cupSize)?.id!,
                        picture: imageSrc,
                        name: title,
                        price: data.find((item) => item.cupSize === cupSize)
                          ?.price!,
                        attributes,
                      }),
                    );
                    resetState();
                  }}
                >
                  Add
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MenuItem;
