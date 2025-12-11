import { BarChart2 } from "lucide-react";

export default function TotalBidsKPI() {
  return (
    <div className="bg-white text-black border border-gray-300 rounded-xl p-5 shadow-sm flex justify-between items-center transition-all duration-200 hover:shadow-md">
      <div>
        <p className="text-sm text-gray-500 font-semibold  mb-1">Total Bids</p>
        <h2 className="text-3xl font-semibold">156</h2>
        <p className="text-gray-900 text-xs mt-1">↑ 5.2% from last period</p>
      </div>
      <BarChart2 size={28} className="text-gray-500" />
    </div>
  );
}