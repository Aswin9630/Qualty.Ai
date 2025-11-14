// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPayments } from "../../../redux/slice/paymentSlice";
// import { BASE_URL } from "../../../utils/constants";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function CustomerPaymentHistoryPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { groupedByEnquiry } = useSelector((state) => state.payments);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/customer/payments`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (data.success) {
//           dispatch(setPayments(data.payments));
//         } else {
//           toast.error(data.message);
//         }
//       } catch (err) {
//         toast.error("Failed to load payment history");
//       }
//     };
//     fetchPayments();
//   }, [dispatch]);

//   const enquiryIds = Object.keys(groupedByEnquiry);

//   return (
//     <div className="min-h-screen bg-white text-black px-6 py-10">
//       <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black mb-2">
//             Payment History
//           </h1>
//           <p className="text-sm text-gray-600">
//             Your completed transactions, grouped by inspection
//           </p>
//         </div>

//         {enquiryIds.length === 0 ? (
//           <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm animate-fade-in-slow">
//             <p className="text-lg font-semibold mb-2">No payments found</p>
//             <p className="text-sm">You haven’t completed any transactions yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {enquiryIds.map((id, index) => {

//               const payments = groupedByEnquiry[id];
//               const enquiry = payments[0]?.enquiry;
//               const date = new Date(payments[0]?.updatedAt).toLocaleString();
//                             const paidAmount = payments
//   .filter((p) => p.status === "paid")
//   .reduce((sum, p) => sum + (p.amount || 0), 0);

// const totalBudget = enquiry?.inspectionBudget || 0;
// const balanceAmount = Math.max(0, totalBudget - paidAmount);

//               return (
//                 <div
//                   key={id}
//                   className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="text-sm text-gray-700 space-y-2 mb-4">
//                     <p><strong>Commodity:</strong> {enquiry?.commodity} — {enquiry?.location}</p>
//                     <p><strong>Enquiry ID:</strong> {enquiry?._id}</p>
//                     <p><strong>Date:</strong> {date}</p>
//                     <p><strong className="text-green-600">Paid:</strong> ₹{paidAmount}</p>
// <p><strong className="text-red-600">Balance:</strong> ₹{balanceAmount}</p>

//                   </div>
//                   <button
//                     onClick={() => navigate(`/customer/payments/${id}`)}
//                     className="px-6 py-2 bg-black hover:bg-gray-900 text-white text-sm w-full font-medium rounded-lg cursor-pointer transition-all"
//                   >
//                     View Payments →
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
//         .animate-fade-in-slow {
//           animation: fadeIn 1.2s ease-out forwards;
//         }
//         .animate-slide-up {
//           opacity: 0;
//           transform: translateY(20px);
//           animation: slideUp 0.6s ease-out forwards;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         @keyframes slideUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPayments } from "../../../redux/slice/paymentSlice";
import { BASE_URL } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CustomerPaymentHistoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupedByEnquiry } = useSelector((state) => state.payments);

  // New state: whether user has quick service payments and a sample count
  const [hasQuickPayments, setHasQuickPayments] = useState(false);
  const [quickPaymentsCount, setQuickPaymentsCount] = useState(0);
  const [quickCheckLoading, setQuickCheckLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/payments`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setPayments(data.payments));
        } else {
          toast.error(data.message || "Unable to load payments");
        }
      } catch (err) {
        toast.error("Failed to load payment history");
      }
    };
    fetchPayments();
  }, [dispatch]);

  useEffect(() => {
    let cancelled = false;
    const checkQuickPayments = async () => {
      setQuickCheckLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/payments/quickService`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!cancelled) {
          if (res.ok && data && Array.isArray(data.items)) {
            setHasQuickPayments((data.total || data.items.length) > 0);
            setQuickPaymentsCount(Number(data.total || data.items.length || 0));
          } else {
            // if endpoint returns 4xx/5xx, keep card hidden and log
            setHasQuickPayments(false);
          }
        }
      } catch (err) {
        console.error("quick-service payments check failed", err);
        if (!cancelled) setHasQuickPayments(false);
      } finally {
        if (!cancelled) setQuickCheckLoading(false);
      }
    };

    checkQuickPayments();
    return () => {
      cancelled = true;
    };
  }, []);

  const enquiryIds = Object.keys(groupedByEnquiry);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black mb-2">
            Payment History
          </h1>
          <p className="text-sm text-gray-600">
            Your completed transactions, grouped by inspection
          </p>
        </div>

        {/* Top action cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickCheckLoading ? (
            <div className="col-span-1 bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm animate-pulse" />
          ) : hasQuickPayments ? (
            <div
              role="button"
              onClick={() => navigate("/payments/quick-service")}
              className="cursor-pointer rounded-xl border p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              aria-label="View Quick Service payments"
            >
              <div>
                <div className="text-sm text-gray-500">Quick Service</div>
                <div className="text-xl font-semibold mt-2">Quick Service Payments</div>
                <p className="mt-2 text-xs text-gray-500">You have {quickPaymentsCount} quick-service payment{quickPaymentsCount !== 1 ? "s" : ""}. View invoices and details.</p>
              </div>
              <div className="mt-4 text-sm text-gray-700 font-medium">View payments →</div>
            </div>
          ) : (
            <div className="col-span-1 bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex items-center justify-center text-sm text-gray-400">
              No Quick Service payments
            </div>
          )}

          <div className="rounded-xl border p-5 bg-white shadow-sm flex items-center justify-center text-sm text-gray-500">Other Summary</div>
          <div className="rounded-xl border p-5 bg-white shadow-sm flex items-center justify-center text-sm text-gray-500">Actions</div>
        </div>

        {enquiryIds.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center text-gray-500 shadow-sm animate-fade-in-slow">
            <p className="text-lg font-semibold mb-2">No payments found</p>
            <p className="text-sm">You haven’t completed any transactions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enquiryIds.map((id, index) => {
              const payments = groupedByEnquiry[id];
              const enquiry = payments[0]?.enquiry;
              const date = new Date(payments[0]?.updatedAt).toLocaleString();
              const paidAmount = payments
                .filter((p) => p.status === "paid")
                .reduce((sum, p) => sum + (p.amount || 0), 0);

              const totalBudget = enquiry?.inspectionBudget || 0;
              const balanceAmount = Math.max(0, totalBudget - paidAmount);

              return (
                <div
                  key={id}
                  className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-sm text-gray-700 space-y-2 mb-4">
                    <p><strong>Commodity:</strong> {enquiry?.commodity} — {enquiry?.location}</p>
                    <p><strong>Enquiry ID:</strong> {enquiry?._id}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong className="text-green-600">Paid:</strong> ₹{paidAmount}</p>
                    <p><strong className="text-red-600">Balance:</strong> ₹{balanceAmount}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/customer/payments/${id}`)}
                    className="px-6 py-2 bg-black hover:bg-gray-900 text-white text-sm w-full font-medium rounded-lg cursor-pointer transition-all"
                  >
                    View Payments →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
