import { ChevronDown, ChevronUp, Zap, Building2, Clock, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formatTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":");
  let hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${m} ${ampm}`;
};

const DAY_ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getAvailabilitySummary = (regions) => {
  const daySet = new Map();
  (regions || []).forEach((region) => {
    (region.locations || []).forEach((loc) => {
      (loc.availability || []).forEach((a) => {
        if (!daySet.has(a.day)) {
          daySet.set(a.day, { from: a.from, to: a.to });
        }
      });
    });
  });
  return DAY_ORDER.filter((d) => daySet.has(d)).map((d) => ({ day: d, ...daySet.get(d) }));
};

export function CompanyCard({ company, service, onRequestInspection }) {
  const [isPriceExpanded, setIsPriceExpanded] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const pricing = useMemo(() => {
    if (!company) return [];
    const prices = [];
    (company.indiaRegions || []).forEach((region) => {
      (region.locations || []).forEach((loc) => {
        const svc = loc.services?.[service];
        if (svc?.confirmed) {
          prices.push({
            id: `${region.name}-${loc.city}`,
            region: region.name,
            city: loc.city,
            price: svc.confirmed,
            currency: "₹",
            isIndia: true,
            availability: loc.availability || []
          });
        }
      });
    });
    (company.intlRegions || []).forEach((region) => {
      (region.locations || []).forEach((loc) => {
        const svc = loc.services?.[service];
        if (svc?.confirmed) {
          prices.push({
            id: `${region.name}-${loc.city}`,
            region: region.name,
            city: loc.city,
            price: svc.confirmed,
            currency: "$",
            isIndia: false,
            availability: loc.availability || []
          });
        }
      });
    });
    return prices;
  }, [company, service]);

  const availability = useMemo(() => {
    return getAvailabilitySummary([
      ...(company?.indiaRegions || []),
      ...(company?.intlRegions || [])
    ]);
  }, [company]);

  const handleRequest = () => {
    if (!selectedPrice) return;
    onRequestInspection({ company, pricing: selectedPrice, service });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center shrink-0">
          <Building2 className="w-6 h-6 text-gray-600" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight truncate">{company?.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Verified Partner</p>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{company?.description}</p>

      {(company?.commodities || []).length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {(company.commodities || []).map((c, i) => (
            <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200 font-medium">
              {c}
            </span>
          ))}
        </div>
      )}

      {availability.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock size={12} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Availability</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {availability.map((a, i) => (
              <div key={i} className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600">
                <span className="font-semibold text-gray-800">{a.day}</span>
                <span className="text-gray-400">·</span>
                <span>{formatTime(a.from)} – {formatTime(a.to)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsPriceExpanded(!isPriceExpanded)}
        className="flex justify-between items-center w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl font-medium text-sm hover:bg-gray-100 transition cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-gray-400" />
          <span>Select Location & Pricing</span>
        </div>
        {isPriceExpanded ? <ChevronUp size={15} className="text-gray-500" /> : <ChevronDown size={15} className="text-gray-500" />}
      </button>

      <AnimatePresence>
        {isPriceExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2 max-h-52 overflow-y-auto pr-1">
              {pricing.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition ${
                    selectedPrice?.id === p.id
                      ? "border-black bg-gray-50 shadow-sm"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name={`pricing-${company?.id}`}
                      checked={selectedPrice?.id === p.id}
                      onChange={() => setSelectedPrice(p)}
                      className="w-4 h-4 accent-black"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{p.region} – {p.city}</p>
                      {p.availability.length > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {p.availability.map((a) => a.day).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 text-sm whitespace-nowrap ml-2">
                    {p.currency}{Number(p.price).toLocaleString()}
                  </span>
                </label>
              ))}
              {!pricing.length && (
                <div className="py-4 text-sm text-gray-400 text-center">No pricing available</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleRequest}
        disabled={!selectedPrice}
        className="w-full mt-4 py-3.5 flex items-center justify-center gap-2 cursor-pointer bg-black text-white hover:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed rounded-xl font-semibold text-sm transition"
      >
        <Zap className="w-4 h-4" />
        Request Inspection
      </button>
    </div>
  );
}