import React, { useEffect, useState } from "react";
import { COMPANY_API } from "../../../utils/constants";
import Shimmer from "../../../components/ShimmerUI";
import { useNavigate } from "react-router-dom";

export default function CompanyHistory() {
  const [bids, setBids] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${COMPANY_API}/history`, { credentials: "include" });
        const data = await res.json();
       
        if (res.ok) setBids(data.bids || []);
        else { console.error(data.message || "Failed to load"); setBids([]); }
      } catch (err) {
        console.error("Network error");
        setBids([]);
      }
    })();
  }, []);

  if (bids === null) {
    return (
      <div className="min-h-screen bg-white px-6 py-10">
        <Shimmer className="h-8 w-1/3 rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Shimmer className="h-28 rounded" />
          <Shimmer className="h-28 rounded" />
          <Shimmer className="h-28 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Bid History</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bids.map((b) => {
            const { enquiry } = b;
            return (
              <div key={b._id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <p className="text-sm text-gray-500 mb-1"><strong>Commodity:</strong> {enquiry?.commodity || enquiry?.category}</p>
                <p className="text-sm text-gray-500 mb-1"><strong>Location:</strong> {enquiry?.location || enquiry?.inspectionLocation}</p>
                <p className="text-sm text-gray-500 mb-1"><strong>Inspection Date:</strong> {new Date(enquiry?.dateFrom).toLocaleDateString()} → {new Date(enquiry?.dateTo).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500 mb-1"><strong>Bid Amount:</strong> ₹{b.amount}</p>
                <p className="text-sm text-gray-500 mb-3"><strong>Status:</strong> {b.status}</p>
                <button
                  onClick={() => navigate(`/inspection_company/history/${b._id}`)}
                  className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-900 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
