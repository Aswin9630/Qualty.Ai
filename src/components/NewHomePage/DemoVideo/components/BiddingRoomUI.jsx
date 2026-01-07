import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";
import Joyride from "react-joyride";

export default function BiddingRoomUI({ onConfirmBid }) {
  const [view, setView] = useState("requests");
  const [runJoyride, setRunJoyride] = useState(true);
  const [showBids, setShowBids] = useState(false);

  const request = {
    category: "Agricultural & Food Commodities",
    location: "Tiruchirappalli, Tamil Nadu, India",
    urgency: "Medium",
    budget: 1000,
    status: "Completed",
    commodity: "Rice (basmati/non-basmati)",
    date: "12/22/2025",
  };

  const handleViewBids = () => {
    setRunJoyride(false);
    setShowBids(false);
    setTimeout(() => {
      setView("bids");
      setShowBids(true);
      setRunJoyride(true);
    }, 1000); 
  };

  return (
    <>
      {/* ---------------- JOYRIDE ---------------- */}
      <Joyride
        run={runJoyride}
        steps={
          view === "requests"
            ? [
                {
                  target: ".view-bids-btn",
                  content:
                    "Click here to view inspector bids for this request.",
                  placement: "bottom",
                  disableBeacon: true,
                  disableScrolling: true,
                  disableOverlay: true,
                  spotlightPadding: 6,
                  styles: {
                    tooltip: {
                      fontSize: "0.7rem",
                      padding: "6px 10px",
                      maxWidth: "180px",
                      borderRadius: "6px",
                    },
                    overlay: {
                      backgroundColor: "rgba(0,0,0,0.3)",
                    },
                    buttonNext: { display: "none" },
                    buttonBack: { display: "none" },
                    buttonSkip: { display: "none" },
                  },
                  spotlightClicks: true,
                },
              ]
            : [
                {
                  target: ".confirm-bid-btn",
                  content:
                    "Once you click this button, you will need to pay 30% initial payment to access the inspection chat room.",
                  placement: "right",
                  disableBeacon: true,
                  disableOverlay: true,
                  disableScrolling: true,
                  spotlightPadding: 6,
                  styles: {
                    tooltip: {
                      fontSize: "0.7rem",
                      padding: "8px 12px",
                      maxWidth: "220px",
                      borderRadius: "6px",
                    },
                    overlay: {
                      backgroundColor: "rgba(0,0,0,0.3)",
                    },
                    buttonNext: { display: "none" },
                    buttonBack: { display: "none" },
                    buttonSkip: { display: "none" },
                  },
                  spotlightClicks: true,
                },
              ]
        }
        continuous={false}
        showProgress={false}
        showSkipButton={false}
        hideCloseButton={true}
      />

      {/* ================= REQUEST VIEW ================= */}
      <div
        className={`transition-container w-full bg-gray-50 p-6 scale-[0.9] ${
          view !== "requests" ? "hidden" : ""
        }`}
        style={{
          transition: "all 1s ease",
          opacity: view === "requests" ? 1 : 0,
        }}
      >
        <h2 className="text-lg font-semibold text-center mb-6">
          Your Inspection Requests
        </h2>

        <div className="bg-white p-5 rounded-xl border shadow-sm max-w-md mx-auto">
          <div className="flex justify-between mb-3">
            <h3 className="text-sm font-semibold">
              Category: {request.category}
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-yellow-100">
                {request.urgency}
              </span>

              <FaTrashAlt
                className="text-red-500 text-xs cursor-pointer hover:text-red-600"
                title="Delete request"
              />
            </div>
          </div>

          <p className="text-xs flex items-center gap-2 text-gray-600 mb-3">
            <FaMapMarkerAlt />
            {request.location}
          </p>

          <div className="text-xs space-y-1 mb-4">
            <p>Budget: ${request.budget}</p>
            <p>Status: {request.status}</p>
            <p>Commodity: {request.commodity}</p>
            <p>Date: {request.date}</p>
          </div>

          <button
            className="view-bids-btn w-full bg-black text-white py-2 rounded text-xs"
            onClick={handleViewBids}
          >
            View Bids
          </button>
        </div>
      </div>

      {/* ================= BIDS VIEW ================= */}
      <div
        className={`transition-container w-full bg-white p-8 scale-[0.8] origin-top ${
          view !== "bids" ? "hidden" : ""
        }`}
        style={{
          transition: "all 1s ease",
          opacity: showBids ? 1 : 0,
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Inspection Bids Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review inspector bids and confirm the best fit for your inspection
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-10">
          <h3 className="flex items-center gap-2 text-green-600 font-semibold mb-6 text-sm">
            📊 Bidding Summary
          </h3>

          <div className="grid grid-cols-5 gap-4">
            {[
              ["1000", "My Amount"],
              ["1", "Total Bids"],
              ["1000", "Lowest Bid"],
              ["1000", "Highest Bid"],
              ["1", "Average Bid"],
            ].map(([value, label], i) => (
              <div key={i} className="bg-gray-50 rounded-lg py-4 text-center">
                <p className="text-lg font-semibold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h3 className="flex items-center gap-2 text-amber-800 font-semibold mb-4 text-sm">
            🧑‍⚕️ Inspector Bids
          </h3>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 max-w-md">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                👷 Inspector Name
              </div>

              <span className="text-[10px] px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                ACTIVE
              </span>
            </div>

            <div className="text-xs text-gray-600 space-y-1 mb-4">
              <p>
                <span className="font-medium">Bid Amount:</span> ₹1000/-
              </p>
              <p>
                <span className="font-medium">Submitted:</span> 12/19/2025,
                11:10:05 AM
              </p>
              <p>
                <span className="font-medium">Enquiry ID:</span>{" "}
                6944e50673adf32fc17168c1
              </p>
            </div>

            <button
              className="confirm-bid-btn w-full bg-black text-white py-2 rounded text-sm font-medium flex items-center justify-center gap-2"
              onClick={() => {
                setRunJoyride(false);
                onConfirmBid();
              }}
            >
              ✔ Confirm This Bid
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
