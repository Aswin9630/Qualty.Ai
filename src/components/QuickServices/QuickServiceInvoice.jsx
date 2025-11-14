// src/pages/QuickServiceInvoice.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

function formatCurrencyMajor(amount, currency = "INR") {
  if (amount == null) return "-";
  const v = Number(amount || 0);
  if (currency === "USD") return `$${v.toFixed(2)}`;
  return `₹${v.toFixed(2)}`;
}
function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function QuickServiceInvoice() {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const printRef = useRef();

  useEffect(() => {
    if (!paymentId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/quickService/invoice/${paymentId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch invoice");
        setInvoice(data.invoice);
      } catch (err) {
        console.error("fetch invoice error:", err);
        setError(err.message || "Unable to load invoice");
      } finally {
        setLoading(false);
      }
    })();
  }, [paymentId]);

  const handlePrint = () => {
    const printContents = printRef.current?.innerHTML;
    if (!printContents) return;
    const popup = window.open("", "_blank", "width=900,height=700");
    const html = `
      <html>
        <head>
          <title>Invoice - Qualty.ai</title>
          <style>
            body { font-family: Inter, Arial, sans-serif; color: #111827; padding: 20px; }
            h1,h2,h3 { margin: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th,td { padding: 8px 6px; border: 1px solid #e5e7eb; text-align: left; }
            .right { text-align: right; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;
    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    popup.focus();
    setTimeout(() => popup.print(), 600);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="w-full max-w-3xl mx-auto">
          <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-red-600">Unable to load invoice</h3>
            <p className="text-sm text-gray-600 mt-2">{error}</p>
            <div className="mt-4">
              <button onClick={() => navigate(-1)} className="px-4 py-2 bg-black text-white rounded">Back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { company, customer, payment, order, items, totals } = invoice;

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-2xl font-bold">{company?.name || "Qualty.ai"}</div>
            <div className="text-sm text-gray-600 mt-1">{company?.address}</div>
            <div className="text-sm text-gray-600">{company?.email} • {company?.phone}</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Invoice</div>
            <div className="text-lg font-semibold">#{payment?.razorpay_payment_id || payment?.id || payment?.razorpay_order_id}</div>
            <div className="text-sm text-gray-500 mt-1">{fmtDate(payment?.capturedAt || payment?.createdAt)}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-sm text-gray-500">Bill to</div>
            <div className="text-sm font-medium">{customer?.name}</div>
            <div className="text-xs text-gray-500">{customer?.email}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Payment</div>
            <div className="text-sm font-medium">{payment?.razorpay_payment_id}</div>
            <div className="text-xs text-gray-500">Order: {payment?.razorpay_order_id}</div>
            <div className="text-xs text-gray-500">Status: {payment?.status}</div>
          </div>
        </div>

        <div ref={printRef}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "60%" }}>Description</th>
                <th>Qty</th>
                <th>Unit</th>
                <th className="right">Unit Price</th>
                <th className="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={idx}>
                  <td>{it.description}</td>
                  <td>{it.quantity || 1}</td>
                  <td>{it.unit || "-"}</td>
                  <td className="right">{formatCurrencyMajor(it.unitPriceMajor, it.currency || totals.currency)}</td>
                  <td className="right">{formatCurrencyMajor(it.totalMajor, it.currency || totals.currency)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="right" style={{ fontWeight: 600 }}>Subtotal</td>
                <td className="right">{formatCurrencyMajor(totals.subtotal, totals.currency)}</td>
              </tr>
              <tr>
                <td colSpan="4" className="right">Tax</td>
                <td className="right">{formatCurrencyMajor(totals.tax, totals.currency)}</td>
              </tr>
              <tr>
                <td colSpan="4" className="right" style={{ fontWeight: 700 }}>Total</td>
                <td className="right" style={{ fontWeight: 700 }}>{formatCurrencyMajor(totals.total, totals.currency)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="mt-6 text-sm text-gray-600">
            <div>Company: <strong>{company?.name}</strong></div>
            <div>Contact: {company?.email} • {company?.phone}</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Back</button>
          <button onClick={handlePrint} className="px-4 py-2 bg-black text-white rounded">Print / Download</button>
        </div>
      </div>
    </div>
  );
}
