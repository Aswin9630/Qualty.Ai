import React, { useState } from "react";
import Joyride from "react-joyride";

export default function InspectionCard() {
  const [showDetails, setShowDetails] = useState(false);

  const steps = [
    {
      target: ".history-topic",
      content: "This is the topic header.",
    },
    {
      target: ".inspection-title",
      content: "This is the inspection title.",
    },
    {
      target: ".inspection-status",
      content: "Shows the status of the inspection.",
    },
    {
      target: ".view-details-btn",
      content: "Click here to view detailed inspection info.",
    },
    {
      target: ".back-btn",
      content: "Click here to go back to the summary view.",
    },
  ];

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-4">
      <Joyride
        steps={steps}
        continuous={true}
        showSkipButton={true}
        scrollToFirstStep={false} // Prevent Joyride from scrolling
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#000",
            textColor: "#333",
          },
        }}
      />

      <div className="w-full max-w-4xl transform scale-90">
        {/* Topic Header */}
        <h1 className="history-topic font-bold text-2xl mb-4 text-center">
          History
        </h1>

        {!showDetails ? (
          // =======================
          // Inspection Card
          // =======================
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-lg inspection-title">
                industrial_raw - coal
              </h2>
              <span className="text-gray-500 text-xs px-3 py-1 border rounded-full inspection-status">
                CANCELLED
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Category:</span> energy_commodities
              </p>
              <p>
                <span className="font-semibold">Location:</span> Toronto, ON, Canada
              </p>
              <p>
                <span className="font-semibold">Date:</span> 17/12/2025
              </p>
              <p>
                <span className="font-semibold">Cost:</span> $900
              </p>
              <p>
                <span className="font-semibold">Bid Closed:</span> $0
              </p>
              <p>
                <span className="font-semibold">Savings:</span> $900
              </p>
            </div>
            <button
              onClick={() => setShowDetails(true)}
              className="w-full bg-black text-white py-2 rounded-md flex justify-center items-center space-x-2 view-details-btn"
            >
              <span>✔</span>
              <span>View Details</span>
            </button>
          </div>
        ) : (
          // =======================
          // Inspection Detail Summary
          // =======================
          <div className="bg-white rounded-xl shadow-md p-6 text-sm text-gray-800 border border-gray-300">
            <div className="flex justify-between items-start mb-4">
              <h1 className="font-bold text-xl">Qualty.ai</h1>
              <div className="text-right text-xs text-gray-500">
                <p>Date Issued: 16/12/2025, 3:55:11 pm</p>
                <p>Reference ID: 6941335fcf10cc86fab6c88e</p>
              </div>
            </div>

            <hr className="my-2" />

            <div className="mb-4">
              <h2 className="font-semibold mb-2">Customer Information</h2>
              <p>
                <span className="font-semibold">Customer ID:</span> username
              </p>
              <p>
                <span className="font-semibold">Location:</span> Toronto, ON, Canada
              </p>
              <p>
                <span className="font-semibold">Country:</span> Canada
              </p>
            </div>

            <hr className="my-2" />

            <div className="mb-4">
              <h2 className="font-semibold mb-2">Inspection Details</h2>
              <p>
                <span className="font-semibold">Commodity:</span> coal
              </p>
              <p>
                <span className="font-semibold">Category:</span> industrial_raw
              </p>
              <p>
                <span className="font-semibold">Volume:</span> 900 kg
              </p>
              <p>
                <span className="font-semibold">Inspection Type:</span> Physical
              </p>
              <p>
                <span className="font-semibold">Services:</span> pre-shipment, loading, stuffing
              </p>
              <p>
                <span className="font-semibold">Certifications:</span> NABL
              </p>
              <p>
                <span className="font-semibold">Inspection Window:</span> 17 December 2025 to 18 December 2025
              </p>
              <p>
                <span className="font-semibold">Inspection Budget:</span> $900
              </p>
            </div>

            <hr className="my-2" />

            <div className="text-right space-y-1">
              <p>
                <span className="font-semibold">Total Amount:</span> $900
              </p>
              <p>
                <span className="font-semibold">Amount Paid:</span> $0
              </p>
              <p>
                <span className="font-semibold">Balance Due:</span> $900
              </p>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-4 w-full bg-black text-white py-2 rounded-md back-btn"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
