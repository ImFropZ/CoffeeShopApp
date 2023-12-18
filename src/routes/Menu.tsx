import {
  CategoriesSlide,
  CheckoutDialogContent,
  CheckoutItem,
  MenuItem,
} from "@/components";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { format } from "date-fns";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getCategoies } from "@/lib/axios";
import { getMenus } from "@/lib/axios/menus";
import { useAppSelector } from "@/hooks/redux";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const orderMenus = useAppSelector((state) => state.orders);
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoies,
  });

  const menus = useQuery({
    queryKey: ["menus", selectedCategory],
    queryFn: () => getMenus(selectedCategory),
  });

  const [searchInput, setSearchInput] = useState("");

  if (menus.isLoading || !menus.data) return <div>Loading...</div>;

  return (
    <div className="grid h-full grid-cols-3">
      <div className="col-span-2 grid h-full grid-rows-[auto,auto,1fr] px-2 pb-2">
        <div className="relative">
          <Input
            placeholder="Search..."
            className="mt-2 text-lg"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
          />
          <FaMagnifyingGlass className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 opacity-75" />
        </div>
        <CategoriesSlide
          _onSelect={(cateName) => setSelectedCategory(cateName)}
          categories={
            categories.data
              ?.map((cat) => ({
                name: cat,
                isActive: selectedCategory === cat,
              }))
              .filter((cat) => cat.name !== "") ?? []
          }
        />
        <div className="relative mt-2">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="grid grid-cols-[repeat(auto-fill,200px)] grid-rows-[repeat(auto-fill,auto)] justify-center gap-2">
              {menus.data.map((item) => {
                if (item.menuItems.filter((item) => item.isActive).length === 0)
                  return null;

                if (
                  !item.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) &&
                  searchInput !== ""
                )
                  return null;

                return (
                  <MenuItem
                    imageSrc={
                      item.menuItems.find((item) => item.picture !== "")
                        ?.picture || ""
                    }
                    title={item.name}
                    className=""
                    key={item.id}
                    data={item.menuItems.filter((item) => item.isActive)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[auto,1fr,auto] border-l px-4">
        <div className="flex justify-between border-y py-2">
          <div className="font-bold">Order</div>
          <div>{format(new Date(), "qo MMM R - HH:mm:ss")}</div>
        </div>
        <div className="relative h-auto">
          <div className="absolute inset-0 overflow-auto pr-4">
            {orderMenus.menus.map((item) => (
              <CheckoutItem
                {...item}
                key={`${item.id}-${item.cupSize}-${item.ice}-${item.name}-${item.sugar}-${item.attributes}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t py-4">
          <div>
            <div>
              Total :{" "}
              <span>
                $
                {orderMenus.menus.reduce(
                  (total, menu) => total + menu.price * menu.quantity,
                  0,
                )}
              </span>
            </div>
            <div>
              Checkout :{" "}
              <span>
                $
                {orderMenus.menus.reduce(
                  (total, menu) => total + menu.price * menu.quantity,
                  0,
                )}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded-lg px-6 py-3 font-bold shadow outline outline-[2px] outline-slate-400 hover:bg-green-400 hover:text-white">
                  Checkout
                </button>
              </DialogTrigger>
              <CheckoutDialogContent />
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
