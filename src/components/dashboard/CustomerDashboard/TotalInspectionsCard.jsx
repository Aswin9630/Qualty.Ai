// import useDashboardStats from "../../../hooks/useDashboardStats";
// import {Link} from "react-router-dom"

// export default function TotalInspectionsCard() {
//   const stats = useDashboardStats();

//   return (
//      <Link to="/customer/analysis">
//     <div className="bg-white text-black rounded-xl border border-gray-200 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//       <h3 className="text-sm font-semibold text-gray-600">Total Inspections</h3>
//       <p className="text-2xl sm:text-3xl font-semibold tracking-tight">{stats?.totalInspections || 0}</p>
//       <p  className="text-sm font-medium text-black mt-4 inline-block hover:underline hover:text-gray-800 transition duration-200 cursor-pointer">View Analysis →</p>
//     </div>
//       </Link>
//   );
// }



import useDashboardStats from "../../../hooks/useDashboardStats";
import { Link } from "react-router-dom";

export default function TotalInspectionsCard() {
  const stats = useDashboardStats();

  return (
    <Link to="/customer/analysis" className="block group">
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              <span className="text-[10px] font-semibold text-violet-600 tracking-wide uppercase">All Time</span>
            </div>
          </div>

          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1">Total Inspections</p>
          <p className="text-3xl font-bold text-gray-900 tabular-nums mb-4">
            {stats?.totalInspections || 0}
          </p>
        </div>
      </div>
    </Link>
  );
}