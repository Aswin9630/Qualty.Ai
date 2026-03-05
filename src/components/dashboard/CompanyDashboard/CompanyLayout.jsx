// import React, { useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import useFetchUser from "../../../hooks/useFetchUser";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { LayoutDashboard, Gavel, LineChart, User, MessageCircle, History, CreditCard } from "lucide-react";
// import { BASE_URL } from "../../../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { removeUser } from "../../../redux/slice/userSlice";

// const navItems = [
//   { label: "Dashboard", icon: <LayoutDashboard />, path: "/inspection_company/dashboard" },
//   { label: "Bidding Room", icon: <Gavel />, path: "/inspection_company/bidding" },
//   { label: "Chat with Customer", icon: <MessageCircle />, path: "/inspection_company/customersList" },
//   { label: "Quick Inspection", icon: <History />, path: "/inspection_company/quick-inspection" },
//   { label: "Bid History", icon: <History />, path: "/inspection_company/history" },
//   // { label: "Payments", icon: <CreditCard />, path: "/inspection_company/payments" },
//   { label: "Detail Analysis", icon: <LineChart />, path: "/inspection_company/analysis" },
//   { label: "My Account", icon: <User />, path: "/inspection_company/account" },
// ];

// const CompanyLayout = () => {
//   useFetchUser(); 
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const user = useSelector((s) => s?.user?.user);

//   const currentTab = (() => {
//     const found = navItems.find((item) =>
//       item.path === "/inspection_company/dashboard"
//         ? location.pathname === "/inspection_company/dashboard"
//         : location.pathname.startsWith(item.path)
//     );
//     return found?.label || "Dashboard";
//   })();

//   const handleLogout = () => setShowLogoutConfirm(true);

//   const confirmLogoutAction = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//       const data = await response.json().catch(() => ({ message: "Logged out" }));
//       toast.success(data.message || "Logged out");
//       dispatch(removeUser());
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Logout failed");
//     } finally {
//       navigate("/");
//     }
//   };

//   if (!user) {
//     return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading user...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white text-black flex">
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-lg transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
//       >
//         <div className="p-6 border-b border-gray-200 relative">
//           <div className="flex gap-3 items-center">
//             <FaUserCircle className="text-black" size={28} />
//             <div>
//               <div className="text-sm font-semibold text-black">{user.companyName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Company"}</div>
//               <div className="text-xs text-gray-500">{user.companyEmail || user.email}</div>
//             </div>
//           </div>

//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden absolute top-3 right-2 text-gray-500 hover:text-black"
//             aria-label="Close sidebar"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//           {navItems.map((item, index) => {
//             const isActive =
//               item.path === "/inspection_company/dashboard"
//                 ? location.pathname === "/inspection_company/dashboard"
//                 : location.pathname.startsWith(item.path);
//             return (
//               <button
//                 key={index}
//                 onClick={() => {
//                   navigate(item.path);
//                   setSidebarOpen(false);
//                 }}
//                 className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg transition-all ${
//                   isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-black"
//                 }`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span className="text-lg font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>

//         <div className="p-4 border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-100 hover:text-red-700"
//           >
//             <span className="text-sm font-semibold">Logout</span>
//           </button>
//         </div>
//       </aside>

//       <div className="flex-1">
//         <nav className="bg-white border-b border-gray-200 text-black p-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-gray-600 hover:text-black cursor-pointer" aria-label="Open sidebar">
//               <FaBars size={22} />
//             </button>
//             <h1 className="text-xl font-semibold">{currentTab}</h1>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-sm text-gray-700 hidden sm:block">Signed in as <strong>{user.firstName || user.companyName}</strong></div>
//           </div>
//         </nav>

//         <main className="px-4 py-6 bg-white min-h-screen">
//           <Outlet />
//         </main>
//       </div>

//       {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

//       {showLogoutConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//           <div className="bg-white border border-gray-300 rounded-xl p-6 w-full max-w-sm text-center shadow-xl animate-fade-in">
//             <h2 className="text-lg font-semibold text-black mb-4">Are you sure you want to logout?</h2>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => {
//                   confirmLogoutAction();
//                   setShowLogoutConfirm(false);
//                 }}
//                 className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold"
//               >
//                 Yes, Logout
//               </button>
//               <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold">
//                 No, Stay
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default CompanyLayout;








