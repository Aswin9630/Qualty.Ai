import useDashboardStats from "../../../hooks/useDashboardStats";
import {Link} from "react-router-dom"

export default function TotalValueCard() {
  const stats = useDashboardStats();

  return (
    <Link to="/customer/payments">
    <div className="bg-white text-black rounded-xl border border-gray-200 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-gray-600">Total Amount Paid</h3>
      {stats && <p className="text-2xl sm:text-3xl font-semibold tracking-tight">
        ₹ {stats?.totalValue?.toLocaleString() } /-
      </p>}
    <p  className="text-sm font-medium text-black mt-4 inline-block hover:underline hover:text-gray-800 transition duration-200 cursor-pointer"> View Payments →</p>
    </div>
    </Link>
  );
}
