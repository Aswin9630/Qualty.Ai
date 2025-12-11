import { DollarSign } from "lucide-react";

export default function RevenueEarnedKPI() {
  return (
    <div className="bg-white text-black border border-gray-300 rounded-xl p-5 shadow-sm flex justify-between items-center transition-all duration-200 hover:shadow-md">
      <div>
        <p className="text-sm text-gray-500 font-semibold  mb-1">Revenue Earned</p>
        <h2 className="text-3xl font-semibold">$18,500</h2>
        <p className="text-gray-400 text-xs mt-1">↑ 8.3% from last period</p>
      </div>
      <DollarSign size={28} className="text-gray-500" />
    </div>
  );
}