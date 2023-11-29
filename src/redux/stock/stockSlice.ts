import {
  createStock,
  createStockItem,
  getStocks,
  removeStockItem as removeStockItemRequest,
} from "@/lib/axios/stocks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Stock = {
  id: string;
  name: string;
  items: {
    id: string;
    expiresDate: string;
    quantity: number;
    price: number;
    stockId: string;
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

export const addStockItem = createAsyncThunk(
  "stock/addStockItem",
  async ({
    stockId,
    expiresDate,
    quantity,
    price,
  }: {
    stockId: string;
    expiresDate: string;
    quantity: number;
    price: number;
  }) => {
    return await createStockItem(stockId, expiresDate, quantity, price);
  },
);

export const removeStockItem = createAsyncThunk(
  "stock/removeStockItem",
  async ({
    stockId,
    stockItemId,
  }: {
    stockId: string;
    stockItemId: string;
  }) => {
    return await removeStockItemRequest(stockId, stockItemId);
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
      state.data.push({ ...action.payload, items: [] });
    });
    builder.addCase(addStockItem.fulfilled, (state, action) => {
      const stock = state.data.find(
        (stock) => stock.id === action.payload.stockId,
      );
      if (stock) {
        stock.items.push(action.payload);
      }
    });
    builder.addCase(removeStockItem.fulfilled, (state, action) => {
      const stock = state.data.find(
        (stock) => stock.id === action.payload.stockId,
      );
      if (stock) {
        stock.items = stock.items.filter(
          (item) => item.id !== action.payload.id,
        );
      }
    });
  },
});

export default stockSlice.reducer;
