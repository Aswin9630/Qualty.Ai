// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { CheckCircle2, XCircle, MapPin, Calendar, Package, User, Clock, Inbox } from "lucide-react";
// import { BASE_URL } from "../../../../utils/constants";

// const SERVICE_MAP = {
//   psi: "Pre-Shipment Inspection",
//   loading: "Loading Supervision",
//   stuffing: "Stuffing Supervision",
//   destination: "Destination Inspection"
// };

// const STATUS_CONFIG = {
//   pending: { label: "Pending", cls: "bg-amber-50 text-amber-700 border-amber-200" },
//   accepted: { label: "Accepted", cls: "bg-green-50 text-green-700 border-green-200" },
//   rejected: { label: "Rejected", cls: "bg-red-50 text-red-700 border-red-200" }
// };

// const ShimmerCard = () => (
//   <div className="animate-pulse bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
//     <div className="flex gap-3 items-start">
//       <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
//       <div className="flex-1 space-y-2">
//         <div className="h-4 bg-gray-100 rounded w-1/2" />
//         <div className="h-3 bg-gray-100 rounded w-1/3" />
//       </div>
//       <div className="w-16 h-6 bg-gray-100 rounded-full" />
//     </div>
//     <div className="space-y-2">
//       <div className="h-3 bg-gray-100 rounded w-2/3" />
//       <div className="h-3 bg-gray-100 rounded w-1/2" />
//       <div className="h-3 bg-gray-100 rounded w-3/4" />
//     </div>
//     <div className="h-3 bg-gray-100 rounded w-1/4" />
//     <div className="flex gap-2 pt-1">
//       <div className="h-10 bg-gray-100 rounded-xl flex-1" />
//       <div className="h-10 bg-gray-100 rounded-xl flex-1" />
//     </div>
//   </div>
// );

// export default function CompanyInspectionRequests({ filter = "pending", onCountChange }) {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState({});
//   const hasFetched = useRef(false);

//   const load = async (showError = true) => {
//     const controller = new AbortController();
//     try {
//       const res = await fetch(`${BASE_URL}/inspectionCompany/quick-requests`, {
//         credentials: "include",
//         signal: controller.signal
//       });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.message || "Failed to load requests");
//       }
//       const data = await res.json();
//       if (data.success) {
//         const filtered = data.data.filter((r) => r.status === filter);
//         setRequests(filtered);
//         if (onCountChange) {
//           const pendingCount = data.data.filter((r) => r.status === "pending").length;
//           onCountChange(pendingCount);
//         }
//       }
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       if (showError) toast.error(err.message || "Failed to load requests");
//     } finally {
//       setLoading(false);
//     }
//     return () => controller.abort();
//   };

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     load();
//   }, [filter]);

//   const updateStatus = async (id, status) => {
//     setUpdating((p) => ({ ...p, [id]: status }));
//     try {
//       const res = await fetch(`${BASE_URL}/inspectionCompany/quick-requests/${id}/status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       toast.success(`Request ${status} successfully`);
//       hasFetched.current = false;
//       setLoading(true);
//       hasFetched.current = true;
//       await load(false);
//     } catch (err) {
//       toast.error(err.message || "Failed to update");
//     } finally {
//       setUpdating((p) => ({ ...p, [id]: null }));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="grid md:grid-cols-2 gap-4">
//         {[1, 2, 3, 4].map((i) => <ShimmerCard key={i} />)}
//       </div>
//     );
//   }

//   if (!requests.length) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 text-center">
//         {filter === "pending" ? (
//           <>
//             <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
//               <Inbox size={24} className="text-gray-400" />
//             </div>
//             <p className="font-semibold text-gray-700">No pending requests</p>
//             <p className="text-sm text-gray-400 mt-1">New requests from customers will appear here</p>
//           </>
//         ) : (
//           <>
//             <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
//               <CheckCircle2 size={24} className="text-gray-400" />
//             </div>
//             <p className="font-semibold text-gray-700">No accepted requests yet</p>
//             <p className="text-sm text-gray-400 mt-1">Accepted inspections will appear here</p>
//           </>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="grid md:grid-cols-2 gap-4">
//       {requests.map((r, i) => {
//         const statusCfg = STATUS_CONFIG[r.status];
//         const isUpdating = updating[r._id];
//         return (
//           <motion.div
//             key={r._id}
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05, duration: 0.25 }}
//             className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
//                   <User size={17} className="text-gray-600" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm">{r.customer?.name}</p>
//                   <p className="text-xs text-gray-400 mt-0.5">{r.customer?.email}</p>
//                 </div>
//               </div>
//               <span className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${statusCfg.cls}`}>
//                 {statusCfg.label}
//               </span>
//             </div>

