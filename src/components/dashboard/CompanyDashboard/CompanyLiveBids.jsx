import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrencySymbol } from "../../../utils/constants";

export default function LiveBidsCompany() { 
   const enquiries = useSelector((s) => s.companyEnquiry.enquiries);
  const navigate = useNavigate();

  if (!enquiries.length) return <p className="text-gray-500 text-center">No live enquiries available</p>;

  return (
    <section className="bg-white text-black p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Live Requests</h2>
        <span className="text-sm text-gray-500">{enquiries.length} Active</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enquiries.slice(0, 6).map((e) => (
          <div key={e._id} className="bg-white border border-gray-200 rounded-xl p-5 flex justify-between items-start">
            <div className="text-sm text-gray-700">
              <p><strong>Commodity:</strong> <span className="text-black">{e.commodity || e.category}</span></p>
              <p><strong>Location:</strong> <span className="text-black">{e.inspectionLocation || e.location}</span></p>
              <p><strong>Budget:</strong> <span className="text-green-600 font-semibold">{e.currency==="INR"?"₹":"$"}{e.inspectionBudget}</span></p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate("/inspection_company/bidding")} className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-900">View</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