// import React, { useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import useFetchUser from "../../../hooks/useFetchUser";
// import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
// import { LayoutDashboard, Gavel, LineChart, User, MessageCircle, History, Zap } from "lucide-react";
// import { BASE_URL } from "../../../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { removeUser } from "../../../redux/slice/userSlice";
// import { useCompanyQuickNotifications } from "../../../hooks/QuickInspection/Usequicknotifications";
// import CompanyWallet from "./QuickInspection/components/CompanyWallet";

// const CompanyLayout = () => {
//   useFetchUser();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const user = useSelector((s) => s?.user?.user);
//   const pendingCount = useCompanyQuickNotifications();

//   const navItems = [
//     { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/inspection_company/dashboard" },
//     { label: "Bidding Room", icon: <Gavel size={20} />, path: "/inspection_company/bidding" },
//     { label: "Chat with Customer", icon: <MessageCircle size={20} />, path: "/inspection_company/customersList" },
//     {
//       label: "Quick Inspection",
//       icon: <Zap size={20} />,
//       path: "/inspection_company/quick-inspection",
//       notify: pendingCount
//     },
//     { label: "Bid History", icon: <History size={20} />, path: "/inspection_company/history" },
//     { label: "Detail Analysis", icon: <LineChart size={20} />, path: "/inspection_company/analysis" },
//     { label: "My Account", icon: <User size={20} />, path: "/inspection_company/account" },
//   ];

//   const currentTab = (() => {
//     const found = navItems.find((item) =>
//       item.path === "/inspection_company/dashboard"
//         ? location.pathname === "/inspection_company/dashboard"
//         : location.pathname.startsWith(item.path)
//     );
//     return found?.label || "Dashboard";
//   })();

//   const confirmLogoutAction = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
//       const data = await response.json().catch(() => ({ message: "Logged out" }));
//       toast.success(data.message || "Logged out");
//       dispatch(removeUser());
//     } catch {
//       toast.error("Logout failed");
//     } finally {
//       navigate("/");
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
//           <p className="text-gray-500 text-sm">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white text-black flex">
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
//       >
//         <div className="p-5 border-b border-gray-200 relative">
//           <div className="flex gap-3 items-center">
//             <FaUserCircle className="text-black shrink-0" size={26} />
//             <div className="min-w-0">
//               <div className="text-sm font-semibold text-black truncate">
//                 {user.companyName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Company"}
//               </div>
//               <div className="text-xs text-gray-500 truncate">{user.companyEmail || user.email}</div>
//             </div>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden absolute top-4 right-3 text-gray-400 hover:text-black"
//           >
//             <FaTimes size={18} />
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
//           {navItems.map((item, index) => {
//             const isActive =
//               item.path === "/inspection_company/dashboard"
//                 ? location.pathname === "/inspection_company/dashboard"
//                 : location.pathname.startsWith(item.path);
//             return (
//               <button
//                 key={index}
//                 onClick={() => { navigate(item.path); setSidebarOpen(false); }}
//                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer relative ${
//                   isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100 hover:text-black"
//                 }`}
//               >
//                 <span className="relative shrink-0">
//                   {item.icon}
//                   {item.notify > 0 && (
//                     <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
//                   )}
//                 </span>
//                 <span className="text-sm font-medium">{item.label}</span>
//                 {item.notify > 0 && (
//                   <span className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full ${
//                     isActive ? "bg-white text-black" : "bg-red-500 text-white"
//                   }`}>
//                     {item.notify}
//                   </span>
//                 )}
//               </button>
//             );
//           })}
//         </nav>

//         <div className="p-3 border-t border-gray-200">
//           <button
//             onClick={() => setShowLogoutConfirm(true)}
//             className="w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-red-600 hover:bg-red-50 text-sm font-semibold transition"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       <div className="flex-1 min-w-0">
//         <nav className="bg-white border-b border-gray-200 px-4 py-3.5 flex justify-between items-center sticky top-0 z-30">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-black cursor-pointer">
//               <FaBars size={20} />
//             </button>
//             <h1 className="text-lg font-semibold text-gray-900">{currentTab}</h1>
//           </div>
//           <div>
//             <CompanyWallet/>
//           </div>
//           <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
//             <span>Signed in as</span>
//             <span className="font-semibold text-gray-900">{user.firstName || user.companyName}</span>
//           </div>
//         </nav>

