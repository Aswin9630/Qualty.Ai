import { createSlice } from "@reduxjs/toolkit";

const companyBidSlice = createSlice({
  name: "companyBid",
  initialState: {
    bids: [],
    loading: false,
    error: null,
  },
  reducers: {
    placeBidSuccess: (state, action) => {
      state.bids.unshift(action.payload);
    },
    setBids: (state, action) => {
      state.bids = action.payload;
    },
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state) => {
      state.loading = false;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { placeBidSuccess, setBids, fetchStart, fetchSuccess, fetchFail } =
  companyBidSlice.actions;
export default companyBidSlice.reducer;
