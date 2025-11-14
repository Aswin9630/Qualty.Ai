// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, Link, useParams } from "react-router-dom";
// import { BASE_URL } from "../../utils/constants";
// import { format } from "date-fns";
// import { Download } from "lucide-react";
// import { generatePdfBlobFromOrder } from "./InvoicePdfHelper";

// function formatCurrency(amount, currency = "INR") {
//   if (amount == null) return "-";
//   const v = Number(amount);
//   if (currency === "USD") return `$${v.toFixed(2)}`;
//   return `₹${v.toFixed(2)}`;
// }
// function formatDateTime(iso) {
//   if (!iso) return "-";
//   try {
//     return format(new Date(iso), "dd MMM yyyy, hh:mm a");
//   } catch {
//     return iso;
//   }
// }
// function OrderBadge({ status }) {
//   const s = (status || "").toLowerCase();
//   if (s.includes("paid") || s.includes("completed") || s.includes("delivered"))
//     return <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium">{status}</span>;
//   if (s.includes("pending") || s.includes("processing"))
//     return <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs sm:text-sm font-medium">{status}</span>;
//   if (s.includes("failed") || s.includes("cancel"))
//     return <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs sm:text-sm font-medium">{status}</span>;
//   return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm font-medium">{status || "Unknown"}</span>;
// }

// export default function OrdersPage() {
//   const user = useSelector((s) => s.user.user);
//   const navigate = useNavigate();
//   const { id: orderId } = useParams();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [globalError, setGlobalError] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // new state for download/view behavior
//   const [downloadedPdfUrl, setDownloadedPdfUrl] = useState(null);
//   const [downloadedOrderId, setDownloadedOrderId] = useState(null);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     if (user === undefined || user === null) return;
//     if (!user || user.role !== "customer") {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     if (!user) return;
//     if (orderId) fetchOrderById(orderId);
//     else fetchOrders();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user, orderId]);

//   useEffect(() => {
//     return () => {
//       // cleanup blob URL on unmount
//       if (downloadedPdfUrl) {
//         try { URL.revokeObjectURL(downloadedPdfUrl); } catch (e) {}
//       }
//     };
//   }, [downloadedPdfUrl]);

//   async function fetchOrders() {
//     setGlobalError("");
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/quickService/orders`, {
//         method: "GET",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err?.error || "Failed to fetch orders");
//       }
//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : data.orders || []);
//     } catch (err) {
//       console.error("fetchOrders error:", err);
//       setGlobalError(err?.message || "Unable to load orders");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function fetchOrderById(id) {
//     setGlobalError("");
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/quickService/orders/${id}`, {
//         method: "GET",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err?.error || "Failed to fetch order");
//       }
//       const data = await res.json();
//       setSelectedOrder(data);
//       setOrders([data]);
//     } catch (err) {
//       console.error("fetchOrderById error:", err);
//       setGlobalError(err?.message || "Unable to load order");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const copyOrderId = async (id) => {
//     try {
//       await navigator.clipboard.writeText(id);
//       setGlobalError("Order ID copied to clipboard");
//       setTimeout(() => setGlobalError(""), 1800);
//     } catch {
//       setGlobalError("Failed to copy order id");
//     }
//   };

//   // NEW: generate PDF, download directly, keep blob URL for view
//   const downloadInvoice = async (order) => {
//     try {
//       setDownloading(true);
//       setGlobalError("");
//       const { blob, filename } = await generatePdfBlobFromOrder(order, {
//         companyName: "Qualty.ai",
//         logoUrl: `${window.location.origin}/assets/qualty-logo.png`,
//         notes: "This is a computer-generated invoice. For billing queries contact billing@qualty.ai",
//         footerText: "Qualty.ai • GSTIN: 29AAMCP9070G1ZV • Bengaluru, India",
//         filename: `qualty-invoice-${order._id}.pdf`,
//         scale: 2,
//         pdfFormat: "a4",
//         orientation: "portrait",
//       });

//       // trigger direct download
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);

