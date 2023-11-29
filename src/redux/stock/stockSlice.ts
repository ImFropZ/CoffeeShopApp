import {
  createStock,
  createStockItem,
  getStocks,
  removeStockItem as removeStockItemRequest,
  updateStockItems as updateStockItemsRequest,
} from "@/lib/axios/stocks";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export type StockUpdate = {
  id: string;
  quantity: number;
};

const initialState = {
  data: [] as Stock[],
  stockUpdates: [] as StockUpdate[],
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

export const updateStockItems = createAsyncThunk(
  "stock/updateStockItems",
  async (stockUpdates: StockUpdate[]) => {
    return await updateStockItemsRequest(stockUpdates);
  },
);

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    initStockUpdates: (state) => {
      const stockUpdates = localStorage.getItem("stockUpdates");
      if (!stockUpdates) {
        state.stockUpdates = [];
        return;
      }
      state.stockUpdates = JSON.parse(stockUpdates);
    },
    storeInLocalStorage: (state) => {
      localStorage.setItem("stockUpdates", JSON.stringify(state.stockUpdates));
    },
    updateStockItem: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      // Validate the quantity can not below 0
      if (action.payload.quantity < 0) {
        return;
      }

      const stockItems = state.data.map((stock) => stock.items).flat();

      // Check if the stock item and the quantity is the same as default stock item
      if (
        stockItems.find((item) => item.id === action.payload.id) &&
        stockItems.find((item) => item.id === action.payload.id)?.quantity ===
          action.payload.quantity
      ) {
        state.stockUpdates = state.stockUpdates.filter(
          (update) => update.id !== action.payload.id,
        );
        stockSlice.caseReducers.storeInLocalStorage(state);
        return;
      }

      // Check if the stock item is already in the stock updates
      if (
        state.stockUpdates.find((update) => update.id === action.payload.id)
      ) {
        state.stockUpdates = state.stockUpdates.map((update) => {
          if (update.id === action.payload.id) {
            return { ...update, quantity: action.payload.quantity };
          }
          return update;
        });
        stockSlice.caseReducers.storeInLocalStorage(state);
        return;
      }

      stockSlice.caseReducers.storeInLocalStorage(state);
      state.stockUpdates.push(action.payload);
    },
    resetStockUpdates: (state) => {
      state.stockUpdates = [];
      stockSlice.caseReducers.storeInLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initStocks.fulfilled, (state, action) => {
      stockSlice.caseReducers.initStockUpdates(state);
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
    builder.addCase(updateStockItems.fulfilled, (state, action) => {
      stockSlice.caseReducers.resetStockUpdates(state);

      const stockItems = state.data.map((stock) => stock.items).flat();

      action.payload.forEach((item) => {
        const stockItem = stockItems.find(
          (stockItem) => stockItem.id === item.id,
        );
        if (stockItem) {
          stockItem.quantity = item.quantity;
        }
      });

      stockSlice.caseReducers.storeInLocalStorage(state);
    });
  },
});

export const {
  updateStockItem,
  initStockUpdates,
  storeInLocalStorage,
  resetStockUpdates,
} = stockSlice.actions;
export default stockSlice.reducer;
