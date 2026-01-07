import React, { useState } from "react";
import Joyride from "react-joyride";

export default function PaymentHistoryUI() {
  const [run, setRun] = useState(true);

  const steps = [
    {
      target: "#header",
      content: "This is the Payment History section. See all your transactions here.",
      placement: "bottom",
    },
    {
      target: "#tab-quick-service",
      content: "This tab shows Quick Service payments (currently none).",
      placement: "bottom",
    },
    {
      target: "#tab-other-summary",
      content: "Other Summary tab showing grouped transaction summaries.",
      placement: "bottom",
    },
    {
      target: "#tab-actions",
      content: "Actions tab for performing related operations.",
      placement: "bottom",
    },
    {
      target: "#content",
      content: "This area shows your payment details. Currently empty.",
      placement: "top",
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-start bg-gray-50 p-8 overflow-auto">
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />

      <div
        className="w-full max-w-3xl"
        style={{ transform: "scale(0.9)", transformOrigin: "top left" }}
      >
        {/* Header */}
        <div id="header" className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your completed transactions, grouped by inspection
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            id="tab-quick-service"
            className="px-6 py-2 bg-white text-gray-400 rounded-lg shadow-sm cursor-not-allowed"
          >
            No Quick Service payments
          </button>
          <button
            id="tab-other-summary"
            className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm"
          >
            Other Summary
          </button>
          <button
            id="tab-actions"
            className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm"
          >
            Actions
          </button>
        </div>

        {/* Content */}
        <div
          id="content"
          className="bg-white p-6 rounded-lg shadow-sm text-center"
        >
          <h2 className="text-gray-800 font-semibold text-lg mb-1">
            No payments found
          </h2>
          <p className="text-gray-500 text-sm">
            You haven’t completed any transactions yet.
          </p>
        </div>
      </div>
    </div>
  );
}
