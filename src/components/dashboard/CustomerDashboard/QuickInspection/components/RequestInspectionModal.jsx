import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCircle2, MapPin, Loader2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../../utils/constants";

const SERVICES_MAP = {
  psi: "Pre-Shipment Inspection",
  loading: "Loading Supervision",
  stuffing: "Stuffing Supervision",
  destination: "Destination Inspection"
};

const GST_RATE = 0.18;

export function RequestInspectionModal({ requestData, service, open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ commodity: "", date: "" });

  const isIndia = requestData?.pricing?.currency === "₹";
  const baseAmount = Number(requestData?.pricing?.price) || 0;
  const gstAmount = isIndia ? Math.round(baseAmount * GST_RATE) : 0;
  const totalAmount = baseAmount + gstAmount;

  const today = new Date();
  const minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setFormData({ commodity: "", date: "" });
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestData?.pricing || loading) return;
    if (!formData.commodity.trim()) { toast.error("Please enter commodity"); return; }
    if (!formData.date) { toast.error("Please select a date"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/quickInspection/inspection-request/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          companyId: requestData.company.id,
          service,
          commodity: formData.commodity,
          inspectionDate: formData.date,
          location: {
            region: requestData.pricing.region,
            city: requestData.pricing.city
          },
          pricing: {
            currency: requestData.pricing.currency,
            amount: totalAmount
          }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");
      setSubmitted(true);
      setTimeout(() => { onClose(); }, 3000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl">
        <DialogHeader className="pb-4 border-b border-gray-100">
          <DialogTitle className="text-xl font-semibold text-gray-900">Request Inspection</DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Request Sent!</h3>
              <p className="text-gray-500 mt-2 text-sm max-w-xs mx-auto">
                You'll receive an email and be notified here once the company responds.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4 pt-4"
            >
              {requestData?.pricing && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span>{requestData.pricing.region} – {requestData.pricing.city}</span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{SERVICES_MAP[service]}</div>

                  <div className="border-t border-gray-200 pt-3 space-y-1.5">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Service Amount</span>
                      <span>{requestData.pricing.currency}{baseAmount.toLocaleString()}</span>
                    </div>
                    {isIndia && (
                      <div className="flex justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          GST (18%)
                          <Info size={12} className="text-gray-400" />
                        </span>
                        <span>₹{gstAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-gray-900 pt-1 border-t border-gray-200">
                      <span>Total Payable</span>
                      <span>{requestData.pricing.currency}{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Commodity</label>
                <input
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  required
                  placeholder="e.g., Rice, Wheat, Coffee..."
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Inspection Date</label>
                <input
                  type="date"
                  min={minDate}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition"
                />
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 size={15} className="animate-spin" /> Submitting...</>
                  ) : (
                    `Submit Request`
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}