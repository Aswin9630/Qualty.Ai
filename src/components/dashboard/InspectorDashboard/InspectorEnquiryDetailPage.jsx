import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";
import { Package, MapPin, Ruler, AlertTriangle, Calendar, Wrench, Award, FileText, Wallet, CheckCircle2, XCircle, Clock, Loader2, Hash } from "lucide-react";

export default function InspectorEnquiryDetailPage() {
  const { id } = useParams();
  const [bid, setBid] = useState(null);
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspector/history`, { credentials: "include" });
        const data = await res.json();
        if (data.success) {
          const matchedBid = data.bids.find((b) => b.enquiry?._id === id);
          if (matchedBid) {
            setBid(matchedBid);
            setEnquiry(matchedBid.enquiry);
          } else {
            toast.error("No matching bid found.");
          }
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load details");
      }
    };
    fetchDetails();
  }, [id]);

  if (!enquiry || !bid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600">Loading bid details…</p>
        </div>
      </div>
    );
  }

  const sym = bid?.enquiry?.currency === "INR" ? "₹" : "$";

  const statusConfig = {
    won: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", bar: "bg-emerald-400", icon: <CheckCircle2 size={14} /> },
    lost: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-400", bar: "bg-red-300", icon: <XCircle size={14} /> },
    pending: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", bar: "bg-gray-300", icon: <Clock size={14} /> },
  };
  const sc = statusConfig[bid.status] || statusConfig.pending;

  const urgencyConfig = {
    High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500" },
    Medium: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", dot: "bg-amber-400" },
    Low: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", dot: "bg-emerald-500" },
  };
  const uc = urgencyConfig[enquiry.urgency] || urgencyConfig.Low;

  const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
      <div className="w-7 h-7 rounded-lg bg-gray-950 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase">{title}</h2>
    </div>
  );

  const Field = ({ label, value }) => (
    <div>
      <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">History</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bid Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
              <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
              {String(bid.status || "").toUpperCase()}
            </span>
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${uc.bg} ${uc.text} ${uc.border}`}>
              <span className={`w-2 h-2 rounded-full ${uc.dot}`} />
              {enquiry.urgency || "—"}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className={`h-1.5 w-full ${sc.bar}`} />
          <div className="p-6">
            <SectionHeader icon={<Package size={14} className="text-white" />} title="Enquiry Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Commodity" value={enquiry.commodity} />
              <Field label="Subcategory" value={enquiry.subcategory} />
              <Field label="Location" value={enquiry.location} />
              <Field label="Volume" value={enquiry.volume ? `${enquiry.volume} ${enquiry.unit || ""}` : "—"} />
              <Field label="Urgency" value={enquiry.urgency} />
              <Field
                label="Inspection Date"
                value={enquiry.dateFrom ? `${new Date(enquiry.dateFrom).toLocaleDateString()} → ${new Date(enquiry.dateTo).toLocaleDateString()}` : "—"}
              />
            </div>
          </div>
        </div>

        {((enquiry.services?.length > 0) || (enquiry.certifications?.length > 0)) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SectionHeader icon={<Wrench size={14} className="text-white" />} title="Services & Certifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {enquiry.services?.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {enquiry.services.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {enquiry.certifications?.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-1.5">
                    {enquiry.certifications.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-700">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {enquiry.otherRequirements && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <SectionHeader icon={<FileText size={14} className="text-white" />} title="Requirements" />
            <p className="text-sm text-gray-700 leading-relaxed">{enquiry.otherRequirements}</p>
          </div>
        )}

        <div className="bg-gray-950 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Wallet size={15} className="text-white/50" />
            <h2 className="text-xs font-bold text-white/50 tracking-widest uppercase">Bid Summary</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Bid Amount</span>
              <span className="text-sm font-bold text-white">{sym}{bid.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Customer Amount</span>
              <span className="text-sm font-bold text-white">
                {sym}{bid?.enquiry?.inspectionBudget - bid?.enquiry?.platformFee}
              </span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Submitted On</span>
              <span className="text-xs font-semibold text-white/70">{new Date(bid.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Status</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                {sc.icon}
                {String(bid.status || "").toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}