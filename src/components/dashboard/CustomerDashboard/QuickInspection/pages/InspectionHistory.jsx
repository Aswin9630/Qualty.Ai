import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";

const InspectionHistory = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/inspectionCompany/customer-requests`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setRequests(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Inspection Requests</h2>
      {requests.map(r => (
        <div key={r._id} className="border rounded-xl p-4 bg-white">
          <div className="font-semibold">{r.company?.name}</div>
          <div>Service: {r.service}</div>
          <div>Commodity: {r.commodity}</div>
          <div>Date: {new Date(r.inspectionDate).toLocaleDateString()}</div>
          <div className={`mt-2 font-semibold ${
            r.status === "accepted"
              ? "text-green-600"
              : r.status === "rejected"
              ? "text-red-600"
              : "text-yellow-600"
          }`}>
            {r.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InspectionHistory;
