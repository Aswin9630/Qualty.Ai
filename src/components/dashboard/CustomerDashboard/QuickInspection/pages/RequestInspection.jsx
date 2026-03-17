import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../../utils/constants";

const RequestInspection = ({ companyId }) => {
  const [form, setForm] = useState({
    service: "",
    commodity: "",
    inspectionDate: ""
  });
  const [loading, setLoading] = useState(false);

  const submitRequest = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/inspectionCompany/inspection-request/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, companyId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Inspection request sent");
      setForm({ service: "", commodity: "", inspectionDate: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white border rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Request Inspection</h2>
      <form onSubmit={submitRequest} className="space-y-4">
        <select
          required
          value={form.service}
          onChange={e => setForm({ ...form, service: e.target.value })}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select service</option>
          <option value="psi">PSI</option>
          <option value="loading">Loading</option>
          <option value="stuffing">Stuffing</option>
          <option value="destination">Destination</option>
        </select>

        <input
          required
          placeholder="Commodity"
          value={form.commodity}
          onChange={e => setForm({ ...form, commodity: e.target.value })}
          className="w-full border rounded-lg p-3"
        />

        <input
          required
          type="date"
          value={form.inspectionDate}
          onChange={e => setForm({ ...form, inspectionDate: e.target.value })}
          className="w-full border rounded-lg p-3"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Sending..." : "Request Inspection"}
        </button>
      </form>
    </div>
  );
};

export default RequestInspection;
