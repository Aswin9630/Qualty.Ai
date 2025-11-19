import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchCustomerPayments from "../../../hooks/useFetchCustomerPayments";

export default function PaymentDetailPage() {
  const { enquiryId } = useParams();
  const navigate = useNavigate()
  const payments = useSelector((state) => state.payments.groupedByEnquiry[enquiryId] || []);
  const enquiry = payments[0]?.enquiry;
  useFetchCustomerPayments(enquiryId, payments.length === 0);
  const paidAmount = payments
  .filter((p) => p.status === "paid")
  .reduce((sum, p) => sum + (p.amount || 0), 0);

const totalBudget = enquiry?.inspectionBudget || payments[0]?.bid?.customerViewAmount || 0;
const balanceAmount = Math.max(0, totalBudget - paidAmount);
const currency = enquiry?.currency || "INR";
  const currencySymbol = currency === "INR" ? "₹" : "$";
  

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4">Payments for Enquiry ID: {enquiryId}</h1>

        {enquiry && (
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Enquiry Details</h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Commodity:</strong> {enquiry.commodity}</p>
              <p><strong>Inspection Location:</strong> {enquiry.location}</p>
              <p><strong>Quantity:</strong> {enquiry.volume} {enquiry.unit}</p>
               <p>
                <strong>Total Budget:</strong> {currencySymbol}
                {totalBudget.toLocaleString()}
              </p>
            </div>
     
          </div>
        )}

        {payments.length === 0 ? (
          <p className="text-gray-500">No payments found for this enquiry.</p>
        ) : (
          payments.map((p) => (
            <div key={p._id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{currencySymbol}{p.amount}/-</h3>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {p.status.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Payment ID:</strong> {p._id}</p>
                <p><strong>Order ID:</strong> {p.razorpayOrderId}</p>
                <p><strong>Transaction Date:</strong> {new Date(p.updatedAt).toLocaleString()}</p>
              </div>
            </div>
            
          ))
        )}
               {balanceAmount > 0 && (
      <button
  onClick={() =>
    navigate(`/customer/inspection/${enquiry._id}`, {
      state: { inspectionBudget: totalBudget },
    })
  }  
  className="mt-4 px-6 py-2 bg-black hover:bg-gray-700 cursor-pointer text-white text-sm font-medium rounded-lg transition-all"
>
  Pay Balance {currencySymbol}{balanceAmount}
</button>

    )}
      </div>
    </div>
  );
}