//             <div className="space-y-2 text-sm mb-3">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Package size={13} className="text-gray-400 shrink-0" />
//                 <span className="font-medium">{SERVICE_MAP[r.service] || r.service}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Package size={13} className="text-gray-400 shrink-0" />
//                 <span>Commodity: <span className="font-medium text-gray-800">{r.commodity}</span></span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <MapPin size={13} className="text-gray-400 shrink-0" />
//                 <span>{r.location?.region} – {r.location?.city}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Calendar size={13} className="text-gray-400 shrink-0" />
//                 <span>{new Date(r.inspectionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
//               </div>
//               <div className="flex items-center justify-between pt-1 border-t border-gray-100">
//                 <span className="text-xs text-gray-400">Your Earnings</span>
//                 <span className="font-bold text-gray-900">
//                   {r.pricing?.currency === "$" ? "$" : "₹"}{Number(r.pricing?.originalAmount || 0).toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             <p className="text-xs text-gray-400 mb-3">
//               Received {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//             </p>

//             {r.status === "pending" && (
//               <div className="flex gap-2">
//                 <button
//                   disabled={!!isUpdating}
//                   onClick={() => updateStatus(r._id, "accepted")}
//                   className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition cursor-pointer"
//                 >
//                   {isUpdating === "accepted" ? (
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <><CheckCircle2 size={14} /> Accept</>
//                   )}
//                 </button>
//                 <button
//                   disabled={!!isUpdating}
//                   onClick={() => updateStatus(r._id, "rejected")}
//                   className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 disabled:opacity-50 transition cursor-pointer"
//                 >
//                   {isUpdating === "rejected" ? (
//                     <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <><XCircle size={14} /> Reject</>
//                   )}
//                 </button>
//               </div>
//             )}

//             {r.status === "accepted" && (
//               <div className="flex items-center gap-2 py-2.5 px-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium">
//                 <CheckCircle2 size={15} />
//                 <span>Accepted · Awaiting customer payment</span>
//               </div>
//             )}
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }




// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import {
//   CheckCircle2, XCircle, MapPin, Calendar, Package,
//   User, Inbox, Layers, Clock
// } from "lucide-react";
// import { BASE_URL } from "../../../../utils/constants";

// const SERVICE_MAP = {
//   psi: "Pre-Shipment Inspection",
//   loading: "Loading Supervision",
//   stuffing: "Stuffing Supervision",
//   destination: "Destination Inspection"
// };

// const STATUS_CONFIG = {
//   pending: { label: "Pending", cls: "bg-amber-50 text-amber-700 border-amber-200" },
//   accepted: { label: "Accepted", cls: "bg-green-50 text-green-700 border-green-200" },
//   rejected: { label: "Rejected", cls: "bg-red-50 text-red-700 border-red-200" }
// };

// const ShimmerCard = () => (
//   <div className="animate-pulse bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
//     <div className="flex gap-3 items-start">
//       <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
//       <div className="flex-1 space-y-2">
//         <div className="h-4 bg-gray-100 rounded w-1/2" />
//         <div className="h-3 bg-gray-100 rounded w-1/3" />
//       </div>
//       <div className="w-16 h-6 bg-gray-100 rounded-full" />
//     </div>
//     <div className="space-y-2">
//       <div className="h-3 bg-gray-100 rounded w-2/3" />
//       <div className="h-3 bg-gray-100 rounded w-1/2" />
//       <div className="h-3 bg-gray-100 rounded w-3/4" />
//     </div>
//     <div className="h-3 bg-gray-100 rounded w-1/4" />
//     <div className="flex gap-2 pt-1">
//       <div className="h-10 bg-gray-100 rounded-xl flex-1" />
//       <div className="h-10 bg-gray-100 rounded-xl flex-1" />
//     </div>
//   </div>
// );

// export default function 
// ({ filter = "pending", onCountChange }) {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState({});
//   const hasFetched = useRef(false);

//   const load = async () => {
//     const controller = new AbortController();
//     try {
//       const res = await fetch(`${BASE_URL}/inspectionCompany/quick-requests`, {
//         credentials: "include",
//         signal: controller.signal
//       });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.message || "Failed to load requests");
//       }
//       const data = await res.json();
//       if (data.success) {
//         const filtered = data.data.filter((r) => r.status === filter);
//         setRequests(filtered);
//         if (onCountChange) {
//           const pendingCount = data.data.filter((r) => r.status === "pending").length;
//           onCountChange(pendingCount);
//         }
//       }
//     } catch (err) {
//       if (err.name === "AbortError") return;
//       toast.error(err.message || "Failed to load requests");
//     } finally {
//       setLoading(false);
//     }
//     return () => controller.abort();
//   };

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     load();
//   }, [filter]);

