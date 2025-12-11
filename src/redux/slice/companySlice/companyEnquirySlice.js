import { createSlice } from "@reduxjs/toolkit";

const companyEnquirySlice = createSlice({
  name: "companyEnquiry",
  initialState: {
    enquiries: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.enquiries = action.payload;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addEnquiries: (state, action) => {
      state.enquiries = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFail, addEnquiries } =
  companyEnquirySlice.actions;
export default companyEnquirySlice.reducer;
