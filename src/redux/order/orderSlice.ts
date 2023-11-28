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
      orderSlice.caseReducers.storeInLocalStorage(state);
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
      if (
        state.menus.find((menu) => menu.id === action.payload.id) &&
        state.menus.find((menu) => menu.cupSize === action.payload.cupSize) &&
        state.menus.find((menu) => menu.ice === action.payload.ice) &&
        state.menus.find((menu) => menu.sugar === action.payload.sugar) &&
        action.payload.quantity === 1
      ) {
        return;
      }

      state.menus.push(action.payload);
      orderSlice.caseReducers.storeInLocalStorage(state);
    },
    removeOrder: (
      state,
      action: PayloadAction<
        Omit<z.infer<typeof menuItemOrderSchema>, "quantity">
      >,
    ) => {
      if (
        state.menus.find((menu) => menu.id === action.payload.id) &&
        state.menus.find((menu) => menu.cupSize === action.payload.cupSize) &&
        state.menus.find((menu) => menu.ice === action.payload.ice) &&
        state.menus.find((menu) => menu.sugar === action.payload.sugar)
      ) {
        // Filter from state.menus if they meet the condition in if statement
        state.menus = state.menus.filter((menu) => {
          return (
            menu.id !== action.payload.id ||
            menu.cupSize !== action.payload.cupSize ||
            menu.ice !== action.payload.ice ||
            menu.sugar !== action.payload.sugar
          );
        });
        orderSlice.caseReducers.storeInLocalStorage(state);
      }
    },
    increaseQtyToOrder: (
      state,
      action: PayloadAction<
        Omit<z.infer<typeof menuItemOrderSchema>, "quantity">
      >,
    ) => {
      if (
        state.menus.find((menu) => menu.id === action.payload.id) &&
        state.menus.find((menu) => menu.cupSize === action.payload.cupSize) &&
        state.menus.find((menu) => menu.ice === action.payload.ice) &&
        state.menus.find((menu) => menu.sugar === action.payload.sugar)
      ) {
        state.menus = state.menus.map((menu) => {
          if (
            menu.id === action.payload.id &&
            menu.cupSize === action.payload.cupSize &&
            menu.ice === action.payload.ice &&
            menu.sugar === action.payload.sugar
          ) {
            menu.quantity += 1;
          }
          orderSlice.caseReducers.storeInLocalStorage(state);
          return menu;
        });
      }
    },
    decreaseQtyToOrder: (
      state,
      action: PayloadAction<
        Omit<z.infer<typeof menuItemOrderSchema>, "quantity">
      >,
    ) => {
      if (
        state.menus.find((menu) => menu.id === action.payload.id) &&
        state.menus.find((menu) => menu.cupSize === action.payload.cupSize) &&
        state.menus.find((menu) => menu.ice === action.payload.ice) &&
        state.menus.find((menu) => menu.sugar === action.payload.sugar)
      ) {
        state.menus = state.menus.map((menu) => {
          if (
            menu.id === action.payload.id &&
            menu.cupSize === action.payload.cupSize &&
            menu.ice === action.payload.ice &&
            menu.sugar === action.payload.sugar &&
            menu.quantity > 1
          ) {
            menu.quantity -= 1;
          }
          orderSlice.caseReducers.storeInLocalStorage(state);
          return menu;
        });
      }
    },
    storeInLocalStorage: (state) => {
      localStorage.setItem("order", JSON.stringify(state));
    },
    loadFromLocalStorage: (state) => {
      const order = localStorage.getItem("order");
      if (order) {
        return JSON.parse(order);
      }
      return state;
    },
  },
});

export const {
  setCustomer,
  addOrder,
  removeOrder,
  increaseQtyToOrder,
  decreaseQtyToOrder,
  loadFromLocalStorage,
} = orderSlice.actions;
export default orderSlice.reducer;
