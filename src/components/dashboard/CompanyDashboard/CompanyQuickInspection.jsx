import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, PlusCircle, Inbox, CheckCircle2 } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import QuickInspectionDetails from "./QuickInspectionDetails";
import QuickInspectionServices from "./QuickInspectionServices";
import CompanyInspectionRequests from "./QuickInspection/Companyinspectionrequests";

const ShimmerBlock = () => (
  <div className="space-y-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-36 bg-gray-100 rounded-2xl" />
    ))}
  </div>
);

export default function CompanyQuickInspection() {
  const user = useSelector((s) => s.user.user);
  const [data,setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (!user?._id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspectionCompany/quick-inspection/${user._id}`, {
          credentials: "include"
        });
        const json = await res.json();
        if (!cancelled && json.success) setData(json.data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-7 w-52 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 w-72 bg-gray-100 rounded animate-pulse mb-8" />
          <ShimmerBlock/>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: "overview", label: "My Services", icon: Layers },
    { id: "add", label: "Add Services", icon: PlusCircle },
    { id: "requests", label: "Requests", icon: Inbox, count: requestCount },
    { id: "accepted", label: "Accepted", icon: CheckCircle2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quick Inspection</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your inspection services and incoming requests</p>
        </div>

        <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 w-fit shadow-sm overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shrink-0 ${
                    isActive ? "bg-white text-black" : "bg-red-500 text-white"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === "overview" && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                {data ? (
                  <QuickInspectionDetails quickInspection={data} />
                ) : (
                  <div className="text-center py-16">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Layers size={24} className="text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-700">No services added yet</p>
                    <p className="text-sm text-gray-400 mt-1 mb-5">Set up your inspection services to appear in the marketplace</p>
                    <button
                      onClick={() => setActiveTab("add")}
                      className="px-5 py-2.5 bg-black text-white rounded-xl text-sm font-semibold cursor-pointer hover:bg-gray-800 transition"
                    >
                      Add Services
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "add" && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <QuickInspectionServices
                  existingData={data}
                  onSaved={(updated) => {
                    setData(updated);
                    setActiveTab("overview");
                  }}
                />
              </div>
            )}

            {activeTab === "requests" && (
              <CompanyInspectionRequests
                key="pending"
                filter="pending"
                onCountChange={setRequestCount}
              />
            )}

            {activeTab === "accepted" && (
              <CompanyInspectionRequests key="accepted" filter="accepted" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}