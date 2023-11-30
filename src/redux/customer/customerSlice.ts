import {
  CreateCustomer,
  Customer,
  getCustomers,
  createCustomer as cCustomer,
  updateCustomer as uCustomer,
} from "@/lib/axios/customers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [] as Customer[],
};

export const initCustomers = createAsyncThunk("customer/init", async () => {
  return await getCustomers();
});

export const createCustomer = createAsyncThunk(
  "customer/create",
  async (customer: CreateCustomer) => {
    return await cCustomer(customer);
  },
);

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async ({ id, customer }: { id: string; customer: Customer }) => {
    return await uCustomer(id, customer);
  },
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initCustomers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.data = state.data.map((customer) => {
        if (customer.id === action.payload.id) {
          return action.payload;
        }
        return customer;
      });
    });
  },
});

export default customerSlice.reducer;
