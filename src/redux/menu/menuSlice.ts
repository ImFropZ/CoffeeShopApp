import {
  CreateMenu,
  UpdateMenu,
  createMenu,
  getMenus,
  updateMenu,
  updateMenuItems as _updateMenuItems,
  UpdateMenuItem,
} from "@/lib/axios/menus";
import { menuSchema } from "@/schema/menus";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as z from "zod";

const initialState = {
  data: [] as z.infer<typeof menuSchema>[],
  isLoading: true,
};

export const initMenus = createAsyncThunk("menus/initMenus", async () => {
  const { data } = await getMenus();
  return data;
});

export const addMenu = createAsyncThunk(
  "menus/createMenu",
  async (item: CreateMenu) => {
    return await createMenu(item);
  },
);

export const changeMenu = createAsyncThunk(
  "menus/updateMenu",
  async ({ id, item }: { id: string; item: UpdateMenu }) => {
    return await updateMenu(id, item);
  },
);

export const updateMenuItems = createAsyncThunk(
  "menus/updateMenuItems",
  async ({ id, items }: { id: string; items: UpdateMenuItem[] }) => {
    const updatedMenus = await _updateMenuItems(id, items);

    // Return the latest update menu
    return updatedMenus[updatedMenus.length - 1];
  },
);

const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initMenus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(initMenus.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(initMenus.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addMenu.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addMenu.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addMenu.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(changeMenu.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeMenu.fulfilled, (state, action) => {
      const index = state.data.findIndex((m) => m.id === action.payload.id);
      state.data[index] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(changeMenu.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateMenuItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMenuItems.fulfilled, (state, action) => {
      const index = state.data.findIndex((m) => m.id === action.payload.id);
      state.data[index] = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateMenuItems.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default menuSlice.reducer;
