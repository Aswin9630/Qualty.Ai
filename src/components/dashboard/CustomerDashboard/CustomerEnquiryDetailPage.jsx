import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";

export default function CustomerEnquiryDetailPage() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [bid, setBid] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/raiseEnquiry/${id}/details`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setEnquiry(data.enquiry);
          setBid(data.bid);
          setPayment(data.payment);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load details");
      }
    };
    fetchDetails();
  }, [id]); 

  if (!enquiry && !bid && !payment) {
    return (
      <div className="min-h-screen bg-white px-6 py-10 text-black flex items-center justify-center">
        <div className="max-w-md text-center border border-gray-300 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">No Inspection Data Found</h2>
          <p className="text-sm text-gray-600 mb-6">
            It looks like this inspection hasn’t been initiated or completed yet.
          </p>
          <button
            onClick={() => window.location.href = "/customer/raiseEnquiry"}
            className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
          >
            Raise New Enquiry
          </button>
        </div>
      </div>
    );
  }

  // Safe date handling
  let invoiceDate = "";
  let dueDate = "";
  if (payment?.updatedAt) {
    invoiceDate = new Date(payment.updatedAt).toLocaleDateString();
    dueDate = new Date(new Date(payment.updatedAt).getTime() + 7 * 86400000).toLocaleDateString();
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="max-w-4xl mx-auto border border-black rounded-md p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">Qualty.ai</h1>
            <p className="text-sm text-gray-700 mt-1">Inspection Services Summary</p>
          </div>
          <div className="text-sm text-gray-800 text-right">
            <p><strong>Date Issued:</strong> {invoiceDate || "—"}</p>
            <p><strong>Due Date:</strong> {dueDate || "—"}</p>
            <p><strong>Reference ID:</strong> {payment?._id || "—"}</p>
          </div>
        </div>

        {enquiry && (
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Customer Information</h2>
            <div className="text-sm text-gray-800 space-y-1">
              <p><strong>Customer ID:</strong> {enquiry.customer}</p>
              <p><strong>Location:</strong> {enquiry.location}</p>
              <p><strong>Country:</strong> {enquiry.country}</p>
            </div>
          </div>
        )}

        {enquiry && (
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspection Details</h2>
            <div className="text-sm text-gray-800 grid grid-cols-2 gap-4">
              <p><strong>Commodity:</strong> {enquiry.commodity}</p>
              <p><strong>Category:</strong> {enquiry.category}</p>
              <p><strong>Volume:</strong> {enquiry.volume} {enquiry.unit}</p>
              <p><strong>Inspection Type:</strong> {enquiry.physicalInspection ? "Physical" : ""} {enquiry.chemicalInspection ? "Chemical" : ""}</p>
              <p><strong>Services:</strong> {enquiry.services?.join(", ")}</p>
              <p><strong>Certifications:</strong> {enquiry.certifications?.join(", ")}</p>
              <p><strong>Inspection Window:</strong> {new Date(enquiry.dateFrom).toLocaleDateString()} to {new Date(enquiry.dateTo).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {bid && (
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspector</h2>
            <div className="text-sm text-gray-800 space-y-1">
              <p><strong>Name:</strong> {bid.inspector.name}</p>
              <p><strong>Bid Amount:</strong> ₹{bid.customerViewAmount}</p>
            </div>
          </div>
        )}

        {payment && (
          <div className="mb-6">
            <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Payment Summary</h2>
            <div className="text-sm text-gray-800 space-y-1">
              <p><strong>Payment Mode:</strong> Razorpay</p>
              <p><strong>Order ID:</strong> {payment.razorpayOrderId}</p>
              <p><strong>Payment ID:</strong> {payment.razorpayPaymentId}</p>
              <p><strong>Amount Paid:</strong> ₹{payment.amount}</p>
            </div>
          </div>
        )}

        {bid && payment && (
          <div className="border-t border-black pt-4 text-right text-sm text-gray-900">
            <p><strong>Total Amount:</strong> ₹{bid.customerViewAmount}</p>
            <p><strong>Amount Paid:</strong> ₹{payment.amount}</p>
            <p><strong>Balance Due:</strong> ₹{Math.max(0, bid.customerViewAmount - payment.amount)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
