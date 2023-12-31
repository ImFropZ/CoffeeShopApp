import { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { Skeleton } from "./ui/skeleton";
import { z } from "zod";
import { menuItemOrderSchema } from "@/schema/order";
import { useAppDispatch } from "@/hooks/redux";
import { decreaseQtyToOrder, increaseQtyToOrder, removeOrder } from "@/redux";

interface CheckoutItemProps extends z.infer<typeof menuItemOrderSchema> {
  picture: string;
  name: string;
  price: number;
}

function CheckoutItem({
  id,
  picture,
  name,
  price,
  cupSize,
  ice,
  sugar,
  quantity,
  attributes,
}: CheckoutItemProps) {
  const dispatch = useAppDispatch();
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div className="relative my-2 border-y-[1px] py-2">
      <div className="flex items-center gap-2">
        {!isImageLoaded ? (
          <Skeleton className="aspect-square w-16 object-cover" />
        ) : null}
        <img
          src={picture}
          alt={name}
          className="aspect-square w-16 rounded object-cover"
          hidden={!isImageLoaded}
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
        <div className="flex h-full flex-col justify-start">
          <p className="font-bold">{name}</p>
          <p className="text-stone-500">
            {cupSize} - {ice} - {sugar}
          </p>
          <p className="text-stone-500">{attributes}</p>
        </div>
        <div className="ml-auto">${price}</div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full bg-slate-200 p-2"
            disabled={quantity < 2}
            onClick={() => {
              dispatch(
                decreaseQtyToOrder({ id, cupSize, ice, sugar, attributes }),
              );
            }}
          >
            <LuChevronLeft />
          </button>
          <span>{quantity}</span>
          <button
            className="rounded-full bg-slate-200 p-2"
            onClick={() => {
              dispatch(
                increaseQtyToOrder({ id, cupSize, ice, sugar, attributes }),
              );
            }}
          >
            <LuChevronRight />
          </button>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-6 w-6 rounded-full hover:bg-slate-200">
        <button
          className="p-1"
          onClick={() => {
            dispatch(
              removeOrder({
                id,
                cupSize,
                ice,
                sugar,
                attributes,
              }),
            );
          }}
        >
          <LuX className="text-red-600" />
        </button>
      </div>
    </div>
  );
}

export default CheckoutItem;
