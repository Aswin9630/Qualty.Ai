import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    allPayments: [],
    groupedByEnquiry: {},
  },
  reducers: {
    setPayments: (state, action) => {
      state.allPayments = action.payload;

      const grouped = {};
      action.payload.forEach((p) => {
        const enquiryId = p.enquiry?._id;
        if (enquiryId) {
          if (!grouped[enquiryId]) grouped[enquiryId] = [];
          grouped[enquiryId].push(p);
        }
      });

      state.groupedByEnquiry = grouped;
    },
    clearPayments: (state) => {
      state.allPayments = [];
      state.groupedByEnquiry = {};
    },
  },
});

export const { setPayments, clearPayments } = paymentSlice.actions;
export default paymentSlice.reducer;
