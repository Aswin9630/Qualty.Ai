// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../../utils/constants";
// import { toast } from "react-toastify";

// export default function CustomerEnquiryDetailPage() {
//   const { id } = useParams();
//   const [enquiry, setEnquiry] = useState(null);
//   const [bid, setBid] = useState(null);
//   const [payment, setPayment] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/customer/raiseEnquiry/${id}/details`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (data.success) {
//           setEnquiry(data.enquiry);
//           setBid(data.bid);
//           setPayment(data.payment);
//         } else {
//           toast.error(data.message);
//         }
//       } catch (err) {
//         toast.error("Failed to load details");
//       }
//     };
//     fetchDetails();
//   }, [id]); 

//   if (!enquiry && !bid && !payment) {
//     return (
//       <div className="min-h-screen bg-white px-6 py-10 text-black flex items-center justify-center">
//         <div className="max-w-md text-center border border-gray-300 rounded-lg p-6 shadow-sm">
//           <h2 className="text-xl font-semibold mb-2">No Inspection Data Found</h2>
//           <p className="text-sm text-gray-600 mb-6">
//             It looks like this inspection hasn’t been initiated or completed yet.
//           </p>
//           <button
//             onClick={() => window.location.href = "/customer/raiseEnquiry"}
//             className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
//           >
//             Raise New Enquiry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   let invoiceDate = "";
//   let dueDate = "";
//   if (payment?.updatedAt) {
//     invoiceDate = new Date(payment.updatedAt).toLocaleDateString();
//     dueDate = new Date(new Date(payment.updatedAt).getTime() + 7 * 86400000).toLocaleDateString();
//   }

//   return (
//     <div className="min-h-screen bg-white px-6 py-10 text-black">
//       <div className="max-w-4xl mx-auto border border-black rounded-md p-8">
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold tracking-wide">Qualty.ai</h1>
//             <p className="text-sm text-gray-700 mt-1">Inspection Services Summary</p>
//           </div>
//           <div className="text-sm text-gray-800 text-right">
//             <p><strong>Date Issued:</strong> {invoiceDate || "—"}</p>
//             <p><strong>Due Date:</strong> {dueDate || "—"}</p>
//             <p><strong>Reference ID:</strong> {payment?._id || "—"}</p>
//           </div>
//         </div>

//         {enquiry && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Customer Information</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Customer ID:</strong> {enquiry.customer}</p>
//               <p><strong>Location:</strong> {enquiry.location}</p>
//               <p><strong>Country:</strong> {enquiry.country}</p>
//             </div>
//           </div>
//         )}

//         {enquiry && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspection Details</h2>
//             <div className="text-sm text-gray-800 grid grid-cols-2 gap-4">
//               <p><strong>Commodity:</strong> {enquiry.commodity}</p>
//               <p><strong>Category:</strong> {enquiry.category}</p>
//               <p><strong>Volume:</strong> {enquiry.volume} {enquiry.unit}</p>
//               <p><strong>Inspection Type:</strong> {enquiry.physicalInspection ? "Physical" : ""} {enquiry.chemicalInspection ? "Chemical" : ""}</p>
//               <p><strong>Services:</strong> {enquiry.services?.join(", ")}</p>
//               <p><strong>Certifications:</strong> {enquiry.certifications?.join(", ")}</p>
//               <p><strong>Inspection Window:</strong> {new Date(enquiry.dateFrom).toLocaleDateString()} to {new Date(enquiry.dateTo).toLocaleDateString()}</p>
//             </div>
//           </div>
//         )}

//         {bid && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspector</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Name:</strong> {bid.inspector.name}</p>
//               <p><strong>Bid Amount:</strong> ₹{bid.customerViewAmount}</p>
//             </div>
//           </div>
//         )}

