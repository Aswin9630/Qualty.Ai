import { Eye } from "lucide-react";

export default function ActiveBidsCard() {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Active Bids</p>
        <h2 className="text-3xl font-semibold text-gray-900">2</h2>
      </div>
      <button className="p-2 rounded-lg border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200">
        <Eye size={20} />
      </button>
    </div>
  );
}