import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMPANY_API } from "../../../utils/constants";
import Shimmer from "../../../components/ShimmerUI";

export default function CompanyBidDetail() {
  const { bidId } = useParams();
  const [bid, setBid] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${COMPANY_API}/history`, { credentials: "include" });
        const data = await res.json();
        if (res.ok && Array.isArray(data.bids)) {
          const matchedBid = data.bids.find((b) => b._id === bidId);
          if (matchedBid) setBid(matchedBid);
          else console.warn("Bid not found for ID:", bidId);
        } else {
          console.error(data.message || "Failed to load bid details");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    })();
  }, [bidId]);

  if (!bid) {
    return (
      <div className="min-h-screen bg-white px-6 py-10">
        <Shimmer className="h-8 w-1/3 rounded mb-6" />
        <Shimmer className="h-96 rounded" />
      </div>
    );
  }

  const { enquiry } = bid;

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Bid Details</h1>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Commodity:</strong> {enquiry?.commodity || enquiry?.category}</p>
          <p><strong>Subcategory:</strong> {enquiry?.subcategory || "—"}</p>
          <p><strong>Location:</strong> {enquiry?.location || "—"}</p>
          <p><strong>Volume:</strong> {enquiry?.volume || "—"} {enquiry?.unit || ""}</p>
          <p><strong>Urgency:</strong> {enquiry?.urgency || "—"}</p>
          <p><strong>Inspection Date:</strong> {new Date(enquiry?.dateFrom).toLocaleDateString()} → {new Date(enquiry?.dateTo).toLocaleDateString()}</p>
          <p><strong>Services:</strong> {(enquiry?.services || []).join(", ") || "—"}</p>
          <p><strong>Certifications:</strong> {(enquiry?.certifications || []).join(", ") || "—"}</p>
          <p><strong>Selection Summary:</strong> {enquiry?.selectionSummary || "—"}</p>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Bid Amount:</strong> {enquiry.currency==="INR"?"₹":"$"}{bid.amount}</p>
          <p><strong>Customer Amount:</strong> {enquiry.currency==="INR"?"₹":"$"}{enquiry.inspectionBudget-enquiry.platformFee}</p>
          <p><strong>Status:</strong> {bid.status}</p>
          <p><strong>Submitted On:</strong> {new Date(bid.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
