// import { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";
// import {
//   Clock, CheckCircle2, XCircle, CreditCard, MapPin, Calendar,
//   Package, Building2, Zap, Receipt, AlertCircle
// } from "lucide-react";
// import { BASE_URL } from "../../../../../utils/constants";

// const SERVICE_MAP = {
//   psi: "Pre-Shipment Inspection",
//   loading: "Loading Supervision",
//   stuffing: "Stuffing Supervision",
//   destination: "Destination Inspection"
// };

// const STATUS_CONFIG = {
//   pending: { label: "Pending Review", icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200" },
//   accepted: { label: "Accepted", icon: CheckCircle2, cls: "bg-green-50 text-green-700 border-green-200" },
//   rejected: { label: "Rejected", icon: XCircle, cls: "bg-red-50 text-red-700 border-red-200" }
// };

// const ShimmerCard = () => (
//   <div className="animate-pulse bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
//     <div className="flex gap-3">
//       <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
//       <div className="flex-1 space-y-2">
//         <div className="h-4 bg-gray-100 rounded w-1/2" />
//         <div className="h-3 bg-gray-100 rounded w-1/3" />
//       </div>
//       <div className="w-20 h-6 bg-gray-100 rounded-full" />
//     </div>
//     <div className="space-y-2">
//       <div className="h-3 bg-gray-100 rounded w-2/3" />
//       <div className="h-3 bg-gray-100 rounded w-1/2" />
//       <div className="h-3 bg-gray-100 rounded w-3/4" />
//     </div>
//     <div className="h-11 bg-gray-100 rounded-xl" />
//   </div>
// );

// const loadRazorpay = () =>
//   new Promise((resolve) => {
//     if (window.Razorpay) { resolve(true); return; }
//     const s = document.createElement("script");
//     s.src = "https://checkout.razorpay.com/v1/checkout.js";
//     s.onload = () => resolve(true);
//     s.onerror = () => resolve(false);
//     document.body.appendChild(s);
//   });

// export default function CustomerQuickInspection() {
//   const user = useSelector((s) => s.user.user);
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("active");
//   const [payingId, setPayingId] = useState(null);
//   const hasFetched = useRef(false);

//   const fetchRequests = async () => {
//     const controller = new AbortController();
//     try {
//       const res = await fetch(`${BASE_URL}/quickInspection/my-requests`, {
//         credentials: "include",
//         signal: controller.signal
//       });
//       if (!res.ok) throw new Error("Failed to load");
//       const data = await res.json();
//       if (data.success) setRequests(data.data);
//     } catch (err) {
//       if (err.name !== "AbortError") toast.error("Failed to load requests");
//     } finally {
//       setLoading(false);
//     }
//     return () => controller.abort();
//   };

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     fetchRequests();
//   }, []);

//   const activeRequests = requests.filter((r) => r.payment?.status !== "completed");
//   const completedRequests = requests.filter((r) => r.payment?.status === "completed");
//   const acceptedUnpaid = activeRequests.filter((r) => r.status === "accepted" && r.payment?.status !== "completed");
//   const displayed = activeTab === "active" ? activeRequests : completedRequests;

//   const handlePayment = async (request) => {
//     const loaded = await loadRazorpay();
//     if (!loaded) { toast.error("Payment gateway unavailable. Please try again."); return; }

//     setPayingId(request._id);
//     try {
//       const res = await fetch(`${BASE_URL}/quickInspection/payment/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ requestId: request._id })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         name: "Qualty.ai",
//         description: SERVICE_MAP[request.service] || request.service,
//         order_id: data.orderId,
//         handler: async (response) => {
//           try {
//             const verifyRes = await fetch(`${BASE_URL}/quickInspection/payment/verify`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               credentials: "include",
//               body: JSON.stringify({
//                 requestId: request._id,
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature
//               })
//             });
//             const verifyData = await verifyRes.json();
//             if (!verifyRes.ok) throw new Error(verifyData.message);
//             toast.success("🎉 Payment successful!");
//             hasFetched.current = false;
//             setLoading(true);
//             hasFetched.current = true;
//             await fetchRequests();
//           } catch (err) {
//             toast.error(err.message || "Payment verification failed");
//           } finally {
//             setPayingId(null);
//           }
//         },
//         prefill: { name: user?.name, email: user?.email },
//         theme: { color: "#000000" },
//         modal: {
//           ondismiss: () => setPayingId(null)
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", () => {
//         toast.error("Payment failed. Please try again.");
//         setPayingId(null);
//       });
//       rzp.open();
//     } catch (err) {
//       toast.error(err.message || "Failed to initiate payment");
//       setPayingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//         <div className="max-w-5xl mx-auto">
//           <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
//           <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8" />
//           <div className="grid md:grid-cols-2 gap-4">
//             {[1, 2, 3, 4].map((i) => <ShimmerCard key={i} />)}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-5xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Quick Inspections</h1>
//           <p className="text-gray-500 text-sm mt-1">Track and manage your inspection requests</p>
//         </div>

