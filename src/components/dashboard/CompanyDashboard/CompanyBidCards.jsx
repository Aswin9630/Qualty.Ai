import React, { useState } from "react";
import { COMPANY_API, getCurrencySymbol } from "../../../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { placeBidSuccess } from "../../../redux/slice/companySlice/companyBidSlice";

export default function CompanyBidCard({ enquiry }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFullRequirement, setShowFullRequirement] = useState(false);

  const truncateRequirement = (text, limit = 5) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};

  const {
    _id,
    commodity,
    category,
    subcategory,
    urgency,
    inspectionBudget,
    currency,
    location,
    volume,
    dateFrom,
    dateTo,
    contact,
    otherRequirements
  } = enquiry;

  const handleBid = async () => {
    const bidAmount = Number(amount);
    if (!bidAmount || bidAmount <= 0) return toast.error("Enter a valid bid amount");
    try {
      setLoading(true);
      const res = await fetch(`${COMPANY_API}/bid/${_id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bidAmount }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        dispatch(placeBidSuccess(data.bid));
        toast.success(data.message || "Bid placed successfully");
        setAmount("");
      } else {
        toast.error(data.message || "Failed to place bid");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="space-y-1 text-sm text-gray-700 mb-4">
        {contact?.name && <p><span className="font-medium text-gray-500">Customer:</span> <span className="text-black">{contact.name}</span></p>}
        <p><span className="font-medium text-gray-500">Commodity:</span> <span className="text-black">{commodity || category}</span></p>
        <p><span className="font-medium text-gray-500">Subcategory:</span> <span className="text-black">{subcategory || "—"}</span></p>
        <p><span className="font-medium text-gray-500">Location:</span> <span className="text-black">{location || "—"}</span></p>
{enquiry.otherRequirements && (
  <p>
    <span className="font-medium text-gray-500">Requirement:</span>{" "}
    <span className="text-black">
      {showFullRequirement
        ? otherRequirements
        : truncateRequirement(otherRequirements, 5)}
    </span>

    {otherRequirements.length > 5 && (
      <button
        onClick={() => setShowFullRequirement((prev) => !prev)}
        className="ml-2 text-blue-600 text-xs font-medium hover:underline cursor-pointer"
      >
        {showFullRequirement ? "Read less" : "Read more"}
      </button>
    )}
  </p>
)}

        <p><span className="font-medium text-gray-500">Urgency:</span> <span className={`font-semibold ${urgency === "High" ? "text-red-500" : "text-yellow-500"}`}>{urgency || "—"}</span></p>
        <p><span className="font-medium text-gray-500">Budget:</span> <span className="text-green-600 font-semibold">{currency==="INR"?"₹":"$"}{inspectionBudget}/-</span></p>
        <p><span className="font-medium text-gray-500">Volume:</span> <span className="text-black">{volume || "—"}</span></p>
        <p><span className="font-medium text-gray-500">Date:</span> <span className="text-black">{dateFrom ? new Date(dateFrom).toLocaleDateString() : "—"} → {dateTo ? new Date(dateTo).toLocaleDateString() : "—"}</span></p>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`${getCurrencySymbol(currency)} Enter bid`}
          className="border border-gray-300 px-3 py-2 rounded-md w-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handleBid}
          disabled={loading || enquiry.hasPlacedBid}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 cursor-pointer ${
            enquiry.hasPlacedBid
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          {enquiry.hasPlacedBid ? "Bid Placed" : loading ? "Placing…" : "Place Bid"}
        </button>
      </div>
    </div>
  );
}
