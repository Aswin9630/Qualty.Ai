// import useDashboardStats from "../../../hooks/useDashboardStats";
// import {Link} from "react-router-dom"

// export default function ActiveOrdersCard() {
//   const stats = useDashboardStats();

//   return (
//       <Link to="/customer/bidding">
//     <div className="bg-white text-black rounded-xl border border-gray-200 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//       <h3 className="text-sm font-semibold text-gray-600 mb-1">Active Orders</h3>
//       <p className="text-2xl sm:text-3xl font-semibold tracking-tight">{stats?.activeOrders || 0}</p>
//       <p className="text-sm font-medium text-black mt-4 inline-block hover:underline hover:text-gray-800 transition duration-200 cursor-pointer"> Monitor Live →</p>

//     </div>
//       </Link>
//   );
// }




import useDashboardStats from "../../../hooks/useDashboardStats";
import { Link } from "react-router-dom";

export default function ActiveOrdersCard() {
  const stats = useDashboardStats();

  return (
    <Link to="/customer/bidding" className="block group">
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-100">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[10px] font-semibold text-sky-600 tracking-wide uppercase">Live</span>
            </div>
          </div>

          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1">Active Orders</p>
          <p className="text-3xl font-bold text-gray-900 tabular-nums mb-4">
            {stats?.activeOrders || 0}
          </p>
        </div>
      </div>
    </Link>
  );
}