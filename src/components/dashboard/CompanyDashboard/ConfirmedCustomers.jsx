import React, { useEffect, useState } from "react";
import { COMPANY_API } from "../../../utils/constants";

export default function ConfirmedCustomers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`${COMPANY_API}/confirmed-customers`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) setCustomers(data.customers || []);
    })();
  }, []);
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Confirmed Customers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customers.map(c => (
            <div key={c.id} className="bg-white border rounded p-4">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-gray-500">{c.email}</p>
              <p className="text-sm">Order: {c.orderId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
