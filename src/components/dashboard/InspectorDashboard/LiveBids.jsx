import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrencySymbol } from "../../../utils/constants";

const LiveBids = () => {
  const raisedEnquiries = useSelector((state) => state.enquiry.raisedEnquiry);
  const navigate = useNavigate();

  const limitedEnquiries = (raisedEnquiries || [])
    .filter(
      (e) =>
        e.category &&
        e.subcategory &&
        e.commodity &&
        e.location &&
        e.inspectionBudget
    )
    .slice(0, 2);

  return (
    <section className="bg-white text-black p-6 rounded-xl shadow-md max-w-4xl mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Live Bids</h2>
        <span className="text-sm text-gray-500">
          {raisedEnquiries?.length || 0} Active Bids
        </span>
      </div>

      <section className="space-y-4">
        {limitedEnquiries.length === 0 ? (
          <p className="text-gray-500">No live enquiries available</p>
        ) : (
          limitedEnquiries.map((bid, index) => (
            <div
              key={bid._id || index}
              className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-500">Category:</span>{" "}
                  <span className="text-black">{bid.category || "—"}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-500">Subcategory:</span>{" "}
                  <span className="text-black">{bid.subcategory || "—"}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-500">Commodity:</span>{" "}
                  <span className="text-black">{bid.commodity || "—"}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-500">Location:</span>{" "}
                  <span className="text-black">{bid.location || "—"}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-500">Urgency:</span>{" "}
                  <span
                    className={`font-semibold ${
                      bid.urgency === "High"
                        ? "text-red-500"
                        : bid.urgency === "Medium"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {bid.urgency || "—"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-500">Budget:</span>{" "}
                  <span className="text-green-600 font-semibold">
  {getCurrencySymbol(bid.country)}{bid.inspectionBudget || "—"}/-
</span>
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex flex-col items-end gap-2 w-full md:w-auto">
                <button
                  onClick={() => navigate("/inspector/bidding")}
                  className="bg-black cursor-pointer hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  View Request
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {raisedEnquiries?.length > 2 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/inspector/bidding")}
            className="bg-black cursor-pointer hover:bg-gray-900 px-6 py-2 rounded text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            View All →
          </button>
        </div>
      )}
    </section>
  );
};

export default LiveBids;