//       // revoke previous blob URL if exists
//       if (downloadedPdfUrl) {
//         try { URL.revokeObjectURL(downloadedPdfUrl); } catch (e) {}
//       }
//       setDownloadedPdfUrl(url);
//       setDownloadedOrderId(order._id);
//     } catch (err) {
//       console.error("downloadInvoice error", err);
//       setGlobalError("Unable to download invoice — check browser download settings");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const visibleOrders = orders;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 lg:px-12">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//           <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Your Orders</h1>
//         </div>

//         {globalError && (
//           <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-800 px-4 py-3">
//             <div className="flex items-center justify-between">
//               <div className="text-xs sm:text-sm">{globalError}</div>
//               <button onClick={() => setGlobalError("")} className="text-red-600 ml-4 font-medium text-xs sm:text-sm">✕</button>
//             </div>
//           </div>
//         )}

//         {loading ? (
//           <div className="bg-white rounded p-6 text-center text-gray-600 text-sm sm:text-base">Loading orders…</div>
//         ) : visibleOrders.length === 0 ? (
//           <div className="bg-white rounded p-8 text-center">
//             <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">No orders yet</h2>
//             <p className="text-xs sm:text-sm text-gray-600 mb-4">Your recent orders will appear here.</p>
//             <div className="flex flex-col sm:flex-row justify-center gap-3">
//               <Link to="/customer/dashboard" className="px-6 py-2 bg-black text-white rounded-full text-sm">Browse Services</Link>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-4">
//               {visibleOrders.map((order) => (
//                 <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between gap-4">
//                         <div className="min-w-0">
//                           <div className="text-xs sm:text-sm text-gray-500">Order</div>
//                           <div className="text-sm sm:text-base lg:text-lg font-medium break-words">{order._id}</div>
//                           <div className="text-xs sm:text-sm text-gray-500 mt-1">Placed {formatDateTime(order.createdAt)}</div>
//                         </div>

//                         <div className="text-right flex-shrink-0">
//                           <OrderBadge status={order.status} />
//                           <div className="mt-2 text-xs sm:text-sm text-gray-500">{order.items?.length || 0} items</div>
//                         </div>
//                       </div>

//                       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                           <div className="text-xs sm:text-sm text-gray-600 mb-2">Items</div>
//                           <ul className="space-y-3">
//                             {order.items?.map((it, idx) => (
//                               <li key={idx} className="flex items-start justify-between gap-4">
//                                 <div className="min-w-0">
//                                   <div className="font-medium text-sm sm:text-base text-gray-900">{it.serviceType}</div>
//                                   <div className="text-xs sm:text-sm text-gray-500 truncate">{it.location}{it.country ? `, ${it.country}` : ""}{it.commodity ? ` • ${it.commodity}` : ""}</div>
//                                   <div className="text-xxs sm:text-xs text-gray-500 mt-1">Date: {it.date ? formatDateTime(it.date) : "—"}</div>
//                                 </div>
//                                 <div className="text-sm sm:text-base font-semibold whitespace-nowrap">{formatCurrency(it.price, it.currency || order.currency)}</div>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>

//                         <div>
//                           <div className="text-xs sm:text-sm text-gray-600 mb-2">Payment</div>
//                           <div className="text-xs sm:text-sm text-gray-700 space-y-2">
//                             <div className="text-sm sm:text-base"><strong>Subtotal:</strong> {formatCurrency(order.subtotal, order.currency)}</div>
//                             <div className="text-sm sm:text-base"><strong>Tax:</strong> {formatCurrency(order.tax, order.currency)}</div>
//                             <div className="mt-2 text-base sm:text-lg font-semibold">{formatCurrency(order.total, order.currency)}</div>
//                             <div className="mt-3 text-xs sm:text-sm text-gray-500">Payment ID: {order.paymentId || order.razorpay_order_id || "—"}</div>
//                           </div>

