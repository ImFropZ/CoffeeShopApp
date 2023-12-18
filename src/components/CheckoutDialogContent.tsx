import { useAppSelector } from "@/hooks/redux";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { OrderParams, placeOrder } from "@/lib/axios/order";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CheckoutDialogContent = () => {
  const [key, setKey] = useState(+new Date());
  const [discount, setDiscount] = useState(0);
  const [customerId, setCustomerId] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (args: OrderParams) => placeOrder(args),
  });
  const orderMenus = useAppSelector((state) => state.orders);
  const customers = useAppSelector((state) => state.customers);

  const onPurchase = () => {
    mutate({
      menus: orderMenus.menus.map((menu) => ({
        id: menu.id,
        quantity: menu.quantity,
        ice: menu.ice,
        sugar: menu.sugar,
        attributes: menu.attributes,
      })),
      discount,
      ...(customerId !== "" ? { customerId } : {}),
    });
    setDiscount(0);
  };

  return (
    <DialogContent>
      <DialogHeader>Checkout</DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div>Total</div>
          <div>
            $
            {orderMenus.menus.reduce(
              (total, menu) => total + menu.price * menu.quantity,
              0,
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>Customer Name</div>
          <Select key={key}>
            <SelectTrigger className="ml-auto mr-2 w-52">
              <SelectValue placeholder="Choose customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Customers</SelectLabel>
                {customers.data.map((customer) => (
                  <SelectItem
                    key={customer.id}
                    value={customer.id}
                    onClick={() => setCustomerId(customer.id)}
                  >
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCustomerId("");
              setKey(+new Date());
            }}
          >
            Clear
          </Button>
        </div>
        <div className="flex justify-between">
          <div>Discount</div>
          <div>{discount}%</div>
        </div>
        <div className="flex justify-between">
          <div>Checkout</div>
          <div>
            $
            {(orderMenus.menus.reduce(
              (total, menu) => total + menu.price * menu.quantity,
              0,
            ) /
              100) *
              (100 - discount)}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Discount</Button>
          </DialogTrigger>
          <DialogContent>
            <Label>Discount %</Label>
            <Input
              type="number"
              defaultValue={0}
              onChange={(e) => {
                const _discount = parseInt(e.target.value);
                if (
                  !Number.isNaN(_discount) &&
                  _discount >= 0 &&
                  _discount <= 100
                ) {
                  setDiscount(_discount);
                }
              }}
            ></Input>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setDiscount(0);
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Confirm</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DialogClose asChild>
          <Button onClick={onPurchase}>Make transaction</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default CheckoutDialogContent;