//   const updateStatus = async (id, status) => {
//     setUpdating((p) => ({ ...p, [id]: status }));
//     try {
//       const res = await fetch(`${BASE_URL}/inspectionCompany/quick-requests/${id}/status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       toast.success(`Request ${status} successfully`);
//       hasFetched.current = false;
//       setLoading(true);
//       hasFetched.current = true;
//       await load();
//     } catch (err) {
//       toast.error(err.message || "Failed to update");
//     } finally {
//       setUpdating((p) => ({ ...p, [id]: null }));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="grid md:grid-cols-2 gap-4">
//         {[1, 2, 3, 4].map((i) => <ShimmerCard key={i} />)}
//       </div>
//     );
//   }

//   if (!requests.length) {
//     return (
//       <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 text-center">
//         <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
//           {filter === "pending"
//             ? <Inbox size={24} className="text-gray-400" />
//             : <CheckCircle2 size={24} className="text-gray-400" />}
//         </div>
//         <p className="font-semibold text-gray-700">
//           {filter === "pending" ? "No pending requests" : "No accepted requests yet"}
//         </p>
//         <p className="text-sm text-gray-400 mt-1">
//           {filter === "pending"
//             ? "New requests from customers will appear here"
//             : "Accepted inspections will appear here"}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid md:grid-cols-2 gap-4">
//       {requests.map((r, i) => {
//         const statusCfg = STATUS_CONFIG[r.status];
//         const isUpdating = updating[r._id];

//         return (
//           <motion.div
//             key={r._id}
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.05, duration: 0.25 }}
//             className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
//                   <User size={17} className="text-gray-600" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm">{r.customer?.name}</p>
//                   <p className="text-xs text-gray-400 mt-0.5">
//                     {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//                   </p>
//                 </div>
//               </div>
//               <span className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${statusCfg.cls}`}>
//                 {statusCfg.label}
//               </span>
//             </div>

//             <div className="space-y-2 text-sm mb-3">
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Layers size={13} className="text-blue-400 shrink-0" />
//                 <span className="font-medium text-gray-800">{SERVICE_MAP[r.service] || r.service}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Package size={13} className="text-orange-400 shrink-0" />
//                 <span>Commodity: <span className="font-medium text-gray-800">{r.commodity}</span></span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <MapPin size={13} className="text-gray-400 shrink-0" />
//                 <span>{r.location?.region} – {r.location?.city}</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-600">
//                 <Calendar size={13} className="text-gray-400 shrink-0" />
//                 <span>{new Date(r.inspectionDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
//               </div>
//               <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                 <span className="text-xs text-gray-400">Your Earnings</span>
//                 <span className="font-bold text-gray-900">
//                   {r.pricing?.currency === "$" ? "$" : "₹"}{Number(r.pricing?.originalAmount || 0).toLocaleString("en-IN")}
//                 </span>
//               </div>
//             </div>

//             {r.status === "pending" && (
//               <div className="flex gap-2 mt-3">
//                 <button
//                   disabled={!!isUpdating}
//                   onClick={() => updateStatus(r._id, "accepted")}
//                   className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition cursor-pointer"
//                 >
//                   {isUpdating === "accepted" ? (
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <><CheckCircle2 size={14} /> Accept</>
//                   )}
//                 </button>
//                 <button
//                   disabled={!!isUpdating}
//                   onClick={() => updateStatus(r._id, "rejected")}
//                   className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 disabled:opacity-50 transition cursor-pointer"
//                 >
//                   {isUpdating === "rejected" ? (
//                     <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
//                   ) : (
//                     <><XCircle size={14} /> Reject</>
//                   )}
//                 </button>
//               </div>
//             )}

//             {r.status === "accepted" && (
//               <div className="flex items-center gap-2 mt-3 py-2.5 px-3 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700 font-medium">
//                 <CheckCircle2 size={14} />
//                 Accepted · Awaiting customer payment
//               </div>
//             )}
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// }






import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  CheckCircle2, XCircle, MapPin, Calendar, Package,
  User, Inbox, Layers, Clock
} from "lucide-react";
import { BASE_URL } from "../../../../utils/constants";

