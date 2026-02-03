import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gstVerified: false,
  gstNumber: null,
  gstStatus: null,
  gstDetails: null,
};

const gstSlice = createSlice({
  name: "gst",
  initialState,
  reducers: {
    setGstVerification(state, action) {
      const { gstNumber, status, details } = action.payload;

      state.gstVerified = true;
      state.gstNumber = gstNumber;
      state.gstStatus = status;
      state.gstDetails = details;
    },

    clearGstVerification(state) {
      state.gstVerified = false;
      state.gstNumber = null;
      state.gstStatus = null;
      state.gstDetails = null;
    },
  },  
});

export const { setGstVerification, clearGstVerification } =
  gstSlice.actions;

export default gstSlice.reducer;
