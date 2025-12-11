import { Clock } from "lucide-react";

export default function ActiveBidsKPI() {
  return (
    <div className="bg-white text-black border border-gray-300 rounded-xl p-5 shadow-sm flex justify-between items-center transition-all duration-200 hover:shadow-md">
      <div>
        <p className="text-sm text-gray-500 font-semibold  mb-1">Active Bids</p>
        <h2 className="text-3xl font-semibold">8</h2>
        <p className="text-gray-400 text-xs mt-1">↑ 1.3% from last period</p>
      </div>
      <div className="p-2 rounded-lg border border-gray-300 text-gray-500 transition-colors duration-200 hover:bg-gray-100">
        <Clock size={22} />
      </div>
    </div>
  );
}