import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuickServicePayments from "../../hooks/useQuickServicePayments";
import { format } from "date-fns";

function fmtAmountSmallestToMajor(amountSmallest = 0, currency = "INR") {
  const major = Number(amountSmallest || 0) / 100;
  if (currency === "USD") return `$${major.toFixed(2)}`;
  return `₹${major.toFixed(2)}`;
}
function fmtDate(iso) {
  try {
    return format(new Date(iso), "dd MMM yyyy, hh:mm a");
  } catch {
    return iso;
  }
}

export default function PaymentsQuickServiceList() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { loading, items, page, pages, total, error, fetchPayments, setPage } = useQuickServicePayments();

  useEffect(() => {
    fetchPayments({ q: "", p: 1 });
  }, [fetchPayments]);

  useEffect(() => {
    // fetch when page changes
    fetchPayments({ q, p: page });
  }, [page]); // eslint-disable-line

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPayments({ q: q.trim(), p: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Quick Service Payments</h1>
            <p className="text-sm text-gray-500 mt-1">All payments made for Quick Service bookings with invoices.</p>
          </div>

          <form onSubmit={onSearch} className="flex gap-2 items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search order id or payment id"
              className="px-3 py-2 border rounded-md w-64 bg-white"
              aria-label="Search payments"
            />
            <button type="submit" className="px-3 py-2 bg-black text-white rounded-md">Search</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-md animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-600 p-4">{error}</div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No quick service payments found.</div>
          ) : (
            <>
              <div className="divide-y">
                {items.map((p) => (
                  <div key={p._id || p.razorpay_payment_id} className="py-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="w-56 min-w-0">
                          <div className="text-sm font-medium truncate">{p.metadata?.description || "Quick service payment"}</div>
                          <div className="text-xs text-gray-500 mt-1">Order: <span className="font-mono">{p.razorpay_order_id}</span></div>
                          <div className="text-xs text-gray-500">Payment: <span className="font-mono">{p.razorpay_payment_id}</span></div>
                        </div>

                        <div className="text-sm text-gray-600">
                          <div>Date</div>
                          <div className="mt-1">{fmtDate(p.createdAt)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <div className="font-semibold">{fmtAmountSmallestToMajor(p.amount, p.currency)}</div>
                      <div className={`text-xs mt-1 ${p.status === "captured" || p.status === "paid" ? "text-green-600" : "text-gray-500"}`}>
                        {p.status}
                      </div>

                      <div className="mt-3 flex gap-2 justify-end">
                        <button
                          onClick={() => navigate(`/quickService/invoice/${p._id}`)}
                          className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
                        >
                          View Invoice
                        </button>

                        <button
                          onClick={() => window.open(`${window.location.origin}/quickService/invoice/${p._id}`, "_blank")}
                          className="px-3 py-1 text-sm bg-black text-white rounded hover:opacity-95"
                        >
                          Open Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Showing {items.length} of {total} payments</div>
                <div className="flex gap-2 items-center">
                  <button disabled={page <= 1} onClick={() => setPage(Math.max(1, page - 1))} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
                  <div className="text-sm">Page {page} / {pages}</div>
                  <button disabled={page >= pages} onClick={() => setPage(Math.min(pages, page + 1))} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