//         {acceptedUnpaid.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl"
//           >
//             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
//               <AlertCircle size={16} className="text-green-600" />
//             </div>
//             <div>
//               <p className="font-semibold text-green-800 text-sm">
//                 {acceptedUnpaid.length} request{acceptedUnpaid.length > 1 ? "s" : ""} accepted — payment pending
//               </p>
//               <p className="text-green-700 text-xs mt-0.5">
//                 Complete your payment to confirm the inspection booking.
//               </p>
//             </div>
//           </motion.div>
//         )}

//         <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 w-fit shadow-sm">
//           {[
//             { id: "active", label: "My Requests", count: activeRequests.length },
//             { id: "completed", label: "Completed", count: completedRequests.length }
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
//                 activeTab === tab.id ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {tab.label}
//               {tab.count > 0 && (
//                 <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
//                   activeTab === tab.id ? "bg-white text-black" : "bg-gray-200 text-gray-600"
//                 }`}>
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.18 }}
//           >
//             {displayed.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 text-center">
//                 {activeTab === "active" ? (
//                   <>
//                     <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Zap size={24} className="text-gray-400" />
//                     </div>
//                     <p className="font-semibold text-gray-700">No active requests</p>
//                     <p className="text-sm text-gray-400 mt-1">Browse the marketplace to request an inspection</p>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Receipt size={24} className="text-gray-400" />
//                     </div>
//                     <p className="font-semibold text-gray-700">No completed inspections</p>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="grid md:grid-cols-2 gap-4">
//                 {displayed.map((r, i) => {
//                   const statusCfg = STATUS_CONFIG[r.status] || STATUS_CONFIG.pending;
//                   const StatusIcon = statusCfg.icon;
//                   const isAcceptedUnpaid = r.status === "accepted" && r.payment?.status !== "completed";
//                   const isPaid = r.payment?.status === "completed";

//                   return (
//                     <motion.div
//                       key={r._id}
//                       initial={{ opacity: 0, y: 16 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05, duration: 0.25 }}
//                       className={`bg-white rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
//                         isAcceptedUnpaid ? "border-green-300 ring-1 ring-green-200" : "border-gray-200"
//                       }`}
//                     >
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
//                             <Building2 size={17} className="text-gray-600" />
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-900 text-sm leading-tight">{r.company?.companyName}</p>
//                             <p className="text-xs text-gray-400 mt-0.5">
//                               {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//                             </p>
//                           </div>
//                         </div>
//                         <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${statusCfg.cls}`}>
//                           <StatusIcon size={11} />
//                           {statusCfg.label}
//                         </span>
//                       </div>

//                       <div className="space-y-2 text-sm mb-4">
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <Zap size={13} className="text-gray-400 shrink-0" />
//                           <span>{SERVICE_MAP[r.service] || r.service}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <Package size={13} className="text-gray-400 shrink-0" />
//                           <span>Commodity: <span className="font-medium text-gray-800">{r.commodity}</span></span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <MapPin size={13} className="text-gray-400 shrink-0" />
//                           <span>{r.location?.region} – {r.location?.city}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-gray-600">
//                           <Calendar size={13} className="text-gray-400 shrink-0" />
//                           <span>{new Date(r.inspectionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
//                         </div>
//                         <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                           <span className="text-xs text-gray-400">Total Amount</span>
//                           <div className="text-right">
//                             <span className="font-bold text-gray-900">
//                               {r.pricing?.currency}{Number(r.pricing?.amount || 0).toLocaleString()}
//                             </span>
//                             {isPaid && (
//                               <p className="text-xs text-green-600 font-medium mt-0.5">Paid</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       {isAcceptedUnpaid && (
//                         <button
//                           onClick={() => handlePayment(r)}
//                           disabled={payingId === r._id}
//                           className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
//                         >
//                           <CreditCard size={15} />
//                           {payingId === r._id
//                             ? "Opening Payment..."
//                             : `Pay ${r.pricing?.currency}${Number(r.pricing?.amount || 0).toLocaleString()}`}
//                         </button>
//                       )}

