import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, TrendingDown, Receipt, X, Calendar, MapPin,
  Package, Zap, ChevronRight, IndianRupee, BadgePercent
} from "lucide-react";
import { BASE_URL } from "../../../../../utils/constants";

const SERVICE_MAP = {
  psi: "Pre-Shipment",
  loading: "Loading",
  stuffing: "Stuffing",
  destination: "Destination"
};

const ShimmerRow = () => (
  <div className="animate-pulse flex items-center gap-3 p-3">
    <div className="w-10 h-10 bg-gray-100 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
    </div>
    <div className="w-16 h-4 bg-gray-100 rounded" />
  </div>
);

export default function CustomerWallet() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/quickInspection/wallet`, { credentials: "include" });
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (_) {}
      finally { setLoading(false); }
    })();
  }, []);

  const summary = data?.summary;
  const transactions = data?.transactions || [];

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl p-2 hover:shadow-md transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            {/* <div>
              <p className="font-bold text-gray-900 text-sm">My Wallet</p>
              <p className="text-xs text-gray-400">Inspection Payments</p> */}
            {/* </div> */}
          </div>
          {/* <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" /> */}
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="h-7 bg-gray-100 rounded animate-pulse w-28" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-20" />
          </div>
        ) : (
          <div className="space-y-1">
            {/* <div className="flex items-baseline gap-1"> */}
              {/* <span className="text-2xl font-black text-gray-900">
                ₹{Number(summary?.totalSpent || 0).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-xs text-gray-500">{summary?.totalTransactions || 0} completed payment{summary?.totalTransactions !== 1 ? "s" : ""}</p> */}
          </div>
        )}

        {/* <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <BadgePercent size={12} className="text-gray-400" />
            GST Paid: ₹{Number(summary?.totalGstPaid || 0).toLocaleString("en-IN")}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <TrendingDown size={12} />
            Total Spent
          </div>
        </div> */}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
                    <Wallet size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">My Wallet</h2>
                    <p className="text-xs text-gray-400">Inspection payment history</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-xl hover:bg-gray-100 flex items-center justify-center transition cursor-pointer">
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {!loading && summary && (
                <div className="px-6 py-5 bg-gray-900 text-white">
                  <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Total Amount Spent</p>
                  <p className="text-3xl font-black">₹{Number(summary.totalSpent).toLocaleString("en-IN")}</p>
                  <div className="mt-3 flex gap-4">
                    <div className="bg-white/10 rounded-xl px-3 py-2 flex-1">
                      <p className="text-xs text-gray-400">Transactions</p>
                      <p className="text-lg font-bold">{summary.totalTransactions}</p>
                    </div>
                    <div className="bg-white/10 rounded-xl px-3 py-2 flex-1">
                      <p className="text-xs text-gray-400">GST Paid</p>
                      <p className="text-lg font-bold">₹{Number(summary.totalGstPaid).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="divide-y divide-gray-50">
                    {[1, 2, 3].map((i) => <ShimmerRow key={i} />)}
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                      <Receipt size={22} className="text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-700">No transactions yet</p>
                    <p className="text-sm text-gray-400 mt-1">Your completed inspection payments will appear here</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {transactions.map((t) => {
                      const isIndia = t.currency === "₹";
                      return (
                        <div key={t._id} className="px-6 py-4 hover:bg-gray-50 transition">
                          <div className="flex items-start justify-between mb-2.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                                <Zap size={15} className="text-gray-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{SERVICE_MAP[t.service] || t.service}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{t.company?.companyName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">{t.currency}{Number(t.totalAmount).toLocaleString("en-IN")}</p>
                              <p className="text-xs text-green-600 font-medium mt-0.5">Paid</p>
                            </div>
                          </div>
                          <div className="ml-12 space-y-1">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><Package size={11} />{t.commodity}</span>
                              <span className="flex items-center gap-1"><MapPin size={11} />{t.location?.city}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} />
                                {new Date(t.paidAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </span>
                              <span>{t.invoiceNumber}</span>
                            </div>
                            {isIndia && (
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span>Amount: {t.currency}{Number(t.baseAmount).toLocaleString("en-IN")}</span>
                                <span>GST: {t.currency}{Number(t.gstAmount).toLocaleString("en-IN")}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}