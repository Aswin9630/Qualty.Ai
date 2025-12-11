import { createSlice } from "@reduxjs/toolkit";

const companyAnalysisSlice = createSlice({
  name: "companyAnalysis",
  initialState: {
    analytics: null,
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
      state.analytics = action.payload;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFail } =
  companyAnalysisSlice.actions;
export default companyAnalysisSlice.reducer;
