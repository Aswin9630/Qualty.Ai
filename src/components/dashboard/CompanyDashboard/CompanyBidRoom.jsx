import React from "react";
import { useSelector } from "react-redux";
import Shimmer from "../../../components/ShimmerUI";
import CompanyBidCard from "./CompanyBidCards";
import useFetchCompanyEnquiries from "../../../hooks/companyHooks/useFetchCompanyEnquiries";

export default function CompanyBidRoom() {
  useFetchCompanyEnquiries()
  const enquiries = useSelector((s) => s.companyEnquiry.enquiries);

  if (!Array.isArray(enquiries)) {
    return (
      <div className="min-h-screen bg-white px-6 py-10">
        <Shimmer className="h-8 w-1/3 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Shimmer className="h-40 rounded" />
          <Shimmer className="h-40 rounded" />
        </div>
      </div>
    );
  }

  if (enquiries.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No live enquiries available</p>;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enquiries.map((enquiry) => (
          <CompanyBidCard key={enquiry._id} enquiry={enquiry} />
        ))}
      </div>
    </div>
  );
}
