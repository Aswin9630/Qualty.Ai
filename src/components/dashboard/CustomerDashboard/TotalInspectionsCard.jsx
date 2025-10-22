import useDashboardStats from "../../../hooks/useDashboardStats";
import {Link} from "react-router-dom"

export default function TotalInspectionsCard() {
  const stats = useDashboardStats();

  return (
     <Link to="/customer/analysis">
    <div className="bg-white text-black rounded-xl border border-gray-200 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-gray-600">Total Inspections</h3>
      <p className="text-2xl sm:text-3xl font-semibold tracking-tight">{stats?.totalInspections || 0}</p>
      <p  className="text-sm font-medium text-black mt-4 inline-block hover:underline hover:text-gray-800 transition duration-200 cursor-pointer">View Analysis →</p>
    </div>
      </Link>
  );
}
