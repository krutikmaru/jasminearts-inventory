import { configureStore } from "@reduxjs/toolkit";
import envelopeCategoriesSlice from "./features/envelope-categories/envelopeCategoriesSlice";
import envelopes from "./features/envelopes/envelopes";
import customers from "./features/customers/customers";

export const createStore = () => {
  return configureStore({
    reducer: {
      envelopeCategories: envelopeCategoriesSlice,
      envelopes: envelopes,
      customers: customers,
    },
  });
};

// Infer the type of createStore
export type AppStore = ReturnType<typeof createStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
