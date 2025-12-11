import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"
import enquiryReducer from "./slice/enquirySlice"
import BidPlacedReducer from "./slice/bidSlice"
import enquiryBidReducer from "./slice/enquiryBidSlice"
import customerEnquiryReducer from "./slice/customerEnquirySlice"
import locationReducer from "./slice/locationSlice"
import inspectorAnalysisReducer from "./slice/inspectorAnalysisSlice"
import inspectionProgressReducer from "./slice/inspectionProgressSlice"
import dashboardStatsReducer from "./slice/dashboardStatsSlice"
import paymentReducer from "./slice/paymentSlice"
import cartReducer from "./slice/cartSlice"
import companyEnquiryReducer from "./slice/companySlice/companyEnquirySlice"
import companyAnalysisReducer  from "./slice/companySlice/companyAnalysisSlice"
import companyBidReducer from "./slice/companySlice/companyBidSlice"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        enquiry:enquiryReducer,
        bid:BidPlacedReducer,
        enquiryBid:enquiryBidReducer,
        customerEnquiry:customerEnquiryReducer,
        location:locationReducer,
        inspectorAnalysis:inspectorAnalysisReducer,
        inspectionProgress:inspectionProgressReducer,
        dashboardStatus:dashboardStatsReducer,
        payments: paymentReducer,
        cart:cartReducer,
        companyEnquiry:companyEnquiryReducer,
        companyBid:companyBidReducer,
        companyAnalysis:companyAnalysisReducer,
    }
})

export default appStore