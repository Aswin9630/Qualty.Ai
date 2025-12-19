import { useDispatch, useSelector } from "react-redux";
import useFetchEnquiries from "../../../hooks/useFetchEnquiries";
import { BASE_URL, getCurrencySymbol } from "../../../utils/constants";
import { addPlaceBid } from "../../../redux/slice/bidSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const InspectorBidRoom = () => {
  useFetchEnquiries();
  const dispatch = useDispatch();
  const enquiries = useSelector((state) => state.enquiry.raisedEnquiry);

  const isArray = Array.isArray(enquiries);
  const [bidAmounts, setBidAmounts] = useState({});

  const handleAmountChange = (id, value) => {
    setBidAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleBid = async (id) => {
    const bidAmount = Number(bidAmounts[id]);
    if (!bidAmount || bidAmount <= 0) return alert("Enter a valid bid amount");

    try {
      const response = await fetch(`${BASE_URL}/inspector/bid/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: bidAmount }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        dispatch(addPlaceBid(data.bid));
        toast.success(data.message);
        setBidAmounts((prev) => ({ ...prev, [id]: "" }));
      } else {
        toast.error(data.message || "Bid failed");
      }
    } catch (err) {
      console.error("Bid error:", err);
      toast.error("Error placing bid");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-black">Bidding Room</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isArray ? enquiries.length : 0} inspection opportunities available
            </p>
          </div>
        </div>

        {!isArray ? (
          <p className="text-center text-gray-500">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-center text-gray-500">No live enquiries available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-black">
                    {enquiry.category || "—"}
                  </h2>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      enquiry.urgency === "High"
                        ? "bg-red-100 text-red-600"
                        : enquiry.urgency === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {enquiry.urgency || "—"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong>{" "}
                  <span className="text-black">{enquiry.location || "—"}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Customer:</strong>{" "}
                  <span className="text-black">{enquiry.contact?.name || "—"}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Inspection Type:</strong>{" "}
                  <span className="text-black">
                    {enquiry.physicalInspection ? "Physical" : ""}
                    {enquiry.physicalInspection && enquiry.chemicalInspection ? ", " : ""}
                    {enquiry.chemicalInspection ? "Chemical" : ""}
                    {!enquiry.physicalInspection && !enquiry.chemicalInspection ? "—" : ""}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
  <strong>Budget:</strong>{" "}
  <span className="text-green-600 font-semibold">
    {getCurrencySymbol(enquiry.country)} {enquiry.inspectionBudget || "—"}
  </span>
</p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Deadline:</strong>{" "}
                  <span className="text-black">
                    {enquiry.dateTo
                      ? new Date(enquiry.dateTo).toLocaleDateString()
                      : "Not specified"}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Volume:</strong>{" "}
                  <span className="text-black">{enquiry.volume || "—"}</span>
                </p>

                <div className="mt-4 flex gap-2 font-normal text-sm">
                  <input
                    type="number"
                    value={bidAmounts[enquiry._id] || ""}
                    onChange={(e) =>
                      handleAmountChange(enquiry._id, e.target.value)
                    }
                    placeholder="Your bid (₹)"
                    className="no-spinner bg-white border border-gray-300 text-black px-2 py-1 rounded-md w-full outline-none focus:ring-2 focus:ring-black text-sm"
                    disabled={enquiry.hasPlacedBid}
                  />
                  <button
                    onClick={() => handleBid(enquiry._id)}
                    disabled={enquiry.hasPlacedBid}
                    className={`px-3 py-1 rounded-md text-sm font-semibold transition-all duration-200 ${
                      enquiry.hasPlacedBid
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white cursor-pointer hover:bg-gray-700"
                    }`}
                  >
                    {enquiry.hasPlacedBid ? "Bid Placed" : "Place Bid"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorBidRoom;
