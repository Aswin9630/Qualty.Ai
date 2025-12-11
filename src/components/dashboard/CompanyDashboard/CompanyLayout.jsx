import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useFetchUser from "../../../hooks/useFetchUser";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { LayoutDashboard, Gavel, LineChart, User, MessageCircle, History, CreditCard } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUser } from "../../../redux/slice/userSlice";

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard />, path: "/inspection_company/dashboard" },
  { label: "Bidding Room", icon: <Gavel />, path: "/inspection_company/bidding" },
  { label: "Chat with Customer", icon: <MessageCircle />, path: "/inspection_company/customersList" },
  { label: "Bid History", icon: <History />, path: "/inspection_company/history" },
  // { label: "Payments", icon: <CreditCard />, path: "/inspection_company/payments" },
  { label: "Detail Analysis", icon: <LineChart />, path: "/inspection_company/analysis" },
  { label: "My Account", icon: <User />, path: "/inspection_company/account" },
];

const CompanyLayout = () => {
  useFetchUser(); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s?.user?.user);

  const currentTab = (() => {
    const found = navItems.find((item) =>
      item.path === "/inspection_company/dashboard"
        ? location.pathname === "/inspection_company/dashboard"
        : location.pathname.startsWith(item.path)
    );
    return found?.label || "Dashboard";
  })();

  const handleLogout = () => setShowLogoutConfirm(true);

  const confirmLogoutAction = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json().catch(() => ({ message: "Logged out" }));
      toast.success(data.message || "Logged out");
      dispatch(removeUser());
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      navigate("/");
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading user...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-6 border-b border-gray-200 relative">
          <div className="flex gap-3 items-center">
            <FaUserCircle className="text-black" size={28} />
            <div>
              <div className="text-sm font-semibold text-black">{user.companyName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Company"}</div>
              <div className="text-xs text-gray-500">{user.companyEmail || user.email}</div>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-3 right-2 text-gray-500 hover:text-black"
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive =
              item.path === "/inspection_company/dashboard"
                ? location.pathname === "/inspection_company/dashboard"
                : location.pathname.startsWith(item.path);
            return (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg transition-all ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <nav className="bg-white border-b border-gray-200 text-black p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 text-gray-600 hover:text-black cursor-pointer" aria-label="Open sidebar">
              <FaBars size={22} />
            </button>
            <h1 className="text-xl font-semibold">{currentTab}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700 hidden sm:block">Signed in as <strong>{user.firstName || user.companyName}</strong></div>
          </div>
        </nav>

        <main className="px-4 py-6 bg-white min-h-screen">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white border border-gray-300 rounded-xl p-6 w-full max-w-sm text-center shadow-xl animate-fade-in">
            <h2 className="text-lg font-semibold text-black mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  confirmLogoutAction();
                  setShowLogoutConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold"
              >
                Yes, Logout
              </button>
              <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold">
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CompanyLayout;
