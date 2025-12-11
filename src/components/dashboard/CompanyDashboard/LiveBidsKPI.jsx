import { Signal } from "lucide-react";

export default function LiveBidsKPI() {
  return (
    <div className="bg-white text-black border border-gray-300 rounded-xl p-5 shadow-sm flex justify-between items-center transition-all duration-200 hover:shadow-md">
      <div>
        <p className="text-sm text-gray-500 font-semibold mb-1">Live Bids</p>
        <h2 className="text-3xl font-semibold">4</h2>
        <p className="text-gray-400 text-xs mt-1">↓ 5.1% from last period</p>
      </div>
      <Signal size={28} className="text-gray-500" />
    </div>
  );
}