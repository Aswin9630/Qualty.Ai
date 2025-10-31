import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useFetchUser from "../../../hooks/useFetchUser";
import {
FaBars, FaTimes,
  FaTachometerAlt,
  FaGavel,
  FaComments,
  FaUserCircle,
  FaChartLine,
  FaHeadset,
  FaUser,
  FaHistory,
  FaMoneyBillWave,
  FaQuestionCircle,
} from "react-icons/fa";
import { BASE_URL } from "../../../utils/constants";
import { useSelector } from "react-redux";

const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/company/dashboard" },
  { label: "Bidding Room", icon: <FaGavel />, path: "/company/bidding" },
  { label: "Bid History", icon: <FaHistory />, path: "/company/history" },
  { label: "Payments", icon: <FaMoneyBillWave />, path: "/company/payments" },
  { label: "Detail Analysis", icon: <FaChartLine />, path: "/company/analysis" },
  { label: "My Account", icon: <FaUser />, path: "/company/account" },
  { label: "Chat with Us", icon: <FaComments />, path: "/company/chat" },
];

const CompanyLayout = () => {
  useFetchUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
// const user = useSelector((state)=>state?.user?.user)

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
              });
              const data = await response.json()        
      } catch (error) {
        console.error("Error during logout:", error);       
      }
      navigate("/");
     }
   };

  const currentTab = navItems.find((item) =>
    location.pathname.includes(item.path)
  )?.label;

  // if (!user) {
  //   navigate("/")
  //   return <div className="text-center py-10 text-gray-400">Loading user details...</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gray-900 border-r border-gray-700 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex gap-2 items-center">

          <FaUserCircle  className="text-white text-2xl" />
          {/* <h2 className="text-xl font-bold text-white">{user.name}</h2> */}
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg transition-all ${
                location.pathname.includes(item.path)
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-left text-red-500 hover:bg-red-100 hover:text-red-700"
          >
            <span className="text-sm font-semibold ">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 ">
        <nav className="bg-gray-900 border-b border-gray-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 text-gray-300 hover:text-white"
            >
              <FaBars />
            </button>
            <h1 className="text-xl font-semibold">{currentTab || "Dashboard"}</h1>
          </div>
        </nav>

        <main className="p-6 bg-gray-900 min-h-screen">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CompanyLayout;