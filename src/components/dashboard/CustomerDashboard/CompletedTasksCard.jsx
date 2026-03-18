import useDashboardStats from "../../../hooks/useDashboardStats";
import { Link } from "react-router-dom";

export default function CompletedTasksCard() {
  const stats = useDashboardStats();

  return (
    <Link to="/customer/history" className="block group">
      <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold text-emerald-600 tracking-wide uppercase">Done</span>
            </div>
          </div>

          <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1">Completed</p>
          <p className="text-3xl font-bold text-gray-900 tabular-nums mb-4">
            {stats?.completedTasks || 0}
          </p>
        </div>
      </div>
    </Link>
  );
}