import { Pencil } from "lucide-react";

export default function CompletedBidsCard() {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center text-gray-900">
      <div>
        <p className="text-sm font-semibold text-gray-600 uppercase mb-1">Completed</p>
        <h2 className="text-3xl font-semibold text-gray-900">2</h2>
        <p className="text-xs text-gray-500 mt-1">Bids successfully closed</p>
      </div>
      <Pencil size={26} className="text-gray-800" />
    </div>
  );
}