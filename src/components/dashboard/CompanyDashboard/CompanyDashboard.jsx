import React, { useEffect, useState } from "react";
import useFetchCompanyEnquiries from "../../../hooks/companyHooks/useFetchCompanyEnquiries";
import useFetchCompanyAnalytics from "../../../hooks/companyHooks/useFetchCompanyAnalytics";
import LiveBidsCompany from "../../../components/dashboard/CompanyDashboard/CompanyLiveBids";
import CompanyAnalysis from "../../../components/dashboard/CompanyDashboard/CompanyAnalysis";
import { useDispatch } from "react-redux";
import { addEnquiries } from "../../../redux/slice/companySlice/companyEnquirySlice";
import { COMPANY_API } from "../../../utils/constants";
import ShimmerUI from "../../../components/ShimmerUI";
import { toast } from "react-toastify";

export default function CompanyDashboard() {
  useFetchCompanyEnquiries();
  useFetchCompanyAnalytics();
  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${COMPANY_API}/enquiries`, { credentials: "include" });
        const data = await res.json()
        dispatch(addEnquiries(data.enquiries || []));
      } catch (e) {
        console.error("Dashboard load error:", e);
      } 
    }
    load();
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <CompanyAnalysis />
        <LiveBidsCompany />
      </div>
    </div>
  );
}
