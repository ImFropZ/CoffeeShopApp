import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CheckoutItemProps {
  title: string;
  imageSrc: string;
}

function CheckoutItem({ title, imageSrc }: CheckoutItemProps) {
  return (
    <div className="my-2 border-y-[1px] py-2 relative">
      <div className="flex gap-2 items-center">
        <img
          src={imageSrc}
          alt={title}
          width={64}
          className="rounded aspect-square"
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
      <div className="flex justify-between items-center">
        <span className="text-lg">Cup Size</span>
        <RadioGroup defaultValue="small" className="flex my-2">
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
      <div className="absolute top-0 right-2 text-red-600">
        <button>Remove</button>
      </div>
    </div>
  );
}

export default CheckoutItem;
