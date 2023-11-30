import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import menuReducer from "./menu/menuSlice";
import orderReducer from "./order/orderSlice";
import stockReducer from "./stock/stockSlice";
import customerReducer from "./customer/customerSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    menus: menuReducer,
    orders: orderReducer,
    stocks: stockReducer,
    customers: customerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