//                       {isPaid && (
//                         <div className="flex items-center gap-2 py-2.5 px-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium">
//                           <CheckCircle2 size={14} />
//                           Payment completed ·{" "}
//                           {r.payment?.paidAt
//                             ? new Date(r.payment.paidAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
//                             : ""}
//                         </div>
//                       )}

//                       {r.status === "rejected" && (
//                         <div className="flex items-center gap-2 py-2.5 px-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
//                           <XCircle size={14} />
//                           Request declined by company
//                         </div>
//                       )}

//                       {r.status === "pending" && (
//                         <div className="flex items-center gap-2 py-2.5 px-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-700">
//                           <Clock size={14} />
//                           Waiting for company to respond
//                         </div>
//                       )}
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }







import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Clock, CheckCircle2, XCircle, CreditCard, MapPin, Calendar,
  Package, Building2, Zap, Receipt, AlertCircle, IndianRupee
} from "lucide-react";
import { BASE_URL } from "../../../../../utils/constants";

const SERVICE_MAP = {
  psi: "Pre-Shipment Inspection",
  loading: "Loading Supervision",
  stuffing: "Stuffing Supervision",
  destination: "Destination Inspection"
};

const STATUS_CONFIG = {
  pending: { label: "Pending Review", icon: Clock, cls: "bg-amber-50 text-amber-700 border-amber-200" },
  accepted: { label: "Accepted", icon: CheckCircle2, cls: "bg-green-50 text-green-700 border-green-200" },
  rejected: { label: "Rejected", icon: XCircle, cls: "bg-red-50 text-red-700 border-red-200" }
};

const GST_RATE = 0.18;

const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
    <div className="flex gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
      <div className="w-20 h-6 bg-gray-100 rounded-full" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-3 bg-gray-100 rounded w-3/4" />
    </div>
    <div className="h-11 bg-gray-100 rounded-xl" />
  </div>
);

