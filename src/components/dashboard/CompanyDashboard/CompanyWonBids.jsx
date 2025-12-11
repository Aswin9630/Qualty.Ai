import React, { useEffect, useState } from "react";
import { COMPANY_API } from "../../../utils/constants";

export default function CompanyWonBids() {
  const [bids, setBids] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${COMPANY_API}/won-bids`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) setBids(data.bids || []);
    })();
  }, []);
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Won Bids</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bids.map(b => (
            <div key={b._id} className="bg-white border rounded p-4">
              <p className="text-sm">{b.enquiry?.commodity}</p>
              <p className="text-sm">Amount: ₹{b.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