//                           <div className="mt-4 flex flex-wrap gap-2">
//                             <button onClick={() => { setSelectedOrder(order); }} className="px-3 py-2 cursor-pointer border rounded text-xs sm:text-sm">View details</button>

//                             {downloadedOrderId === order._id ? (
//                               <button
//                                 onClick={() => { if (downloadedPdfUrl) window.open(downloadedPdfUrl, "_blank"); }}
//                                 className="px-3 py-2 bg-white border rounded text-sm flex items-center gap-2"
//                               >
//                                 View Invoice
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={() => downloadInvoice(order)}
//                                 className="px-3 py-2 bg-white border rounded cursor-pointer text-sm flex items-center gap-2"
//                                 disabled={downloading}
//                               >
//                                 {downloading ? "Downloading..." : <><Download size={14} /> Download</>}
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-t px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                     <div className="text-xxs sm:text-xs text-gray-600">Order ID: <span className="font-mono text-sm break-all">{order._id}</span></div>
//                     <div className="flex items-center gap-3">
//                       <button onClick={() => copyOrderId(order._id)} className="text-xs sm:text-sm cursor-pointer text-gray-600 flex items-center gap-2" title="Copy order id">
//                         Copy ID
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <aside className="space-y-4">
//               <div className="bg-white rounded-lg p-4 shadow-sm">
//                 <div className="text-xs sm:text-sm text-gray-600 mb-2">Recent activity</div>
//                 <ul className="space-y-2 text-xs sm:text-sm">
//                   {orders.slice(0, 5).map((o) => (
//                     <li key={o._id} className="flex items-center justify-between">
//                       <div className="text-xxs sm:text-xs">{formatDateTime(o.createdAt)}</div>
//                       <div className="font-medium text-sm sm:text-base">{formatCurrency(o.total, o.currency)}</div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-white rounded-lg p-4 shadow-sm">
//                 <div className="text-xs sm:text-sm text-gray-600 mb-2">Quick actions</div>
//                 <div className="flex flex-col gap-2">
//                   <Link to="/customer/dashboard" className="px-3 py-2 bg-black text-white rounded text-sm text-center">Book new service</Link>
//                   <Link to="/customer/cart" className="px-3 py-2 border rounded text-sm text-center">Go to cart</Link>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         )}
//       </div>

//       {selectedOrder && (
//         <div className="fixed inset-0 z-50 flex">
//           <div className="flex-1 bg-black/40" onClick={() => setSelectedOrder(null)} />
//           <div className="w-full md:w-3/5 lg:w-2/5 bg-white h-full overflow-auto p-6">
//             <div className="flex items-start justify-between gap-4">
//               <h3 className="text-base sm:text-lg font-semibold">Order details</h3>
//               <button onClick={() => setSelectedOrder(null)} className="text-gray-600 text-sm cursor-pointer">Close</button>
//             </div>
//             <div className="mt-4 space-y-4">
//               <div className="text-xs sm:text-sm text-gray-600">Order ID</div>
//               <div className="font-mono text-sm break-all">{selectedOrder._id}</div>

