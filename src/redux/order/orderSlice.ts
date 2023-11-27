import { menuItemOrderSchema } from "@/schema/order";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { z } from "zod";

const initialState = {
  menus: [] as (z.infer<typeof menuItemOrderSchema> & {
    picture: string;
    name: string;
    price: number;
  })[],
  customerId: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCustomer: (state, action: PayloadAction<string>) => {
      const customerId = z.string().uuid().parse(action.payload);
      state.customerId = customerId;
    },
    addOrder: (
      state,
      action: PayloadAction<
        z.infer<typeof menuItemOrderSchema> & {
          picture: string;
          name: string;
          price: number;
        }
      >,
    ) => {
      state.menus.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      const id = z.string().uuid().parse(action.payload);
      state.menus = state.menus.filter((menu) => menu.id !== id);
    },
    increaseQtyToOrder: (state, action: PayloadAction<string>) => {
      const id = z.string().uuid().parse(action.payload);
      state.menus = state.menus.map((menu) => {
        if (menu.id === id) {
          menu.quantity += 1;
        }
        return menu;
      });
    },
    decreaseQtyToOrder: (state, action: PayloadAction<string>) => {
      const id = z.string().uuid().parse(action.payload);
      state.menus = state.menus.map((menu) => {
        if (menu.id === id && menu.quantity > 1) {
          menu.quantity -= 1;
        }
        return menu;
      });
    },
  },
});

export const {
  setCustomer,
  addOrder,
  removeOrder,
  increaseQtyToOrder,
  decreaseQtyToOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
