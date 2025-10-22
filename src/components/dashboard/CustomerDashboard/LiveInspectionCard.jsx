import React from "react";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom"

export default function LiveInspectionCard() {
  return (
    <div className="bg-white text-black rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
    <Link to="/customer/history">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full">
          <FaSearch className="text-xl" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Live Inspection</h3>
          <p className="text-sm text-gray-600">
            Monitor ongoing inspections in real-time.
          </p>
        </div>
      </div>
    </Link>
    </div>
  );
}
