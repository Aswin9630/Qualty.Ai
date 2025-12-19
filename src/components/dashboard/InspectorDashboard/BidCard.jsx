import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { addPlaceBid } from "../../../redux/slice/bidSlice";
import { toast } from "react-toastify";

const getCurrencySymbol = (currency) => (currency === "USD" ? "$" : "₹");

const BidCard = () => {
  const enquiries = useSelector((state) => state.enquiry.raisedEnquiry);
  const dispatch = useDispatch();
  const [bidAmounts, setBidAmounts] = useState({});
  const [placedBids, setPlacedBids] = useState({});

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
      if (data && data.success) {
        dispatch(addPlaceBid(data.bid));
        toast.success(data.message || "Bid placed successfully");
        setPlacedBids((prev) => ({ ...prev, [id]: true }));
        setBidAmounts((prev) => ({ ...prev, [id]: "" }));
      } else {
        toast.error(data.message || "Failed to place bid");
      }
    } catch (err) {
      console.error("Bid error:", err);
      toast.error("Something went wrong");
    }
  };

  if (!Array.isArray(enquiries) || enquiries.length === 0) {
    return <p className="text-gray-500 text-center">No live enquiries available</p>;
  }

  return (
    <div className="space-y-6">
      {enquiries.map((enquiry) => {
        const {
          _id: id,
          inspectionLocation,
          urgencyLevel,
          inspectionBudget,
          commodityCategory,
          subCommodity,
          currency,
        } = enquiry;

        const bidPlaced = placedBids[id] || enquiry.hasPlacedBid;
        const symbol = getCurrencySymbol(currency || "INR");

        return (
          <div
            key={id}
            className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-medium text-gray-500">Commodity:</span> <span className="text-black">{commodityCategory}</span></p>
              <p><span className="font-medium text-gray-500">SubCommodity:</span> <span className="text-black">{subCommodity}</span></p>
              <p><span className="font-medium text-gray-500">Location:</span> <span className="text-black">{inspectionLocation}</span></p>
              <p><span className="font-medium text-gray-500">Urgency:</span> <span className={`font-semibold ${urgencyLevel === "High" ? "text-red-500" : "text-yellow-500"}`}>{urgencyLevel}</span></p>
              <p><span className="font-medium text-gray-500">Budget:</span> <span className="text-green-600 font-semibold">{symbol}{inspectionBudget}/-</span></p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col items-end gap-2 w-full md:w-auto">
              {bidPlaced ? (
                <div className="text-green-600 font-semibold text-2xl">✅ Bid Placed</div>
              ) : (
                <>
                  <input
                    type="number"
                    value={bidAmounts[id] || ""}
                    onChange={(e) => handleAmountChange(id, e.target.value)}
                    placeholder={`${symbol} Enter bid amount`}
                    className="border border-gray-300 px-3 py-2 rounded-md w-full md:w-48 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    onClick={() => handleBid(id)}
                    className="bg-black  hover:bg-gray-900 text-white px-4 py-2 rounded-md text-2xl font-medium transition-all duration-200"
                  >
                    Place Bid
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BidCard;
