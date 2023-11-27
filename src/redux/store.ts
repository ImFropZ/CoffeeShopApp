import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import menuReducer from "./menu/menuSlice";
import orderReducer from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    menus: menuReducer,
    orders: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