//         <main className="bg-gray-50 min-h-screen px-4 py-6">
//           <Outlet />
//         </main>
//       </div>

//       {sidebarOpen && (
//         <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}

//       {showLogoutConfirm && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
//           <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
//             <h2 className="text-lg font-semibold mb-1">Logout?</h2>
//             <p className="text-gray-500 text-sm mb-5">You'll need to sign in again to continue.</p>
//             <div className="flex gap-3">
//               <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-black rounded-xl font-semibold text-sm transition">
//                 Stay
//               </button>
//               <button
//                 onClick={() => { confirmLogoutAction(); setShowLogoutConfirm(false); }}
//                 className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyLayout;



























import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useFetchUser from "../../../hooks/useFetchUser";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import {
  LayoutDashboard, Gavel, LineChart, User, MessageCircle,
  History, Zap, Wallet, X, Receipt, Calendar, MapPin,
  Package, CheckCircle2, Clock
} from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUser } from "../../../redux/slice/userSlice";
import { useCompanyQuickNotifications } from "../../../hooks/QuickInspection/Usequicknotifications";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_MAP = {
  psi: "Pre-Shipment Inspection",
  loading: "Loading Supervision",
  stuffing: "Stuffing Supervision",
  destination: "Destination Inspection"
};

const EarningsDrawer = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!open || fetched) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspectionCompany/wallet`, { credentials: "include" });
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (_) {}
      finally { setLoading(false); setFetched(true); }
    })();
  }, [open]);

  const summary = data?.summary;
  const all = data?.transactions || [];
  const txns =
    filter === "all" ? all
    : filter === "pending" ? all.filter((t) => !t.companyPaidOut)
    : all.filter((t) => t.companyPaidOut);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Wallet size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900"> Wallet</p>
                  <p className="text-xs text-gray-400"> Quick inspection revenue</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
              >
                <X size={17} className="text-gray-500" />
              </button>
            </div>

            <div className="bg-emerald-700 px-5 py-5 text-white">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-white/10 rounded w-24" />
                  <div className="h-8 bg-white/10 rounded w-36 mb-3" />
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 bg-white/10 rounded-xl" />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-emerald-300 uppercase tracking-widest mb-1">Total Earned</p>
                  <p className="text-[28px] font-black tracking-tight">
                    &#8377;{Number(summary?.totalEarned || 0).toLocaleString("en-IN")}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-white/10 rounded-xl px-2 py-2.5">
                      <p className="text-xs text-emerald-300 mb-0.5">Jobs</p>
                      <p className="text-base font-bold">{summary?.totalTransactions || 0}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl px-2 py-2.5">
                      <p className="text-xs text-emerald-300 mb-0.5">Pending</p>
                      <p className="text-base font-bold">
                        &#8377;{Number(summary?.pendingPayout || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-xl px-2 py-2.5">
                      <p className="text-xs text-emerald-300 mb-0.5">Paid Out</p>
                      <p className="text-base font-bold">
                        &#8377;{Number(summary?.completedPayout || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-2.5 bg-white/10 rounded-xl text-xs text-emerald-200">
                    Payouts processed within <strong>24 hrs</strong> after inspection completion.
                    Keep bank details updated in Account Settings.
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-1 px-4 py-2.5 border-b border-gray-100 bg-gray-50">
              {[
                { id: "all", label: "All" },
                { id: "pending", label: "Pending" },
                { id: "paid", label: "Paid Out" }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    filter === f.id ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="divide-y divide-gray-50">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 px-5 py-4 animate-pulse">
                      <div className="w-9 h-9 bg-gray-100 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-100 rounded w-3/5" />
                        <div className="h-2.5 bg-gray-100 rounded w-2/5" />
                      </div>
                      <div className="w-16 h-3 bg-gray-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : txns.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-56 text-center px-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                    <Receipt size={20} className="text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-700 text-sm">No earnings yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Confirmed inspection earnings will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {txns.map((t) => (
                    <div key={t._id} className="px-5 py-4 hover:bg-gray-50/60 transition">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                            <Zap size={14} className="text-gray-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate max-w-[160px]">
                              {SERVICE_MAP[t.service] || t.service}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">
                              {t.customer?.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-emerald-700">
                            +{t.currency}{Number(t.companyEarnings).toLocaleString("en-IN")}
                          </p>
                          <div
                            className={`flex items-center justify-end gap-1 text-xs font-semibold mt-0.5 ${
                              t.companyPaidOut ? "text-green-600" : "text-amber-600"
                            }`}
                          >
                            {t.companyPaidOut ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                            {t.companyPaidOut ? "Paid Out" : "Pending"}
                          </div>
                        </div>
                      </div>
                      <div className="ml-[42px] space-y-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Package size={10} />{t.commodity}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={10} />{t.location?.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {new Date(t.paidAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-mono">{t.invoiceNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CompanyLayout = () => {
  useFetchUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s?.user?.user);
  const pendingCount = useCompanyQuickNotifications();

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/inspection_company/dashboard" },
    {
      label: "Quick Inspection",
      icon: <Zap size={20} />,
      path: "/inspection_company/quick-inspection",
      notify: pendingCount
    },
    { label: "Bidding Room", icon: <Gavel size={20} />, path: "/inspection_company/bidding" },
    { label: "Chat with Customer", icon: <MessageCircle size={20} />, path: "/inspection_company/customersList" },
    { label: "Bid History", icon: <History size={20} />, path: "/inspection_company/history" },
    { label: "Detail Analysis", icon: <LineChart size={20} />, path: "/inspection_company/analysis" },
    { label: "My Account", icon: <User size={20} />, path: "/inspection_company/account" },
  ];

  const currentTab = (() => {
    const found = navItems.find((item) =>
      item.path === "/inspection_company/dashboard"
        ? location.pathname === "/inspection_company/dashboard"
        : location.pathname.startsWith(item.path)
    );
    return found?.label || "Dashboard";
  })();

  const confirmLogoutAction = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
      const data = await response.json().catch(() => ({ message: "Logged out" }));
      toast.success(data.message || "Logged out");
      dispatch(removeUser());
    } catch {
      toast.error("Logout failed");
    } finally {
      navigate("/");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-5 border-b border-gray-200 relative">
          <div className="flex gap-3 items-center">
            <FaUserCircle className="text-black shrink-0" size={26} />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-black truncate">
                {user.companyName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Company"}
              </div>
              <div className="text-xs text-gray-500 truncate">{user.companyEmail || user.email}</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-3 text-gray-400 hover:text-black"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item, index) => {
            const isActive =
              item.path === "/inspection_company/dashboard"
                ? location.pathname === "/inspection_company/dashboard"
                : location.pathname.startsWith(item.path);
            return (
              <button
                key={index}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer relative ${
                  isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <span className="relative shrink-0">
                  {item.icon}
                  {item.notify > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                  )}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
                {item.notify > 0 && (
                  <span
                    className={`ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white text-black" : "bg-red-500 text-white"
                    }`}
                  >
                    {item.notify}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-red-600 hover:bg-red-50 text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-black cursor-pointer"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{currentTab}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setWalletOpen(true)}
              title="Quick Inspection Revenue"
              className="p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer group"
            >
              <Wallet size={21} className="text-gray-600 group-hover:text-emerald-600 transition-colors" />
            </button>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-xs text-gray-500">Signed in as</span>
              <span className="text-xs font-semibold text-gray-900">
                {user.firstName || user.companyName}
              </span>
            </div>
          </div>
        </nav>

        <main className="bg-gray-50 min-h-screen px-4 py-6">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <EarningsDrawer open={walletOpen} onClose={() => setWalletOpen(false)} />

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <h2 className="text-lg font-semibold mb-1">Logout?</h2>
            <p className="text-gray-500 text-sm mb-5">You'll need to sign in again to continue.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-black rounded-xl font-semibold text-sm transition cursor-pointer"
              >
                Stay
              </button>
              <button
                onClick={() => { confirmLogoutAction(); setShowLogoutConfirm(false); }}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyLayout;