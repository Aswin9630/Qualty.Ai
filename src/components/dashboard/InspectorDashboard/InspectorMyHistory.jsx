import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const InspectorHistory = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspector/history`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.bids)) {
          const cleanBids = data.bids.filter((bid) => bid && bid.enquiry);
          setBids(cleanBids);
        } else {
          toast.error(data.message || "Invalid response");
        }
      } catch (err) {
        toast.error("Failed to load history");
      }
    };
    fetchHistory();
  }, []);

  const formatDateRange = (from, to) => {
    if (!from || !to) return "—";
    try {
      const fromDate = new Date(from).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const toDate = new Date(to).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `${fromDate} → ${toDate}`;
    } catch {
      return "—";
    }
  };

  const getUrgencyBadge = (urgency) => {
    const base = "absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full";
    if (urgency === "High") return `${base} bg-red-100 text-red-700`;
    if (urgency === "Medium") return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-gray-100 text-gray-600`;
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-black mb-2 tracking-wide">
            My Bid History
          </h1>
          <p className="text-gray-600 text-sm">
            All bids placed by you as an inspector
          </p>
        </div>

        {bids.length === 0 ? (
          <p className="text-center text-gray-500">No bids placed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bids.map((bid) => {
              const { _id, amount, status, enquiry } = bid;
              if (!enquiry) return null;

              return (
                <div
                  key={_id}
                  className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 text-sm"
                >
                  {/* Urgency Badge */}
                  <span className={getUrgencyBadge(enquiry.urgency)}>
                    {enquiry.urgency || "—"}
                  </span>

                  <div className="space-y-1 text-gray-700 mb-3">
                    <p><strong>Commodity:</strong> {enquiry.commodity || "—"}</p>
                    <p><strong>Location:</strong> {enquiry.location || "—"}</p>
                    <p><strong>Inspection Date:</strong> {formatDateRange(enquiry.dateFrom, enquiry.dateTo)}</p>
                    <p><strong>Bid Amount:</strong> ₹{amount ?? "—"}</p>
                    <p><strong>Status:</strong> <span className={`font-semibold ${
                      status === "won" ? "text-green-600" : "text-yellow-500"
                    }`}>{status || "—"}</span></p>
                  </div>

                  <button
                    onClick={() => navigate(`/inspector/enquiry/${enquiry._id}`)}
                    className="w-full mt-2 cursor-pointer bg-black text-white text-xs font-medium px-4 py-2 rounded hover:bg-gray-800 transition"
                  >
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InspectorHistory;