//               <div className="bg-gray-50 p-4 rounded">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-xs sm:text-sm text-gray-600">Placed</div>
//                     <div className="font-medium text-sm sm:text-base">{formatDateTime(selectedOrder.createdAt)}</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-xs sm:text-sm text-gray-600">Status</div>
//                     <OrderBadge status={selectedOrder.status} />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white p-4 rounded shadow-sm">
//                 <div className="text-xs sm:text-sm text-gray-600 mb-2">Items</div>
//                 <ul className="space-y-3">
//                   {selectedOrder.items?.map((it, idx) => (
//                     <li key={idx} className="flex items-start justify-between gap-4">
//                       <div className="min-w-0">
//                         <div className="font-medium text-sm sm:text-base">{it.serviceType}</div>
//                         <div className="text-xs sm:text-sm text-gray-500">{it.location}{it.country ? `, ${it.country}` : ""}</div>
//                         <div className="text-xxs sm:text-xs text-gray-500 mt-1">Commodity: {it.commodity} • Volume: {it.volume} {it.unit}</div>
//                       </div>
//                       <div className="text-sm sm:text-base font-semibold whitespace-nowrap">{formatCurrency(it.price, it.currency || selectedOrder.currency)}</div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-white p-4 rounded shadow-sm">
//                 <div className="text-xs sm:text-sm text-gray-600 mb-2">Payment summary</div>
//                 <div className="text-sm sm:text-sm text-gray-700 space-y-2">
//                   <div className="flex justify-between text-xs sm:text-sm"><div>Subtotal</div><div>{formatCurrency(selectedOrder.subtotal, selectedOrder.currency)}</div></div>
//                   <div className="flex justify-between text-xs sm:text-sm"><div>Tax</div><div>{formatCurrency(selectedOrder.tax, selectedOrder.currency)}</div></div>
//                   <div className="flex justify-between font-bold text-sm sm:text-base"><div>Total</div><div>{formatCurrency(selectedOrder.total, selectedOrder.currency)}</div></div>
//                   <div className="mt-3 text-xs sm:text-sm text-gray-500">Payment ID: {selectedOrder.paymentId || selectedOrder.razorpay_order_id}</div>
//                 </div>
//               </div>

//               <div className="flex gap-2 flex-wrap">
//                 {downloadedOrderId === selectedOrder._id ? (
//                   <a href={downloadedPdfUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border rounded text-sm">View Invoice</a>
//                 ) : (
//                   <button onClick={() => downloadInvoice(selectedOrder)} className="px-3 py-2 cursor-pointer border rounded text-sm flex items-center gap-2"><Download size={14}/> Download</button>
//                 )}
//               </div>

//               <div className="text-xs sm:text-sm text-gray-500">If you have questions about this order, contact your support channel.</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Download } from "lucide-react";
import { BASE_URL } from "../../utils/constants";
import { generatePdfFromOrderHtml } from "./invoicePdfServiceHtml"; // adjust path if needed

function formatCurrency(amount, currency = "INR") {
  if (amount == null) return "-";
  const v = Number(amount);
  if (currency === "USD") return `$${v.toFixed(2)}`;
  return `₹${v.toFixed(2)}`;
}
function formatDateTime(iso) {
  if (!iso) return "-";
  try {
    return format(new Date(iso), "dd MMM yyyy, hh:mm a");
  } catch {
    return iso;
  }
}
function OrderBadge({ status }) {
  const s = (status || "").toLowerCase();
  if (s.includes("paid") || s.includes("completed") || s.includes("delivered"))
    return <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium">{status}</span>;
  if (s.includes("pending") || s.includes("processing"))
    return <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs sm:text-sm font-medium">{status}</span>;
  if (s.includes("failed") || s.includes("cancel"))
    return <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs sm:text-sm font-medium">{status}</span>;
  return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs sm:text-sm font-medium">{status || "Unknown"}</span>;
}

