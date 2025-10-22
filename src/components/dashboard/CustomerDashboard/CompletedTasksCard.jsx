import useDashboardStats from "../../../hooks/useDashboardStats";
import {Link} from "react-router-dom"

export default function CompletedTasksCard() {
  const stats = useDashboardStats();

  return (
    <div className="bg-white text-black rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-sm font-semibold text-gray-600 mb-1">Completed</h3>
      <p className="text-4xl font-semibold tracking-tight">{stats?.completedTasks}</p>
      <Link to="/customer/history"><p className="text-sm font-medium text-black mt-4 inline-block hover:underline hover:text-gray-800 transition duration-200 cursor-pointer"> View History →</p></Link>
    </div>
  );
}
