import { createMenu, getMenus, updateMenu } from "@/lib/axios/menus";
import { createMenuSchema, menuSchema, updateMenuSchema } from "@/schema/menus";
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
  async (item: z.infer<typeof createMenuSchema>) => {
    return await createMenu(item);
  },
);

export const changeMenu = createAsyncThunk(
  "menus/updateMenu",
  async ({
    id,
    item,
  }: {
    id: string;
    item: z.infer<typeof updateMenuSchema>;
  }) => {
    return await updateMenu(id, item);
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
      const newMenus = state.data.map((menu) => {
        if (menu.name === action.payload.name) {
          menu.data.push(action.payload);
        }
        return menu;
      });
      state.data = newMenus;
      state.isLoading = false;
    });
    builder.addCase(addMenu.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(changeMenu.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeMenu.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(changeMenu.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default menuSlice.reducer;
