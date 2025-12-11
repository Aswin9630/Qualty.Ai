import React from "react";

export default function CompanyActiveInspection() {
  const inspections = [
    {
      id: 1,
      title: "Residential Property Inspection",
      quote: "$450",
      bid: "$420",
      status: "In Progress",
    },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Active Inspections</h2>
        <span className="border border-gray-800 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
          {inspections.length} Active
        </span>
      </div>

      {/* Inspection Cards */}
      {inspections.map((inspection) => (
        <div
          key={inspection.id}
          className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4"
        >
          {/* Left Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{inspection.title}</h3>
            <p className="text-sm text-gray-600">ID: {inspection.id}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
              <div>
                <p className="font-medium text-gray-600">Quote</p>
                <p className="text-gray-900 font-semibold">{inspection.quote}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">My Bid</p>
                <p className="text-gray-900 font-semibold">{inspection.bid}</p>
              </div>
              <div>
                <p className="font-medium text-gray-600">Status</p>
                <span className="inline-block border border-gray-800 text-gray-800 text-xs px-2 py-1 rounded-full mt-1">
                  {inspection.status}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-600">Type</p>
                <p className="text-gray-900">Residential</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}