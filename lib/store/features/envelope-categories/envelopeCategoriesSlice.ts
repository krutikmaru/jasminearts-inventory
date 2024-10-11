import { createSlice, configureStore } from "@reduxjs/toolkit";
import categories from "./state";

const envelopeCategoriesSlice = createSlice({
  name: "envelopeCategories",
  initialState: categories,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory: (state, action) => {},
    deleteCategory: (state, action) => {},
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  envelopeCategoriesSlice.actions;

export default envelopeCategoriesSlice.reducer;
