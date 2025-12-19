import React from "react";

export default function InspectorStats({ totalBids, totalEarnings, wonBids, winRate, currency = "INR" }) {
  const symbol = currency === "USD" ? "$" : "₹";

  const stats = [
    { label: "Total Bids", value: totalBids },
    { label: "Won Bids", value: wonBids },
    { label: "Total Earnings", value: `${symbol}${totalEarnings}` },
    { label: "Success Rate", value: `${winRate}%` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300  rounded-lg p-4 text-center hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xl font-bold text-black mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
