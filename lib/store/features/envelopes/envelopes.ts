import { createSlice } from "@reduxjs/toolkit";
import envelopes from "./state";

const envelopeSlice = createSlice({
  name: "envelopes",
  initialState: envelopes,
  reducers: {
    addEnvelope: (state, action) => {
      state.push(action.payload);
    },
    updateEnvelope: (state, action) => {
      console.log(action);
      const index = state.findIndex(
        (object) => object.itemCode === action.payload.itemCode
      );
      console.log(index);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addEnvelope, updateEnvelope } = envelopeSlice.actions;

export default envelopeSlice.reducer;
