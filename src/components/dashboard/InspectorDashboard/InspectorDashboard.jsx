import React, { useEffect, useState } from "react";
import LiveBids from "./LiveBids";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addEnquiries } from "../../../redux/slice/enquirySlice";
import useFetchInspectorAnalytics from "../../../hooks/useFetchInspectorAnalytics";
import InspectorStats from "./InspectorStats";
import InspectorAnalysis from "./InspectorAnalysis";

const InspectorDashboard = () => {
  const [enquiryData, setEnquiryData] = useState("");
  const dispatch = useDispatch()
    useFetchInspectorAnalytics();

  const { totalBids, totalEarnings, wonBids, winRate } = useSelector(
    (state) => state.inspectorAnalysis.analytics || {}
  );

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/inspector/enquiries`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setEnquiryData(data.enquiries)
        dispatch(addEnquiries(data.enquiries))
      } catch (err) {
        console.error(err);
      }
    };
    loadEnquiries();
  }, []);
  
  return (
    <div className="min-h-screen bg-white py-10">
      <InspectorAnalysis/>
      <LiveBids/>
    </div>
  );
};

export default InspectorDashboard;
