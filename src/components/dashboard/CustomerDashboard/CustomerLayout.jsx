import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useFetchUser from "../../../hooks/useFetchUser";
import {
  LayoutDashboard,
  HelpCircle,
  Gavel,
  MessageCircle,
  LineChart, 
  CreditCard,
  History,
  User,
  Home,
  Menu,
  X,
  UserCircle,
} from "lucide-react";

import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeUser } from "../../../redux/slice/userSlice";

const navItems = [
  { label: "Home", icon: <Home size={25} />, path: "/" },
  { label: "Dashboard", icon: <LayoutDashboard size={25} />, path: "/customer/dashboard" },
  { label: "Raise Enquiry", icon: <HelpCircle size={25} />, path: "/customer/raiseEnquiry" },
  { label: "Bidding Room", icon: <Gavel size={25} />, path: "/customer/bidding" },
  { label: "Inspection Chat Room", icon: <MessageCircle size={25} />, path: "/customer/inspectorList" },
  { label: "Detail Analysis", icon: <LineChart size={25} />, path: "/customer/analysis" },
  { label: "Payments", icon: <CreditCard size={25} />, path: "/customer/payments" },
  { label: "My History", icon: <History size={25} />, path: "/customer/history" },
  { label: "My Account", icon: <User size={25} />, path: "/customer/account" },
];

const CustomerLayout = () => {
  useFetchUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

 const currentTab = navItems.find((item) =>
  item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
)?.label;


  const confirmLogoutAction = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message);
      dispatch(removeUser());
    } catch (error) {
      toast.error("Logout failed");
    }
    navigate("/");
  };

  if (!user) {
    navigate("/");
    return (
      <div className="text-center py-10 text-gray-500">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-2 items-center">
            <UserCircle className="text-black text-2xl" />
            <h2 className="text-xl font-bold">{user.name}</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-3 right-2 text-gray-500 hover:text-black"
          >
            <X className="w-5 h-5"/>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.includes(item.path);
            return (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg transition-all ${
  isActive
    ? "bg-black text-white"
    : "text-gray-700 hover:bg-gray-100 hover:text-black"
}`}
           >
                <span className="text-lg">{item.icon}</span>
                <span className="text-lg font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-100 hover:text-red-700"
          >
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <nav className="bg-white border-b border-gray-200 text-black p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 text-gray-600 hover:text-black cursor-pointer"
            >
              <Menu />
            </button>
            <h1 className="text-xl font-semibold">
              {currentTab || "Dashboard"}
            </h1>
          </div>
        </nav>

        <main className="px-2 bg-white min-h-screen">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white border border-gray-300 rounded-xl p-6 w-full max-w-sm text-center shadow-xl animate-fade-in">
            <h2 className="text-lg font-semibold text-black mb-4">
              Are you sure you want to logout?
            </h2>
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
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold"
              >
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomerLayout;


// import React, { useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import useFetchUser from "../../../hooks/useFetchUser";
// import {
//   LayoutDashboard,
//   HelpCircle,
//   Gavel,
//   MessageCircle,
//   LineChart,
//   CreditCard,
//   History,
//   User,
//   Home,
//   Menu,
//   X,
//   UserCircle,
// } from "lucide-react";

// import { BASE_URL } from "../../../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { removeUser } from "../../../redux/slice/userSlice";

// const navItems = [
//   { label: "Home", icon: <Home size={25} />, path: "/" },
//   { label: "Dashboard", icon: <LayoutDashboard size={25} />, path: "/customer/dashboard" },
//   { label: "Raise Enquiry", icon: <HelpCircle size={25} />, path: "/customer/raiseEnquiry" },
//   { label: "Bidding Room", icon: <Gavel size={25} />, path: "/customer/bidding" },
//   { label: "Inspection Chat Room", icon: <MessageCircle size={25} />, path: "/customer/inspectorList" },
//   { label: "Detail Analysis", icon: <LineChart size={25} />, path: "/customer/analysis" },
//   { label: "Payments", icon: <CreditCard size={25} />, path: "/customer/payments" },
//   { label: "My History", icon: <History size={25} />, path: "/customer/history" },
//   { label: "My Account", icon: <User size={25} />, path: "/customer/account" },
// ];

// const SIDEBAR_WIDTH_CLASS = "w-72"; // change to adjust width; keep synced with lg:ml-72 below

// const CustomerLayout = () => {
//   useFetchUser();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state?.user?.user);

//   const currentTab = navItems.find((item) =>
//     item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path)
//   )?.label;

//   const confirmLogoutAction = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//       const data = await response.json();
//       toast.success(data.message);
//       dispatch(removeUser());
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//     navigate("/");
//   };

//   if (!user) {
//     navigate("/");
//     return (
//       <div className="text-center py-10 text-gray-500">
//         Loading user details...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white text-black flex">
//       {/* Sidebar: fixed left, full viewport height, scrollable nav */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 ${SIDEBAR_WIDTH_CLASS} bg-white border-r border-gray-200 shadow-lg transform
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           transition-transform duration-300 ease-in-out
//           lg:translate-x-0 lg:static lg:inset-0`}
//         style={{ display: "flex", flexDirection: "column", height: "100vh" }}
//       >
//         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//           <div className="flex gap-2 items-center">
//             <UserCircle className="text-black text-2xl" />
//             <h2 className="text-xl font-bold">{user.name}</h2>
//           </div>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden text-gray-500 hover:text-black"
//             aria-label="Close menu"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* scrollable nav inside sidebar */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//           {navItems.map((item, index) => {
//             const isActive =
//               item.path === "/"
//                 ? location.pathname === "/"
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
//             onClick={() => setShowLogoutConfirm(true)}
//             className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-100 hover:text-red-700"
//           >
//             <span className="text-sm font-semibold">Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main column: shifted for large screens, header sticky, content scrolls */}
//       <div className={`flex-1 flex flex-col min-h-screen lg:ml-72`}>
//         <nav className="bg-white border-b border-gray-200 text-black p-4 flex items-center justify-between sticky top-0 z-20">
//           <div className="flex items-center">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden mr-4 text-gray-600 hover:text-black cursor-pointer"
//               aria-label="Open menu"
//             >
//               <Menu />
//             </button>
//             <h1 className="text-xl font-semibold">{currentTab || "Dashboard"}</h1>
//           </div>
//         </nav>

//         {/* Content area: scrollable only */}
//         <main className="flex-1 overflow-auto bg-white p-4">
//           <div className="max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* mobile overlay for sidebar */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* logout modal */}
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
//               <button
//                 onClick={() => setShowLogoutConfirm(false)}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded font-semibold"
//               >
//                 No, Stay
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CustomerLayout;

