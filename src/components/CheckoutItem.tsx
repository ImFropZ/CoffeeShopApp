import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import { Skeleton } from "./ui/skeleton";

interface CheckoutItemProps {
  title: string;
  imageSrc: string;
}

function CheckoutItem({ title, imageSrc }: CheckoutItemProps) {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <div className="relative my-2 border-y-[1px] py-2">
      <div className="flex items-center gap-2">
        {!isImageLoaded ? <Skeleton className="aspect-square w-16" /> : null}
        <img
          src={imageSrc}
          alt={title}
          className={
            "aspect-square w-16 rounded " + (!isImageLoaded && "hidden")
          }
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
        <div>
          {title} - {"M"} - {"100%"}
        </div>
        <div className="ml-auto">$3</div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg">Quantity</span>
        <Input type="number" className="w-32" defaultValue={1} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg">Cup Size</span>
        <RadioGroup defaultValue="small" className="my-2 flex">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="small" defaultChecked />
            <Label htmlFor="small">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large">Large</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg">Sugar(%)</span>
        <Input type="number" className="w-32" defaultValue={100} />
      </div>
      <div className="absolute right-0 top-0 h-6 w-6 rounded-full hover:bg-slate-200">
        <button className="p-1">
          <LuX className="text-red-600" />
        </button>
      </div>
    </div>
  );
}

export default CheckoutItem;