export default function OrdersPage() {
  const user = useSelector((s) => s.user.user);
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // PDF download / view state
  const [downloadedPdfUrl, setDownloadedPdfUrl] = useState(null);
  const [downloadedOrderId, setDownloadedOrderId] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (user === undefined || user === null) return;
    if (!user || user.role !== "customer") {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    if (orderId) fetchOrderById(orderId);
    else fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, orderId]);

  useEffect(() => {
    return () => {
      if (downloadedPdfUrl) {
        try { URL.revokeObjectURL(downloadedPdfUrl); } catch {}
      }
    };
  }, [downloadedPdfUrl]);

  async function fetchOrders() {
    setGlobalError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/quickService/orders`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to fetch orders");
      }
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      console.error("fetchOrders error:", err);
      setGlobalError(err?.message || "Unable to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrderById(id) {
    setGlobalError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/quickService/orders/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to fetch order");
      }
      const data = await res.json();
      setSelectedOrder(data);
      setOrders([data]);
    } catch (err) {
      console.error("fetchOrderById error:", err);
      setGlobalError(err?.message || "Unable to load order");
    } finally {
      setLoading(false);
    }
  }

  const copyOrderId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setGlobalError("Order ID copied to clipboard");
      setTimeout(() => setGlobalError(""), 1800);
    } catch {
      setGlobalError("Failed to copy order id");
    }
  };

  const downloadInvoice = async (order) => {
    try {
      setDownloading(true);
      setGlobalError("");
      const { blob, filename } = await generatePdfFromOrderHtml(order, {
        company: {
          name: "Qualty.ai",
          logoUrl: `${window.location.origin}/assets/qualty-logo.png`,
          address: "Qualty.ai, Bengaluru, India",
          gstin: "29AAMCP9070G1ZV",
          email: "billing@qualty.ai",
        },
        filename: `qualty-invoice-${order._id}.pdf`,
        scale: 2,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      if (downloadedPdfUrl) {
        try { URL.revokeObjectURL(downloadedPdfUrl); } catch {}
      }
      setDownloadedPdfUrl(url);
      setDownloadedOrderId(order._id);
    } catch (err) {
      console.error("downloadInvoice error", err);
      setGlobalError("Unable to generate invoice — try again");
    } finally {
      setDownloading(false);
    }
  };

  const visibleOrders = orders;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Your Orders</h1>
        </div>

        {globalError && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 text-red-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm">{globalError}</div>
              <button onClick={() => setGlobalError("")} className="text-red-600 ml-4 font-medium text-xs sm:text-sm">✕</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded p-6 text-center text-gray-600 text-sm sm:text-base">Loading orders…</div>
        ) : visibleOrders.length === 0 ? (
          <div className="bg-white rounded p-8 text-center">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">Your recent orders will appear here.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/customer/dashboard" className="px-6 py-2 bg-black text-white rounded-full text-sm">Browse Services</Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {visibleOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm text-gray-500">Order</div>
                          <div className="text-sm sm:text-base lg:text-lg font-medium break-words">{order._id}</div>
                          <div className="text-xs sm:text-sm text-gray-500 mt-1">Placed {formatDateTime(order.createdAt)}</div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <OrderBadge status={order.status} />
                          <div className="mt-2 text-xs sm:text-sm text-gray-500">{order.items?.length || 0} items</div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-2">Items</div>
                          <ul className="space-y-3">
                            {order.items?.map((it, idx) => (
                              <li key={idx} className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <div className="font-medium text-sm sm:text-base text-gray-900">{it.serviceType}</div>
                                  <div className="text-xs sm:text-sm text-gray-500 truncate">{it.location}{it.country ? `, ${it.country}` : ""}{it.commodity ? ` • ${it.commodity}` : ""}</div>
                                  <div className="text-xxs sm:text-xs text-gray-500 mt-1">Date: {it.date ? formatDateTime(it.date) : "—"}</div>
                                </div>
                                <div className="text-sm sm:text-base font-semibold whitespace-nowrap">{formatCurrency(it.price, it.currency || order.currency)}</div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-2">Payment</div>
                          <div className="text-xs sm:text-sm text-gray-700 space-y-2">
                            <div className="text-sm sm:text-base"><strong>Subtotal:</strong> {formatCurrency(order.subtotal, order.currency)}</div>
                            <div className="text-sm sm:text-base"><strong>Tax:</strong> {formatCurrency(order.tax, order.currency)}</div>
                            <div className="mt-2 text-base sm:text-lg font-semibold">{formatCurrency(order.total, order.currency)}</div>
                            <div className="mt-3 text-xs sm:text-sm text-gray-500">Payment ID: {order.paymentId || order.razorpay_order_id || "—"}</div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={() => { setSelectedOrder(order); }} className="px-3 py-2 border rounded text-xs sm:text-sm">View details</button>

                            {downloadedOrderId === order._id ? (
                              <button
                                onClick={() => downloadedPdfUrl && window.open(downloadedPdfUrl, "_blank")}
                                className="px-3 py-2 bg-white border rounded text-sm flex items-center gap-2"
                              >
                                View Invoice
                              </button>
                            ) : (
                              <button
                                onClick={() => downloadInvoice(order)}
                                className="px-3 py-2 bg-white border rounded text-sm flex items-center gap-2"
                                disabled={downloading}
                              >
                                {downloading ? "Generating..." : <><Download size={14} /> Download</>}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="text-xxs sm:text-xs text-gray-600">Order ID: <span className="font-mono text-sm break-all">{order._id}</span></div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => copyOrderId(order._id)} className="text-xs sm:text-sm cursor-pointer text-gray-600 flex items-center gap-2" title="Copy order id">
                        Copy ID
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-600 mb-2">Recent activity</div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {orders.slice(0, 5).map((o) => (
                    <li key={o._id} className="flex items-center justify-between">
                      <div className="text-xxs sm:text-xs">{formatDateTime(o.createdAt)}</div>
                      <div className="font-medium text-sm sm:text-base">{formatCurrency(o.total, o.currency)}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-xs sm:text-sm text-gray-600 mb-2">Quick actions</div>
                <div className="flex flex-col gap-2">
                  <Link to="/customer/dashboard" className="px-3 py-2 bg-black text-white rounded text-sm text-center">Book new service</Link>
                  <Link to="/customer/cart" className="px-3 py-2 border rounded text-sm text-center">Go to cart</Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSelectedOrder(null)} />
          <div className="w-full md:w-3/5 lg:w-2/5 bg-white h-full overflow-auto p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base sm:text-lg font-semibold">Order details</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-600 text-sm">Close</button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="text-xs sm:text-sm text-gray-600">Order ID</div>
              <div className="font-mono text-sm break-all">{selectedOrder._id}</div>

              <div className="bg-gray-50 p-4 rounded">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600">Placed</div>
                    <div className="font-medium text-sm sm:text-base">{formatDateTime(selectedOrder.createdAt)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-gray-600">Status</div>
                    <OrderBadge status={selectedOrder.status} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <div className="text-xs sm:text-sm text-gray-600 mb-2">Items</div>
                <ul className="space-y-3">
                  {selectedOrder.items?.map((it, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="font-medium text-sm sm:text-base">{it.serviceType}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{it.location}{it.country ? `, ${it.country}` : ""}</div>
                        <div className="text-xxs sm:text-xs text-gray-500 mt-1">Commodity: {it.commodity} • Volume: {it.volume} {it.unit}</div>
                      </div>
                      <div className="text-sm sm:text-base font-semibold whitespace-nowrap">{formatCurrency(it.price, it.currency || selectedOrder.currency)}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded shadow-sm">
                <div className="text-xs sm:text-sm text-gray-600 mb-2">Payment summary</div>
                <div className="text-sm sm:text-sm text-gray-700 space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm"><div>Subtotal</div><div>{formatCurrency(selectedOrder.subtotal, selectedOrder.currency)}</div></div>
                  <div className="flex justify-between text-xs sm:text-sm"><div>Tax</div><div>{formatCurrency(selectedOrder.tax, selectedOrder.currency)}</div></div>
                  <div className="flex justify-between font-bold text-sm sm:text-base"><div>Total</div><div>{formatCurrency(selectedOrder.total, selectedOrder.currency)}</div></div>
                  <div className="mt-3 text-xs sm:text-sm text-gray-500">Payment ID: {selectedOrder.paymentId || selectedOrder.razorpay_order_id}</div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {downloadedOrderId === selectedOrder._id ? (
                  <a href={downloadedPdfUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border rounded text-sm">View Invoice</a>
                ) : (
                  <button onClick={() => downloadInvoice(selectedOrder)} className="px-3 py-2 border rounded text-sm flex items-center gap-2"><Download size={14}/> Download</button>
                )}
              </div>

              <div className="text-xs sm:text-sm text-gray-500">If you have questions about this order, contact your support channel.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
