import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";

const formatTime = t => {
  if (!t) return "";
  const [h, m] = t.split(":");
  let hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${m} ${ampm}`;
};

const DayBadge = ({ item }) => (
  <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
    {item.day} · {formatTime(item.from)} – {formatTime(item.to)}
  </div>
);

const ServiceRow = ({ label, value, currency }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">
        {currency} {value}
      </span>
    </div>
  );
};

const LocationCard = ({ loc, currency, docId, onRemove }) => {
    console.log("loc",loc);
    console.log("curency",currency);
    console.log("docId",docId);
    
  const remove = async () => {
    onRemove(loc._id);

    const response = await fetch(`${BASE_URL}/inspectioncompany/quick-inspection/${docId}/location/${loc._id}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data= await response.json();
    console.log("data",data)
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-lg transition">

      <button
        onClick={remove}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 cursor-pointer"
      >
        <Trash2 size={18} />
      </button>

      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 text-lg">{loc.city}</h3>
      </div>

      <div className="space-y-2">
        <ServiceRow label="PSI Inspection" value={loc.services?.psi?.confirmed} currency={currency} />
        <ServiceRow label="Loading Supervision" value={loc.services?.loading?.confirmed} currency={currency} />
        <ServiceRow label="Stuffing Supervision" value={loc.services?.stuffing?.confirmed} currency={currency} />
      </div>

      {loc.availability?.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {loc.availability.map((a, i) => (
            <DayBadge key={i} item={a} />
          ))}
        </div>
      )}
    </div>
  );
};

const RegionBlock = ({ region, currency, docId, removeLocation }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-900">{region.name}</h2>
    <div className="grid md:grid-cols-2 gap-6">
      {region.locations.map(loc => (
        <LocationCard
          key={loc._id}
          loc={loc}
          currency={currency}
          docId={docId}
          onRemove={removeLocation}
        />
      ))}
    </div>
  </div>
);

export default function QuickInspectionDetails({ quickInspection }) {
  const [data, setData] = useState(quickInspection);
  const [slide, setSlide] = useState(0);

  const removeLocation = id => {
    const clean = regions =>
      regions.map(r => ({
        ...r,
        locations: r.locations.filter(l => l._id !== id)
      }));

    setData(prev => ({
      ...prev,
      indiaRegions: clean(prev.indiaRegions || []),
      intlRegions: clean(prev.intlRegions || [])
    }));
  };

  if (!data)
    return (
      <div className="text-center text-gray-500 p-10">
        No quick inspection data
      </div>
    );

  const sections = [];

  if (data.indiaRegions?.length > 0)
    sections.push({ title: "India Services", regions: data.indiaRegions, currency: "₹" });

  if (data.intlRegions?.length > 0)
    sections.push({ title: "International Services", regions: data.intlRegions, currency: "$" });

//   useEffect(() => {
//     if (sections.length <= 1) return;
//     const timer = setInterval(() => {
//       setSlide(p => (p + 1) % sections.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [sections.length]);

  const active = sections[slide];
  console.log("active",active)

  return (
    <div className="max-w-6xl mx-auto space-y-10">

      <div className="rounded-3xl p-8 shadow-lg border bg-gradient-to-br from-white to-gray-50">
        <div className="text-3xl font-bold">Quick Inspection Services</div>

        {data.description && (
          <p className="text-gray-600 mt-2">{data.description}</p>
        )}

        {data.commodities?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {data.commodities.map((c, i) => (
              <span key={i} className="bg-black text-white px-3 py-1 rounded-full text-xs">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {sections.length > 1 && (
        <div className="flex justify-center gap-3">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-3 h-3 rounded-full ${
                slide === i ? "bg-black scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      <div className="space-y-8">
        <div className="text-center text-2xl font-bold">{active?.title}</div>

        {active?.regions.map(region => (
          <RegionBlock
            key={region.name}
            region={region}
            currency={active.currency}
            docId={data._id}
            removeLocation={removeLocation}
          />
        ))}
      </div>
    </div>
  );
}
