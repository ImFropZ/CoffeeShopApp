import { CheckoutItem, MenuItem } from "@/components";
import { Input } from "@/components/ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Menu() {
  return (
    <div className="grid h-full grid-cols-3">
      <div className="col-span-2 grid h-full grid-rows-[auto,1fr] px-2 pb-2">
        <div className="relative">
          <Input placeholder="Search..." className="mt-2 text-lg" />
          <FaMagnifyingGlass className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 opacity-75" />
        </div>
        <div className="relative mt-2">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="grid grid-cols-[repeat(auto-fill,200px)] grid-rows-[repeat(auto-fill,auto)] justify-center gap-2">
              {Array.from({ length: 24 }).map((_) => (
                <MenuItem
                  imageSrc="https://picsum.photos/200"
                  title="Foo"
                  className=""
                ></MenuItem>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[auto,auto,1fr,auto] border-l px-4">
        <div className="py-4 text-center text-xl font-bold">Cart (4)</div>
        <div className="flex justify-between border-y py-2">
          <div className="font-bold">Order Number</div>
          <div>1st Nov 2023 - 14:00:00</div>
        </div>
        <div className="relative h-auto">
          <div className="absolute inset-0 overflow-auto pr-4">
            {Array.from({ length: 24 }).map((_) => (
              <CheckoutItem imageSrc="https://picsum.photos/50" title="bar" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t py-4">
          <div>
            <div>
              Total : <span>$10</span>
            </div>
            <div>
              Discount(0%) : <span>10%</span>
            </div>
            <div>
              Checkout : <span>$9</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg px-3 py-3 font-bold shadow outline outline-[2px] outline-slate-400 hover:bg-blue-400 hover:text-white">
              Discount
            </button>
            <button className="rounded-lg px-6 py-3 font-bold shadow outline outline-[2px] outline-slate-400 hover:bg-green-400 hover:text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
