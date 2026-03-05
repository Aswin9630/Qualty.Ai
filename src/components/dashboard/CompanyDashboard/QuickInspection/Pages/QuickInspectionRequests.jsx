import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../../utils/constants";

const QuickInspectionRequests = () => {
  const [requests, setRequests] = useState([]);

  const load = () => {
    fetch(`${BASE_URL}/inspectionCompany/company-requests`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setRequests(data.data || []));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/update-request/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Updated");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Quick Inspection Requests</h2>
      {requests.map(r => (
        <div key={r._id} className="border rounded-xl p-4 bg-white">
          <div className="font-semibold">{r.customer?.name}</div>
          <div>{r.customer?.email}</div>
          <div>Service: {r.service}</div>
          <div>Commodity: {r.commodity}</div>
          <div>Date: {new Date(r.inspectionDate).toLocaleDateString()}</div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => updateStatus(r._id, "accepted")}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus(r._id, "rejected")}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Reject
            </button>
          </div>

          <div className="mt-2 font-semibold">{r.status}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickInspectionRequests;
