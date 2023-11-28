import { createStock, getStocks } from "@/lib/axios/stocks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Stock = {
  id: string;
  name: string;
  items: {
    id: string;
    expiresDate: string;
    quantity: number;
    price: number;
  }[];
};

const initialState = {
  data: [] as Stock[],
};

export const initStocks = createAsyncThunk("stock/initStocks", async () => {
  return await getStocks();
});

export const addStock = createAsyncThunk(
  "stock/addStock",
  async (name: string) => {
    return await createStock(name);
  },
);

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initStocks.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addStock.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
  },
});

export default stockSlice.reducer;
