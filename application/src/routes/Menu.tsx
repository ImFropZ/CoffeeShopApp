import { MenuItem } from "@/components";
import { Input } from "@/components/ui/input";

function Menu() {
  return (
    <div className="grid grid-cols-3 h-full">
      <div className="px-2 grid grid-rows-[auto,1fr] h-full pb-2 col-span-2">
        <div className="relative">
          <Input placeholder="Search ..." className="mt-2 text-lg" />
          <img
            src="/assets/svg/search.svg"
            alt=""
            className="absolute top-1/2 right-3 -translate-y-1/2 mt-1 opacity-75"
          />
        </div>
        <div className="relative mt-2">
          <div className="overflow-y-auto absolute inset-0 grid grid-cols-[repeat(auto-fill,200px)] justify-center gap-2">
            {Array.from({ length: 22 }).map((_, i) => (
              <MenuItem
                imageSrc="https://picsum.photos/200"
                title="Foo"
                className=""
              ></MenuItem>
            ))}
          </div>
        </div>
      </div>
      <div className="border-l px-4 grid grid-rows-[auto,auto,1fr,auto]">
        <div className="text-center font-bold text-xl py-4">Cart (4)</div>
        <div className="border-y py-2 flex justify-between">
          <div className="font-bold">Order Number</div>
          <div>1st Nov 2023 - 14:00:00</div>
        </div>
        <div className="h-auto"></div>
        <div className="py-4 border-t flex justify-between items-center">
          <div>
            <div>
              Total : <span>$10</span>
            </div>
            <div>
              Discount(%) : <span>10%</span>
            </div>
            <div>
              Checkout : <span>$9</span>
            </div>
          </div>
          <div>
            <button className="py-3 px-6 rounded-lg shadow outline outline-[1px] hover:bg-blue-200">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