export default function CustomerQuickInspection() {
  const user = useSelector((s) => s.user.user);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [payingId, setPayingId] = useState(null);
  const hasFetched = useRef(false);

  const fetchRequests = async () => {
    const controller = new AbortController();
    try {
      const res = await fetch(`${BASE_URL}/quickInspection/my-requests`, {
        credentials: "include",
        signal: controller.signal
      });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      if (data.success) setRequests(data.data);
    } catch (err) {
      if (err.name !== "AbortError") toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchRequests();
  }, []);

  const activeRequests = requests.filter((r) => r.payment?.status !== "completed");
  const completedRequests = requests.filter((r) => r.payment?.status === "completed");
  const acceptedUnpaid = activeRequests.filter((r) => r.status === "accepted" && r.payment?.status !== "completed");
  const displayed = activeTab === "active" ? activeRequests : completedRequests;

  const handlePayment = async (request) => {
    if (!window.Razorpay) {
      toast.error("Payment gateway not loaded. Please refresh the page.");
      return;
    }

    setPayingId(request._id);
    try {
      const res = await fetch(`${BASE_URL}/quickInspection/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ requestId: request._id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Qualty.ai",
        description: SERVICE_MAP[request.service] || request.service,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${BASE_URL}/quickInspection/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                requestId: request._id,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.message);
            toast.success("🎉 Payment successful! Invoice sent to your email.");
            hasFetched.current = false;
            setLoading(true);
            hasFetched.current = true;
            await fetchRequests();
          } catch (err) {
            toast.error(err.message || "Payment verification failed");
          } finally {
            setPayingId(null);
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#000000" },
        modal: { ondismiss: () => setPayingId(null) }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setPayingId(null);
      });
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Failed to initiate payment");
      setPayingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => <ShimmerCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quick Inspections</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your inspection requests</p>
        </div>

        {acceptedUnpaid.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle size={16} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-800 text-sm">
                {acceptedUnpaid.length} request{acceptedUnpaid.length > 1 ? "s" : ""} accepted — payment pending
              </p>
              <p className="text-green-700 text-xs mt-0.5">
                Complete your payment to confirm the inspection booking.
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 w-fit shadow-sm">
          {[
            { id: "active", label: "My Requests", count: activeRequests.length },
            { id: "completed", label: "Completed", count: completedRequests.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.id ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                  activeTab === tab.id ? "bg-white text-black" : "bg-gray-200 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 text-center">
                {activeTab === "active" ? (
                  <>
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap size={24} className="text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-700">No active requests</p>
                    <p className="text-sm text-gray-400 mt-1">Browse the marketplace to request an inspection</p>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Receipt size={24} className="text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-700">No completed inspections</p>
                  </>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {displayed.map((r, i) => {
                  const statusCfg = STATUS_CONFIG[r.status] || STATUS_CONFIG.pending;
                  const StatusIcon = statusCfg.icon;
                  const isAcceptedUnpaid = r.status === "accepted" && r.payment?.status !== "completed";
                  const isPaid = r.payment?.status === "completed";
                  const isIndia = r.pricing?.currency === "₹";
                  const totalAmount = Number(r.pricing?.amount || 0);
                  const gstAmount = isIndia ? Math.round(totalAmount - totalAmount / (1 + GST_RATE)) : 0;
                  const baseAmount = Math.round(totalAmount - gstAmount);

                  return (
                    <motion.div
                      key={r._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                      className={`bg-white rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
                        isAcceptedUnpaid ? "border-green-300 ring-1 ring-green-200" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                            <Building2 size={17} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm leading-tight">{r.company?.companyName}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${statusCfg.cls}`}>
                          <StatusIcon size={11} />
                          {statusCfg.label}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Zap size={13} className="text-gray-400 shrink-0" />
                          <span>{SERVICE_MAP[r.service] || r.service}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Package size={13} className="text-gray-400 shrink-0" />
                          <span>Commodity: <span className="font-medium text-gray-800">{r.commodity}</span></span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={13} className="text-gray-400 shrink-0" />
                          <span>{r.location?.region} – {r.location?.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={13} className="text-gray-400 shrink-0" />
                          <span>{new Date(r.inspectionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>

                        <div className="pt-2 border-t border-gray-100 space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Service Amount</span>
                            <span className="font-medium text-gray-700">{r.pricing?.currency}{baseAmount.toLocaleString("en-IN")}</span>
                          </div>
                          {isIndia && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400 text-xs">GST (18%)</span>
                              <span className="text-gray-500 text-xs">+ ₹{gstAmount.toLocaleString("en-IN")}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm pt-1 border-t border-gray-100">
                            <span className="font-semibold text-gray-700">Total</span>
                            <div className="text-right">
                              <span className="font-bold text-gray-900">{r.pricing?.currency}{totalAmount.toLocaleString("en-IN")}</span>
                              {isPaid && <p className="text-xs text-green-600 font-medium mt-0.5">Paid</p>}
                            </div>
                          </div>
                        </div>
                      </div>

                      {isAcceptedUnpaid && (
                        <button
                          onClick={() => handlePayment(r)}
                          disabled={payingId === r._id}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
                        >
                          <CreditCard size={15} />
                          {payingId === r._id
                            ? "Opening Payment..."
                            : `Pay ${r.pricing?.currency}${totalAmount.toLocaleString("en-IN")}`}
                        </button>
                      )}

                      {isPaid && (
                        <div className="flex items-center gap-2 py-2.5 px-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium">
                          <CheckCircle2 size={14} />
                          Payment completed ·{" "}
                          {r.payment?.paidAt
                            ? new Date(r.payment.paidAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                            : ""}
                        </div>
                      )} 
                      {r.status === "rejected" && (
                        <div className="flex items-center gap-2 py-2.5 px-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                          <XCircle size={14} />
                          Request declined by company
                        </div>
                      )}

                      {r.status === "pending" && (
                        <div className="flex items-center gap-2 py-2.5 px-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-700">
                          <Clock size={14} />
                          Waiting for company to respond
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}