import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboardStatus",
  initialState: {
    status: null,
  },
  reducers: {
    setDashboardStatus: (state, action) => {
      state.status = action.payload;
    },
    clearDashboardStatus: (state) => {
      state.status = null;
    },
  },
});

export const { setDashboardStatus, clearDashboardStatus } = dashboardSlice.actions;
export default dashboardSlice.reducer;
