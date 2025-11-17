import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import ConfirmModal from "../ConfirmModal";
import { useCart } from "../../hooks/useCart";
import { BASE_URL } from "../../utils/constants";

function formatCurrency(amount, currency = "INR") {
  if (amount == null || Number.isNaN(Number(amount))) return "-";
  const v = Number(amount);
  if (currency === "USD") return `$${v.toFixed(2)}`;
  return `₹${v.toFixed(2)}`;
}
function formatDateShort(iso) {
  return iso ? format(new Date(iso), "dd MMM yyyy") : "-";
}

function SkeletonCard({ lines = 3 }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-20 h-14 bg-gray-200 rounded" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
          {Array.from({ length: Math.max(0, lines - 2) }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-5/6 mb-2" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const navigate = useNavigate();
  const { items, fetchCart, deleteCartItemFromServer } = useCart();
  const user = useSelector((s) => s.user.user);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const [serverTotals, setServerTotals] = useState({
    subtotal: 0,
    tax: 0,
    total: 0,
    currency: "INR",
  });
  const [totalsLoading, setTotalsLoading] = useState(true);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        await fetchCart();
      } catch (err) {
        console.error("Cart load failed", err);
        if (!cancelled && mountedRef.current) setErrorMsg("Unable to load your cart");
      } finally {
        if (!cancelled && mountedRef.current) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [fetchCart]);

  const fetchServerTotals = async (opts = { showError: true }) => {
    setTotalsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/quickService/computeTotal`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (opts.showError && mountedRef.current) setErrorMsg(data?.error || "Failed to compute totals");
        setServerTotals((s) => ({ ...s, subtotal: 0, tax: 0, total: 0 }));
        return;
      }
      setServerTotals({
        subtotal: Number(data.subtotal || 0),
        tax: Number(data.tax || 0),
        total: Number(data.total || data.subtotal || 0),
        currency: data.currency || "INR",
      });
      if (mountedRef.current) setErrorMsg("");
    } catch (err) {
      console.error("computeTotal error:", err);
      if (opts.showError && mountedRef.current) setErrorMsg(err?.message || "Unable to compute totals");
      setServerTotals((s) => ({ ...s, subtotal: 0, tax: 0, total: 0 }));
    } finally {
      if (mountedRef.current) setTotalsLoading(false);
    }
  };

  useEffect(() => {
    if (!mountedRef.current) return;
    fetchServerTotals({ showError: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const enquiryItems = useMemo(() => (items || []).filter((it) => it.isEnquiry && !it.enquiryRaised), [items]);
  const pricedItems = useMemo(() => (items || []).filter((it) => !it.isEnquiry), [items]);
  const hasEnquiryPending = enquiryItems.length > 0;

  const clientSubtotal = useMemo(() => pricedItems.reduce((s, it) => s + Number(it.price || 0), 0), [pricedItems]);

  const clientCurrency = serverTotals.currency || pricedItems[0]?.currency || items[0]?.currency || "INR";

  const onRemoveClick = (id) => {
    setDeletingItemId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingItemId) return;
    setConfirmOpen(false);
    try {
      const res = await deleteCartItemFromServer(deletingItemId);
      if (res?.success) {
        if (mountedRef.current) {
          setSuccessMsg("Item removed");
          setTimeout(() => mountedRef.current && setSuccessMsg(""), 2000);
        }
        await fetchServerTotals({ showError: false });
      } else {
        if (mountedRef.current) setErrorMsg(res?.error || "Failed to remove item");
      }
    } catch (err) {
      if (mountedRef.current) setErrorMsg(err.message || "Failed to remove item");
    } finally {
      setDeletingItemId(null);
    }
  };

  const raiseEnquiry = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!hasEnquiryPending) return;
    setProcessing(true);
    setErrorMsg("");
    try {
      const payload = {
        items: enquiryItems.map((it) => ({
          cartItemId: it._id,
          serviceType: it.serviceType,
          country: it.country,
          location: it.location,
          commodity: it.commodity,
          volume: it.volume,
          unit: it.unit,
          date: it.date,
        })),
        notes: "Raised from cart",
      };

      const res = await fetch(`${BASE_URL}/quickService/other-location-request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data?.error || "Failed to raise enquiry");

      await fetchCart();
      await fetchServerTotals({ showError: false });

      if (mountedRef.current) {
        setSuccessMsg("Enquiry raised. Our team will contact you shortly.");
        setTimeout(() => mountedRef.current && setSuccessMsg(""), 4000);
      }
    } catch (err) {
      console.error("raiseEnquiry error:", err);
      if (mountedRef.current) setErrorMsg(err.message || "Failed to raise enquiry");
    } finally {
      if (mountedRef.current) setProcessing(false);
    }
  };

  const proceedToPayment = async () => {
    if (hasEnquiryPending) {
      setErrorMsg("Please raise enquiry for unmatched locations before proceeding to payment");
      return;
    }
    if (!user) {
      setErrorMsg("Please login to continue");
      navigate("/login");
      return;
    }

    setProcessing(true);
    setErrorMsg("");
    try {
      await fetchServerTotals();
      const { total: amountMajor, currency } = serverTotals;
      if (!amountMajor || Number(amountMajor) <= 0) {
        throw new Error("Cart total is zero. Add payable items to proceed.");
      }

      const createRes = await fetch(`${BASE_URL}/quickService/createOrder`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountMajor, currency }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData?.error || "Failed to create payment order");
      }

      const rOrderId = createData.id;
      const rAmount = createData.amount;
      const rCurrency = createData.currency;
      const rKey = createData.key;

      if (!rOrderId || !rKey) throw new Error("Payment initialization failed (missing order or key)");
      if (!window.Razorpay) throw new Error("Payment SDK not loaded. Include Razorpay script.");

      const order_meta = {
        items: items.map((it) => ({
          cartItemId: it._id,
          serviceType: it.serviceType,
          country: it.country,
          location: it.location,
          commodity: it.commodity,
          volume: it.volume,
          unit: it.unit,
          date: it.date,
          price: it.price,
          currency: it.currency,
        })),
        subtotal: serverTotals.subtotal,
        tax: serverTotals.tax,
        total: serverTotals.total,
        currency,
      };

      const options = {
        key: rKey,
        amount: rAmount,
        currency: rCurrency,
        name: "Qualty.ai",
        description: "Quick service payment",
        order_id: rOrderId,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone?.toString() || "",
        },
        theme: { color: "#111827" },
        handler: async function (response) {
          try {
            setProcessing(true);
            const verifyRes = await fetch(`${BASE_URL}/quickService/verify`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_meta,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData?.error || "Payment verification failed");

            if (verifyData?.success) {
              // refresh cart and totals
              await fetchCart();
              await fetchServerTotals({ showError: false });
              const newOrderId = verifyData.order?._id || verifyData.order?.id;
              if (mountedRef.current) {
                setSuccessMsg("Payment successful. Thank you!");
                setTimeout(() => {
                  if (newOrderId) navigate(`/customer/orders/${newOrderId}`);
                  else navigate("/customer/orders");
                }, 900);
              }
            } else {
              throw new Error(verifyData?.error || "Payment verification failed");
            }
          } catch (err) {
            console.error("verify handler error:", err);
            if (mountedRef.current) setErrorMsg(err?.message || "Payment verification error");
          } finally {
            if (mountedRef.current) setProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            if (mountedRef.current) setProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("proceedToPayment error:", err);
      if (mountedRef.current) setErrorMsg(err?.message || "Payment initiation failed");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Your Cart</h2>
            <p className="text-sm text-gray-500 mt-1">Review items, request quotes or proceed to checkout.</p>
          </div>
          <div className="flex items-center gap-4 justify-between sm:justify-end">
            <Link to="/customer/dashboard" className="px-4 py-2 bg-white border rounded text-sm hover:shadow w-full sm:w-auto text-center">
              Browse Services
            </Link>
            <div className="text-sm text-gray-500">{items?.length || 0} item(s)</div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{errorMsg}</div>
              <button onClick={() => setErrorMsg("")} className="text-red-600 ml-4 font-medium">✕</button>
            </div>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 text-green-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="font-medium">{successMsg}</div>
              <button onClick={() => setSuccessMsg("")} className="text-green-600 ml-4 font-medium">✕</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
            <aside className="bg-white p-6 rounded shadow-md h-fit sticky top-20">
              <div className="h-6 bg-gray-200 rounded w-2/3 mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
            </aside>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 sm:p-10 text-center shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-600 mb-6">Add services to request inspections or get a quote.</p>
            <Link to="/customer/dashboard" className="inline-block px-6 py-3 bg-black text-white rounded-full shadow hover:opacity-95">Browse Services</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <div key={it._id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex gap-4 items-start w-full sm:w-auto">
                    <div className="w-20 h-16 sm:w-24 sm:h-16 bg-gray-50 rounded border flex items-center justify-center text-xs text-gray-400">Image</div>
                    <div className="min-w-0">
                      <div className="text-base sm:text-lg font-medium text-gray-900">{it.serviceType}</div>
                      <div className="text-sm text-gray-600 mt-1 truncate">{it.location}{it.country ? `, ${it.country}` : ""}</div>
                      <div className="text-sm text-gray-600 mt-2">Commodity: <span className="font-medium text-gray-800">{it.commodity}</span></div>
                      <div className="text-sm text-gray-500 mt-1">Date: {it.date ? formatDateShort(it.date) : "Not set"}</div>

                      {it.isEnquiry && !it.enquiryRaised && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded px-3 py-1 text-sm bg-yellow-50 text-yellow-800 border border-yellow-100">
                          <span className="font-medium">Enquiry required</span>
                          <span className="text-xs text-gray-500">Price not available</span>
                        </div>
                      )}
                      {it.isEnquiry && it.enquiryRaised && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded px-3 py-1 text-sm bg-blue-50 text-blue-800 border border-blue-100">
                          <span className="font-medium">Enquiry submitted</span>
                          <span className="text-xs text-gray-500">We’ll contact you soon</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-end gap-3 w-full sm:w-auto justify-between sm:justify-start">
                    <div className="text-base sm:text-lg font-semibold text-gray-900">{it.isEnquiry ? "-" : formatCurrency(it.price, it.currency)}</div>
                    <button onClick={() => onRemoveClick(it._id)} className="text-sm cursor-pointer text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-20 order-last lg:order-none">
              <div className="mb-4 text-gray-700 text-sm">Price Summary</div>

              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="font-semibold text-gray-900">{totalsLoading ? formatCurrency(clientSubtotal, clientCurrency) : formatCurrency(serverTotals.subtotal, serverTotals.currency)}</div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-600">Tax</div>
                <div className="text-sm text-gray-600">{totalsLoading ? "-" : formatCurrency(serverTotals.tax, serverTotals.currency)}</div>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between items-center text-lg font-bold mb-4">
                <div>Total</div>
                <div>{totalsLoading ? formatCurrency(clientSubtotal, clientCurrency) : formatCurrency(serverTotals.total, serverTotals.currency)}</div>
              </div>

              {hasEnquiryPending ? (
                <button onClick={raiseEnquiry} disabled={processing} className={`w-full py-3 cursor-pointer rounded-lg text-white ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}>
                  {processing ? "Raising enquiry..." : "Raise Enquiry"}
                </button>
              ) : (
                <button onClick={proceedToPayment} className="w-full py-3 cursor-pointer rounded-lg bg-black text-white hover:bg-gray-900" disabled={processing}>
                  {processing ? "Processing..." : "Proceed to Payment"}
                </button>
              )}

              <p className="mt-4 text-xs text-gray-500">{hasEnquiryPending ? "One or more items require enquiry. Raise enquiry to get a quote." : "Taxes and final totals are calculated at checkout."}</p>
            </aside>
          </div>
        )}
      </div>

      <ConfirmModal open={confirmOpen} onClose={() => { setConfirmOpen(false); setDeletingItemId(null); }} onConfirm={confirmDelete} title="Remove item" message="Remove this item from your cart?" />
    </div>
  );
}
