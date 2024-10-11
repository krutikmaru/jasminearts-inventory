import { createSlice } from "@reduxjs/toolkit";
import customers from "./state";

const customersSlice = createSlice({
  name: "customers",
  initialState: customers,
  reducers: {
    addCustomer: (state, action) => {},
    updateCustomer: (state, action) => {},
  },
});

export const { addCustomer, updateCustomer } = customersSlice.actions;

export default customersSlice.reducer;
