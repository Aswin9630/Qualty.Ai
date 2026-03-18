import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useFetchUser from "../../../hooks/useFetchUser";
import {
  LayoutDashboard, HelpCircle, Gavel, MessageCircle, LineChart,
  CreditCard, History, User, Home, Menu, X, UserCircle,
  ShoppingCart, Zap, Wallet, Receipt, Calendar, MapPin, Package, BadgePercent
} from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUser } from "../../../redux/slice/userSlice";
import { useCustomerQuickNotifications } from "../../../hooks/QuickInspection/Usequicknotifications";
import { motion, AnimatePresence } from "framer-motion";

const SERVICE_MAP = {
  psi: "Pre-Shipment Inspection",
  loading: "Loading Supervision",
  stuffing: "Stuffing Supervision",
  destination: "Destination Inspection"
};

const WalletDrawer = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!open || fetched) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/quickInspection/wallet`, { credentials: "include" });
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (_) {}
      finally { setLoading(false); setFetched(true); }
    })();
  }, [open]);

  const summary = data?.summary;
  const txns = data?.transactions || [];

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
                <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
                  <Wallet size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">My Wallet</p>
                  <p className="text-xs text-gray-400">Inspection payment history</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
              >
                <X size={17} className="text-gray-500" />
              </button>
            </div>

            <div className="bg-gray-900 px-5 py-5 text-white">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-white/10 rounded w-28" />
                  <div className="h-8 bg-white/10 rounded w-44 mb-3" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-14 bg-white/10 rounded-xl" />
                    <div className="h-14 bg-white/10 rounded-xl" />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Spent</p>
                  <p className="text-[28px] font-black tracking-tight">
                    &#8377;{Number(summary?.totalSpent || 0).toLocaleString("en-IN")}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-white/10 rounded-xl px-3 py-2.5">
                      <p className="text-xs text-gray-400 mb-0.5">Payments</p>
                      <p className="text-base font-bold">{summary?.totalTransactions || 0}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl px-3 py-2.5">
                      <p className="text-xs text-gray-400 mb-0.5">GST Paid</p>
                      <p className="text-base font-bold">
                        &#8377;{Number(summary?.totalGstPaid || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </>
              )}
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
                      <div className="w-14 h-3 bg-gray-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : txns.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-56 text-center px-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                    <Receipt size={20} className="text-gray-400" />
                  </div>
                  <p className="font-semibold text-gray-700 text-sm">No transactions yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Completed inspection payments will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {txns.map((t) => {
                    const isIndia = t.currency === "₹";
                    return (
                      <div key={t._id} className="px-5 py-4 hover:bg-gray-50/60 transition">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                              <Zap size={14} className="text-gray-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 leading-tight truncate max-w-[170px]">
                                {SERVICE_MAP[t.service] || t.service}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[170px]">
                                {t.company?.companyName}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-gray-900">
                              {t.currency}{Number(t.totalAmount).toLocaleString("en-IN")}
                            </p>
                            <p className="text-xs text-green-600 font-semibold mt-0.5">Paid</p>
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
                          {isIndia && t.gstAmount > 0 && (
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <BadgePercent size={10} />
                                Base: {t.currency}{Number(t.baseAmount).toLocaleString("en-IN")}
                              </span>
                              <span>+ GST: {t.currency}{Number(t.gstAmount).toLocaleString("en-IN")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CustomerLayout = () => {
  useFetchUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const cartItems = useSelector((state) => state?.cart?.items || []);
  const hasQuickNotif = useCustomerQuickNotifications();

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/customer/dashboard" },
    { label: "Raise Enquiry", icon: <HelpCircle size={22} />, path: "/customer/raiseEnquiry" },
    { label: "Bidding Room", icon: <Gavel size={22} />, path: "/customer/bidding" },
    {
      label: "Quick Inspection",
      icon: <Zap size={22} />,
      path: "/customer/quick-inspection",
      notify: hasQuickNotif
    },
    { label: "Inspection Chat Room", icon: <MessageCircle size={22} />, path: "/customer/inspectorList" },
    { label: "Detail Analysis", icon: <LineChart size={22} />, path: "/customer/analysis" },
    { label: "Payments", icon: <CreditCard size={22} />, path: "/customer/payments" },
    { label: "History", icon: <History size={22} />, path: "/customer/history" },
    { label: "Profile", icon: <User size={22} />, path: "/customer/account" },
  ];

  const currentTab = navItems.find((item) =>
    item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
  )?.label;

  useEffect(() => {
    if (user && user.role && user.role !== "customer") {
      toast.info("Access restricted to customers only");
      navigate("/");
    }
  }, [user]);

  const confirmLogoutAction = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
      const data = await response.json().catch(() => ({}));
      if (data?.message) toast.success(data.message);
      dispatch(removeUser());
    } catch {
      toast.error("Logout failed");
    }
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
          <div className="flex gap-2.5 items-center">
            <UserCircle className="text-black" size={28} />
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">{user.name}</h2>
              <p className="text-xs text-gray-500 truncate max-w-[140px]">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-3 text-gray-400 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map((item, index) => {
            const isActive =
              item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
            return (
              <button
                key={index}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <span className="relative shrink-0">
                  {item.icon}
                  {item.notify && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                  )}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
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
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{currentTab || "Dashboard"}</h1>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setWalletOpen(true)}
              title="My Wallet"
              className="p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer group"
            >
              <Wallet size={21} className="text-gray-600 group-hover:text-black transition-colors" />
            </button>
            <button
              onClick={() => navigate("/customer/cart")}
              title="Cart"
              className="relative p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
            >
              <ShoppingCart size={21} className="text-gray-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/customer/orders")}
              title="Orders"
              className="p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer"
            >
              <History size={21} className="text-gray-600" />
            </button>
          </div>
        </nav>

        <main className="bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <WalletDrawer open={walletOpen} onClose={() => setWalletOpen(false)} />

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <h2 className="text-lg font-semibold mb-1">Logout?</h2>
            <p className="text-gray-500 text-sm mb-5">
              You'll need to sign in again to access your account.
            </p>
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

export default CustomerLayout;