const SERVICE_MAP = {
  psi: "Pre-Shipment Inspection",
  loading: "Loading Supervision",
  stuffing: "Stuffing Supervision",
  destination: "Destination Inspection"
};

const STATUS_CONFIG = {
  pending: { label: "Pending", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  accepted: { label: "Accepted", cls: "bg-green-50 text-green-700 border-green-200" },
  rejected: { label: "Rejected", cls: "bg-red-50 text-red-700 border-red-200" }
};

const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
    <div className="flex gap-3 items-start">
      <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
      <div className="w-16 h-6 bg-gray-100 rounded-full" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-3 bg-gray-100 rounded w-3/4" />
    </div>
    <div className="h-3 bg-gray-100 rounded w-1/4" />
    <div className="flex gap-2 pt-1">
      <div className="h-10 bg-gray-100 rounded-xl flex-1" />
      <div className="h-10 bg-gray-100 rounded-xl flex-1" />
    </div>
  </div>
);

export default function CompanyInspectionRequests({ filter = "pending", onCountChange }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const hasFetched = useRef(false);

  const load = async () => {
    const controller = new AbortController();
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/quick-requests`, {
        credentials: "include",
        signal: controller.signal
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to load requests");
      }
      const data = await res.json();
      if (data.success) {
        const filtered = data.data.filter((r) => r.status === filter);
        setRequests(filtered);
        if (onCountChange) {
          const pendingCount = data.data.filter((r) => r.status === "pending").length;
          onCountChange(pendingCount);
        }
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      toast.error(err.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    load();
  }, [filter]);

  const updateStatus = async (id, status) => {
    setUpdating((p) => ({ ...p, [id]: status }));
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/quick-requests/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success(`Request ${status} successfully`);
      hasFetched.current = false;
      setLoading(true);
      hasFetched.current = true;
      await load();
    } catch (err) {
      toast.error(err.message || "Failed to update");
    } finally {
      setUpdating((p) => ({ ...p, [id]: null }));
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => <ShimmerCard key={i} />)}
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200 text-center">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          {filter === "pending"
            ? <Inbox size={24} className="text-gray-400" />
            : <CheckCircle2 size={24} className="text-gray-400" />}
        </div>
        <p className="font-semibold text-gray-700">
          {filter === "pending" ? "No pending requests" : "No accepted requests yet"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {filter === "pending"
            ? "New requests from customers will appear here"
            : "Accepted inspections will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {requests.map((r, i) => {
        const statusCfg = STATUS_CONFIG[r.status];
        const isUpdating = updating[r._id];
        const isPaid = r.payment?.status === "completed";

        return (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                  <User size={17} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.customer?.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full border font-medium whitespace-nowrap ${statusCfg.cls}`}
              >
                {statusCfg.label}
              </span>
            </div>

            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Layers size={13} className="text-blue-400 shrink-0" />
                <span className="font-medium text-gray-800">
                  {SERVICE_MAP[r.service] || r.service}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Package size={13} className="text-orange-400 shrink-0" />
                <span>
                  Commodity: <span className="font-medium text-gray-800">{r.commodity}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={13} className="text-gray-400 shrink-0" />
                <span>{r.location?.region} – {r.location?.city}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={13} className="text-gray-400 shrink-0" />
                <span>
                  {new Date(r.inspectionDate).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">Your Earnings</span>
                <span className="font-bold text-gray-900">
                  {r.pricing?.currency === "$" ? "$" : "₹"}
                  {Number(r.pricing?.originalAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {r.status === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  disabled={!!isUpdating}
                  onClick={() => updateStatus(r._id, "accepted")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition cursor-pointer"
                >
                  {isUpdating === "accepted" ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><CheckCircle2 size={14} />Accept</>
                  )}
                </button>
                <button
                  disabled={!!isUpdating}
                  onClick={() => updateStatus(r._id, "rejected")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 disabled:opacity-50 transition cursor-pointer"
                >
                  {isUpdating === "rejected" ? (
                    <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><XCircle size={14} />Reject</>
                  )}
                </button>
              </div>
            )}

            {r.status === "accepted" && (
              <div
                className={`flex items-center gap-2 mt-3 py-2.5 px-3 rounded-xl text-sm font-medium border ${
                  isPaid
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-amber-50 border-amber-200 text-amber-700"
                }`}
              >
                {isPaid ? (
                  <>
                    <CheckCircle2 size={14} />
                    Customer Paid · Inspection Confirmed
                  </>
                ) : (
                  <>
                    <Clock size={14} />
                    Accepted · Awaiting Customer Payment
                  </>
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}