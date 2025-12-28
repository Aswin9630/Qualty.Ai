import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";

export default function InspectorEnquiryDetailPage() {
  const { id } = useParams();
  const [bid, setBid] = useState(null);
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspector/history`, {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          const matchedBid = data.bids.find((b) => b.enquiry?._id === id);

          if (matchedBid) {
            setBid(matchedBid);
            setEnquiry(matchedBid.enquiry);
          } else {
            toast.error("No matching bid found.");
          }
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load details");
      }
    };
    fetchDetails();
  }, [id]);

  if (!enquiry || !bid) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="max-w-4xl mx-auto border border-black rounded-md p-8">
        <h1 className="text-2xl font-bold mb-6">Bid Details</h1>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 mb-6">
          <p><strong>Commodity:</strong> {enquiry.commodity}</p>
          <p><strong>Subcategory:</strong> {enquiry.subcategory}</p>
          <p><strong>Location:</strong> {enquiry.location}</p>
          <p><strong>Volume:</strong> {enquiry.volume} {enquiry.unit}</p>
          <p><strong>Urgency:</strong> {enquiry.urgency}</p>
          <p><strong>Inspection Date:</strong> {new Date(enquiry.dateFrom).toLocaleDateString()} → {new Date(enquiry.dateTo).toLocaleDateString()}</p>
          <p><strong>Services:</strong> {enquiry.services?.join(", ") || "None"}</p>
          <p><strong>Certifications:</strong> {enquiry.certifications?.join(", ") || "None"}</p>
          {enquiry.otherRequirements && <p><strong>Requirements:</strong> {enquiry.otherRequirements}</p>}
        </div>

        <div className="border-t border-gray-300 pt-4 text-sm text-gray-800">
          <p><strong>Bid Amount:</strong> {bid?.enquiry?.currency==="INR"?"₹":"$"}{bid.amount}</p>
          <p><strong>Customer Amount:</strong> {bid?.enquiry.currency==="INR"?"₹":"$"}{bid?.enquiry?.inspectionBudget-bid?.enquiry?.platformFee}</p>
          <p><strong>Status:</strong> {bid.status}</p>
          <p><strong>Submitted On:</strong> {new Date(bid.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
