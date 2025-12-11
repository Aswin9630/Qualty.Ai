import { RotateCcw } from "lucide-react";

export default function TotalBidsCard() {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center text-gray-900">
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Total Bids</p>
        <h2 className="text-3xl font-semibold text-gray-900">6</h2>
        <p className="text-xs text-gray-500 mt-1">Active bids this month</p>
      </div>
      <RotateCcw size={26} className="text-gray-800" />
    </div>
  );
}