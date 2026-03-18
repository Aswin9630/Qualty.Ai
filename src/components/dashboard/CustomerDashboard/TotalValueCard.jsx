import useDashboardStats from "../../../hooks/useDashboardStats";
import { Link } from "react-router-dom";

export default function TotalValueCard() {
  const stats = useDashboardStats();

  return (
    <Link to="/customer/payments" className="block group">
      <div className="relative bg-gray-950 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] font-semibold text-white/70 tracking-wide uppercase">Paid</span>
            </div>
          </div>

          <p className="text-[11px] font-semibold tracking-widest text-white/40 uppercase mb-1">Total Amount Paid</p>
          {stats && (
            <p className="text-3xl font-bold text-white tabular-nums mb-4">
              {stats?.totalValue?.toLocaleString()}/-
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}