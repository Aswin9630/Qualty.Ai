import { Eye, Search } from "lucide-react";
import { useState } from "react";

export default function BidHistory() {
  const allBids = [
    {
      id: "SAMPLE-001",
      title: "Residential Property Inspection",
      client: "John Smith",
      location: "New York, NY",
      quote: "$450",
      myBid: "$420",
      status: "Active",
      date: "2024-01-15",
    },
    {
      id: "SAMPLE-002",
      title: "Warehouse Safety Audit",
      client: "Jane Doe",
      location: "Chicago, IL",
      quote: "$600",
      myBid: "$580",
      status: "Completed",
      date: "2024-02-10",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBids = allBids.filter((bid) =>
    `${bid.title} ${bid.client} ${bid.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transition-shadow duration-200 w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Bid History</h2>
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-64">
          <Search size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search bids..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-gray-900 placeholder-gray-500 outline-none w-full"
          />
        </div>
      </div>

      {/* Bid Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredBids.length} of {allBids.length} bids
      </p>

      {/* Bid Cards */}
      <div className="space-y-4">
        {filteredBids.length > 0 ? (
          filteredBids.map((bid) => (
            <div
              key={bid.id}
              className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              {/* Left Section */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{bid.title}</h3>
                <p className="text-sm text-gray-600">Client: {bid.client}</p>
                <p className="text-sm text-gray-600">Location: {bid.location}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-700">
                  <div>
                    <p className="font-medium text-gray-600">Quote</p>
                    <p className="text-gray-900 font-semibold">{bid.quote}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">My Bid</p>
                    <p className="text-gray-900 font-semibold">{bid.myBid}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Status</p>
                    <span className="inline-block border border-gray-900 text-gray-900 text-xs px-2 py-1 rounded-full mt-1">
                      {bid.status}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Date</p>
                    <p className="text-gray-900 mt-1">{bid.date}</p>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div>
                <button className="flex items-center gap-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white text-xs px-4 py-2 rounded-lg transition-colors duration-200">
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 py-10">No bids found.</div>
        )}
      </div>
    </div>
  );
}