//         {payment && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Payment Summary</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Payment Mode:</strong> Razorpay</p>
//               <p><strong>Order ID:</strong> {payment.razorpayOrderId}</p>
//               <p><strong>Payment ID:</strong> {payment.razorpayPaymentId}</p>
//               <p><strong>Amount Paid:</strong> ₹{payment.amount}</p>
//             </div>
//           </div>
//         )}

//         {bid && payment && (
//           <div className="border-t border-black pt-4 text-right text-sm text-gray-900">
//             <p><strong>Total Amount:</strong> ₹{bid.customerViewAmount}</p>
//             <p><strong>Amount Paid:</strong> ₹{payment.amount}</p>
//             <p><strong>Balance Due:</strong> ₹{Math.max(0, bid.customerViewAmount - payment.amount)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../../utils/constants";
// import { toast } from "react-toastify";

// export default function CustomerEnquiryDetailPage() {
//   const { id } = useParams();
//   const [enquiry, setEnquiry] = useState(null);
//   const [bid, setBid] = useState(null);
//   const [payment, setPayment] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Helpers
//   const getCurrencySymbol = (c) => (c === "USD" ? "$" : "₹");
//   const formatDate = (d) => {
//     if (!d) return "—";
//     try {
//       return new Date(d).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       });
//     } catch {
//       return "—";
//     }
//   };
//   const formatDateTime = (d) => {
//     if (!d) return "—";
//     try {
//       return new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
//     } catch {
//       return "—";
//     }
//   };
//   const formatAmount = (n) => {
//     const val = Number(n || 0);
//     return val.toLocaleString("en-IN");
//   };

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/customer/raiseEnquiry/${id}/details`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (data.success) {
//           setEnquiry(data.enquiry || null);
//           setBid(data.bid || null);
//           setPayment(data.payment || null);
//         } else {
//           toast.error(data.message || "Failed to load details");
//         }
//       } catch (err) {
//         toast.error("Failed to load details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [id]);

//   // Derive currency and amounts safely
//   const currency =
//     payment?.currency ||
//     bid?.currency ||
//     enquiry?.currency ||
//     "INR";
//   const symbol = getCurrencySymbol(currency);

//   const bidAmount = Number(bid?.customerViewAmount || 0);
//   const paidAmount = Number(payment?.amount || 0);
//   const balanceAmount = Math.max(0, bidAmount - paidAmount);

//   // Dates (with solid fallbacks)
//   const invoiceDate =
//     payment?.updatedAt
//       ? formatDateTime(payment.updatedAt)
//       : enquiry?.updatedAt
//       ? formatDateTime(enquiry.updatedAt)
//       : "—";

//   const dueDate =
//     payment?.updatedAt
//       ? formatDateTime(new Date(new Date(payment.updatedAt).getTime() + 7 * 86400000))
//       : "—";

//   const referenceId = payment?._id || enquiry?._id || "—";

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white px-6 py-10 text-black flex items-center justify-center">
//         <div className="max-w-md text-center border border-gray-300 rounded-lg p-6 shadow-sm">
//           <h2 className="text-xl font-semibold mb-2">Loading…</h2>
//           <p className="text-sm text-gray-600">Fetching inspection details.</p>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry && !bid && !payment) {
//     return (
//       <div className="min-h-screen bg-white px-6 py-10 text-black flex items-center justify-center">
//         <div className="max-w-md text-center border border-gray-300 rounded-lg p-6 shadow-sm">
//           <h2 className="text-xl font-semibold mb-2">No Inspection Data Found</h2>
//           <p className="text-sm text-gray-600 mb-6">
//             It looks like this inspection hasn’t been initiated or completed yet.
//           </p>
//           <button
//             onClick={() => (window.location.href = "/customer/raiseEnquiry")}
//             className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
//           >
//             Raise New Enquiry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white px-6 py-10 text-black">
//       <div className="max-w-4xl mx-auto border border-black rounded-md p-8">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold tracking-wide">Qualty.ai</h1>
//             <p className="text-sm text-gray-700 mt-1">Inspection Services Summary</p>
//           </div>
//           <div className="text-sm text-gray-800 text-right">
//             <p><strong>Date Issued:</strong> {invoiceDate}</p>
//             <p><strong>Due Date:</strong> {dueDate}</p>
//             <p><strong>Reference ID:</strong> {referenceId}</p>
//           </div>
//         </div>

//         {/* Customer Information */}
//         {enquiry && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Customer Information</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Customer ID:</strong> {enquiry.customer || "—"}</p>
//               <p><strong>Location:</strong> {enquiry.location || "—"}</p>
//               <p><strong>Country:</strong> {enquiry.country || "—"}</p>
//             </div>
//           </div>
//         )}

//         {/* Inspection Details */}
//         {enquiry && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspection Details</h2>
//             <div className="text-sm text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <p><strong>Commodity:</strong> {enquiry.commodity || "—"}</p>
//               <p><strong>Category:</strong> {enquiry.category || "—"}</p>
//               <p><strong>Volume:</strong> {enquiry.volume || "—"} {enquiry.unit || ""}</p>
//               <p><strong>Inspection Type:</strong> {(enquiry.physicalInspection ? "Physical" : "")} {(enquiry.chemicalInspection ? "Chemical" : "")}</p>
//               <p><strong>Services:</strong> {Array.isArray(enquiry.services) && enquiry.services.length ? enquiry.services.join(", ") : "—"}</p>
//               <p><strong>Certifications:</strong> {Array.isArray(enquiry.certifications) && enquiry.certifications.length ? enquiry.certifications.join(", ") : null}</p>
//               <p><strong>Inspection Window:</strong> {formatDate(enquiry.dateFrom)} to {formatDate(enquiry.dateTo)}</p>
//             </div>
//           </div>
//         )}

//         {/* Inspector */}
//         {bid && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspector</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Name:</strong> {bid?.inspector?.name || "—"}</p>
//               <p><strong>Bid Amount:</strong> {symbol}{formatAmount(bidAmount)}</p>
//             </div>
//           </div>
//         )}

//         {/* Payment Summary */}
//         {payment && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Payment Summary</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Payment Mode:</strong> Razorpay</p>
//               <p><strong>Order ID:</strong> {payment.razorpayOrderId || "—"}</p>
//               <p><strong>Payment ID:</strong> {payment.razorpayPaymentId || "—"}</p>
//               <p><strong>Amount Paid:</strong> {symbol}{formatAmount(paidAmount)}</p>
//               <p><strong>Paid At:</strong> {formatDateTime(payment.paidAt || payment.updatedAt)}</p>
//             </div>
//           </div>
//         )}

//         {/* Totals */}
//         {(bid || payment) && (
//           <div className="border-t border-black pt-4 text-right text-sm text-gray-900">
//             <p><strong>Total Amount:</strong> {symbol}{formatAmount(bidAmount)}</p>
//             <p><strong>Amount Paid:</strong> {symbol}{formatAmount(paidAmount)}</p>
//             <p><strong>Balance Due:</strong> {symbol}{formatAmount(balanceAmount)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { BASE_URL } from "../../../utils/constants";
// import { toast } from "react-toastify";

// export default function CustomerEnquiryDetailPage() {
//   const { id } = useParams();
//   const [enquiry, setEnquiry] = useState(null);
//   const [bid, setBid] = useState(null);
//   const [payment, setPayment] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getCurrencySymbol = (c) => (c === "USD" ? "$" : "₹");
//   const formatDate = (d) => {
//     if (!d) return "—";
//     try {
//       return new Date(d).toLocaleDateString("en-IN", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       });
//     } catch {
//       return "—";
//     }
//   };
//   const formatDateTime = (d) => {
//     if (!d) return "—";
//     try {
//       return new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
//     } catch {
//       return "—";
//     }
//   };
//   const formatAmount = (n) => Number(n || 0).toLocaleString("en-IN");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/customer/raiseEnquiry/${id}/details`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (data.success) {
//           setEnquiry(data.enquiry || null);
//           setBid(data.bid || null);
//           setPayment(data.payment || null);
//         } else {
//           toast.error(data.message || "Failed to load details");
//         }
//       } catch (err) {
//         toast.error("Failed to load details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetails();
//   }, [id]);

//   const currency =
//     payment?.currency ||
//     bid?.currency ||
//     enquiry?.currency ||
//     "INR";
//   const symbol = getCurrencySymbol(currency);

//   const enquiryBudget = Number(enquiry?.inspectionBudget || 0);
//   const bidAmount = Number(bid?.customerViewAmount || 0) || enquiryBudget; 
//   const paidAmount = Number(payment?.amount || 0);
//   const balanceAmount = Math.max(0, bidAmount - paidAmount);

//   const invoiceDate =
//     payment?.updatedAt
//       ? formatDateTime(payment.updatedAt)
//       : enquiry?.updatedAt
//       ? formatDateTime(enquiry.updatedAt)
//       : "—";

//   const dueDate =
//     payment?.updatedAt
//       ? formatDateTime(new Date(new Date(payment.updatedAt).getTime() + 7 * 86400000))
//       : "—";

//   const referenceId = payment?._id || enquiry?._id || "—";

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white px-6 py-10 text-black flex items-center justify-center">
//         <div className="max-w-md text-center border border-gray-300 rounded-lg p-6 shadow-sm">
//           <h2 className="text-xl font-semibold mb-2">Loading…</h2>
//           <p className="text-sm text-gray-600">Fetching inspection details.</p>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry && !bid && !payment) {
//     return (
//       <div className="min-h-screen bg-white px-6 py-10 text-black flex items-center justify-center">
//         <div className="max-w-md text-center border border-gray-300 rounded-lg p-6 shadow-sm">
//           <h2 className="text-xl font-semibold mb-2">No Inspection Data Found</h2>
//           <p className="text-sm text-gray-600 mb-6">
//             It looks like this inspection hasn’t been initiated or completed yet.
//           </p>
//           <button
//             onClick={() => (window.location.href = "/customer/raiseEnquiry")}
//             className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
//           >
//             Raise New Enquiry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white px-6 py-10 text-black">
//       <div className="max-w-4xl mx-auto border border-black rounded-md p-8">
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-3xl font-bold tracking-wide">Qualty.ai</h1>
//             <p className="text-sm text-gray-700 mt-1">Inspection Services Summary</p>
//           </div>
//           <div className="text-sm text-gray-800 text-right">
//             <p><strong>Date Issued:</strong> {invoiceDate}</p>
//             <p><strong>Reference ID:</strong> {referenceId}</p>
//           </div>
//         </div>

//         {enquiry && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Customer Information</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Customer ID:</strong> {enquiry.customer || "—"}</p>
//               <p><strong>Location:</strong> {enquiry.location || "—"}</p>
//               <p><strong>Country:</strong> {enquiry.country || "—"}</p>
//             </div>
//           </div>
//         )}

//         {enquiry && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspection Details</h2>
//             <div className="text-sm text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <p><strong>Commodity:</strong> {enquiry.commodity || "—"}</p>
//               <p><strong>Category:</strong> {enquiry.category || "—"}</p>
//               <p><strong>Volume:</strong> {enquiry.volume || "—"} {enquiry.unit || ""}</p>
//               <p><strong>Inspection Type:</strong> {(enquiry.physicalInspection ? "Physical" : "")} {(enquiry.chemicalInspection ? "Chemical" : "")}</p>
//               <p><strong>Services:</strong> {Array.isArray(enquiry.services) && enquiry.services.length ? enquiry.services.join(", ") : "—"}</p>
//               <p><strong>Certifications:</strong> {Array.isArray(enquiry.certifications) && enquiry.certifications.length ? enquiry.certifications.join(", ") : null}</p>
//               <p><strong>Inspection Window:</strong> {formatDate(enquiry.dateFrom)} to {formatDate(enquiry.dateTo)}</p>
//               <p><strong>Inspection Budget:</strong> {symbol}{formatAmount(enquiryBudget)}</p>
//              {enquiry.otherRequirements && <p><strong>Requirements:</strong> {enquiry.otherRequirements || "—"}</p>}
//             </div>
//           </div>
//         )}

//         {bid && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Inspector</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Name:</strong> {bid?.inspector?.name || "—"}</p>
//               <p><strong>Bid Amount:</strong> {symbol}{formatAmount(bidAmount)}</p>
//             </div>
//           </div>
//         )}

//         {payment && (
//           <div className="mb-6">
//             <h2 className="text-base font-semibold mb-2 border-b border-black pb-1">Payment Summary</h2>
//             <div className="text-sm text-gray-800 space-y-1">
//               <p><strong>Payment Mode:</strong> Razorpay</p>
//               <p><strong>Order ID:</strong> {payment.razorpayOrderId || "—"}</p>
//               <p><strong>Payment ID:</strong> {payment.razorpayPaymentId || "—"}</p>
//               <p><strong>Amount Paid:</strong> {symbol}{formatAmount(paidAmount)}</p>
//               <p><strong>Paid At:</strong> {formatDateTime(payment.paidAt || payment.updatedAt)}</p>
//             </div>
//           </div>
//         )}

//         {(bid || payment || enquiryBudget) && (
//           <div className="border-t border-black pt-4 text-right text-sm text-gray-900">
//             <p><strong>Total Amount:</strong> {symbol}{formatAmount(bidAmount)}</p>
//             <p><strong>Amount Paid:</strong> {symbol}{formatAmount(paidAmount)}</p>
//             <p><strong>Balance Due:</strong> {symbol}{formatAmount(balanceAmount)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";
import { FileText, MapPin, User, Package, Calendar, CreditCard, Hash, Building2, ClipboardList, BadgeCheck, AlertCircle, Loader2,Wallet } from "lucide-react";

export default function CustomerEnquiryDetailPage() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [bid, setBid] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrencySymbol = (c) => (c === "USD" ? "$" : "₹");
  const formatDate = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    } catch { return "—"; }
  };
  const formatDateTime = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    } catch { return "—"; }
  };
  const formatAmount = (n) => Number(n || 0).toLocaleString("en-IN");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/customer/raiseEnquiry/${id}/details`, { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          setEnquiry(data.enquiry || null);
          setBid(data.bid || null);
          setPayment(data.payment || null);
        } else {
          toast.error(data.message || "Failed to load details");
        }
      } catch (err) {
        toast.error("Failed to load details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const currency = payment?.currency || bid?.currency || enquiry?.currency || "INR";
  const symbol = getCurrencySymbol(currency);
  const enquiryBudget = Number(enquiry?.inspectionBudget || 0);
  const bidAmount = Number(bid?.customerViewAmount || 0) || enquiryBudget;
  const paidAmount = Number(payment?.amount || 0);
  const balanceAmount = Math.max(0, bidAmount - paidAmount);

  const invoiceDate = payment?.updatedAt
    ? formatDateTime(payment.updatedAt)
    : enquiry?.updatedAt ? formatDateTime(enquiry.updatedAt) : "—";

  const dueDate = payment?.updatedAt
    ? formatDateTime(new Date(new Date(payment.updatedAt).getTime() + 7 * 86400000))
    : "—";

  const referenceId = payment?._id || enquiry?._id || "—";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">Loading inspection details…</p>
          <p className="text-xs text-gray-400 mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!enquiry && !bid && !payment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-gray-400" />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-2">No Inspection Data Found</h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            It looks like this inspection hasn't been initiated or completed yet.
          </p>
          <button
            onClick={() => (window.location.href = "/customer/raiseEnquiry")}
            className="w-full px-6 py-3 bg-gray-950 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 cursor-pointer"
          >
            Raise New Enquiry
          </button>
        </div>
      </div>
    );
  }

  const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
      <div className="w-7 h-7 rounded-lg bg-gray-950 flex items-center justify-center">
        {icon}
      </div>
      <h2 className="text-sm font-bold text-gray-900 tracking-wide uppercase">{title}</h2>
    </div>
  );

  const Field = ({ label, value }) => (
    <div>
      <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Summary</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inspection Report</h1>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 text-right">
            <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">
              <Hash size={11} /> Reference
            </div>
            <p className="text-xs font-bold text-gray-900 font-mono break-all max-w-[180px]">{referenceId}</p>
            <p className="text-[10px] text-gray-400 mt-1">{invoiceDate}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Qualty.ai</h2>
              <p className="text-xs text-gray-400">Inspection Services Summary</p>
            </div>
          </div>
        </div>

        {enquiry && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SectionHeader icon={<User size={14} className="text-white" />} title="Customer Information" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Customer ID" value={enquiry.customer} />
              <Field label="Location" value={enquiry.location} />
              <Field label="Country" value={enquiry.country} />
            </div>
          </div>
        )}

        {enquiry && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SectionHeader icon={<ClipboardList size={14} className="text-white" />} title="Inspection Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Commodity" value={enquiry.commodity} />
              <Field label="Category" value={enquiry.category} />
              <Field label="Volume" value={enquiry.volume ? `${enquiry.volume} ${enquiry.unit || ""}` : "—"} />
              <Field label="Inspection Type" value={[enquiry.physicalInspection && "Physical", enquiry.chemicalInspection && "Chemical"].filter(Boolean).join(", ") || "—"} />
              <Field label="Services" value={Array.isArray(enquiry.services) && enquiry.services.length ? enquiry.services.join(", ") : "—"} />
              <Field label="Certifications" value={Array.isArray(enquiry.certifications) && enquiry.certifications.length ? enquiry.certifications.join(", ") : "—"} />
              <Field label="Inspection Window" value={`${formatDate(enquiry.dateFrom)} → ${formatDate(enquiry.dateTo)}`} />
              <Field label="Inspection Budget" value={`${symbol}${formatAmount(enquiryBudget)}`} />
              {enquiry.otherRequirements && <div className="sm:col-span-2"><Field label="Requirements" value={enquiry.otherRequirements} /></div>}
            </div>
          </div>
        )}

        {bid && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SectionHeader icon={<BadgeCheck size={14} className="text-white" />} title="Inspector" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Inspector Name" value={bid?.inspector?.name} />
              <Field label="Bid Amount" value={`${symbol}${formatAmount(bidAmount)}`} />
            </div>
          </div>
        )}

        {payment && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SectionHeader icon={<CreditCard size={14} className="text-white" />} title="Payment Summary" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Payment Mode" value="Razorpay" />
              <Field label="Order ID" value={payment.razorpayOrderId} />
              <Field label="Payment ID" value={payment.razorpayPaymentId} />
              <Field label="Amount Paid" value={`${symbol}${formatAmount(paidAmount)}`} />
              <Field label="Paid At" value={formatDateTime(payment.paidAt || payment.updatedAt)} />
            </div>
          </div>
        )}

        {(bid || payment || enquiryBudget > 0) && (
          <div className="bg-gray-950 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <Wallet size={15} className="text-white/50" />
              <h2 className="text-xs font-bold text-white/50 tracking-widest uppercase">Payment Breakdown</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Total Amount</span>
                <span className="text-sm font-bold text-white">{symbol}{formatAmount(bidAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Amount Paid</span>
                <span className="text-sm font-bold text-emerald-400">{symbol}{formatAmount(paidAmount)}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Balance Due</span>
                <span className="text-lg font-bold text-white">{symbol}{formatAmount(balanceAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}