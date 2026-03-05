import { useState, useRef, useMemo, useEffect } from "react";
import Select from "react-select";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { toast } from "react-toastify";
import { BASE_URL, indianStates } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { Loader2, Plus, X } from "lucide-react";

countries.registerLocale(en);

const MAX_LOCATIONS = 3;
const MAX_WORDS = 100;

const commoditiesList = [
  "Rice","Wheat","Sugar","Coffee","Pulses",
  "Fruits","Vegetables","Seeds","Meat","Spices"
];
const weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const emptyService = () => ({
  psi: { temp: "", confirmed: "" },
  loading: { temp: "", confirmed: "" },
  stuffing: { temp: "", confirmed: "" }
});

export default function QuickInspectionServices({ existingData, onSaved }) {
  const user = useSelector((s) => s.user.user);
  const [locationType, setLocationType] = useState("india");
  const [description, setDescription] = useState(existingData?.description || "");
  const [editDescription, setEditDescription] = useState(!existingData?.description);
  const [selectedCommodities, setSelectedCommodities] = useState(existingData?.commodities || []);
  const [indiaRegions, setIndiaRegions] = useState([]);
  const [intlRegions, setIntlRegions] = useState([]);
  const [currentState, setCurrentState] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (existingData) {
      setDescription(existingData.description || "");
      setEditDescription(!existingData.description);
      setSelectedCommodities(existingData.commodities || []);
    }
  }, [existingData]);

  const stateOptions = useMemo(
    () => indianStates.map((s) => ({ value: s, label: s })),
    []
  );
  const countryOptions = useMemo(
    () => Object.entries(countries.getNames("en")).map(([_, name]) => ({ value: name, label: name })),
    []
  );

  const regions = locationType === "india" ? indiaRegions : intlRegions;
  const setRegions = locationType === "india" ? setIndiaRegions : setIntlRegions;
  const currency = locationType === "india" ? "₹" : "$";

  const addLocation = () => {
    const regionName = locationType === "india" ? currentState?.value : currentCountry?.value;
    if (!input.trim() || !regionName) return;

    setRegions((prev) => {
      const newRegions = prev.map((r) => ({ ...r, locations: [...r.locations] }));
      let region = newRegions.find((r) => r.name === regionName);
      if (!region) {
        region = { name: regionName, locations: [] };
        newRegions.push(region);
      }
      if (region.locations.length >= MAX_LOCATIONS) return prev;
      if (region.locations.some((l) => l.city === input.trim())) return prev;
      region.locations.push({ city: input.trim(), services: emptyService(), availability: [] });
      return newRegions;
    });
    setInput("");
    inputRef.current?.focus();
  };

  const removeLocation = (regionName, city) => {
    setRegions((prev) =>
      prev
        .map((r) =>
          r.name === regionName
            ? { ...r, locations: r.locations.filter((l) => l.city !== city) }
            : r
        )
        .filter((r) => r.locations.length > 0)
    );
  };

  const updateTemp = (region, city, service, value) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.name === region
          ? {
              ...r,
              locations: r.locations.map((l) =>
                l.city === city
                  ? { ...l, services: { ...l.services, [service]: { ...l.services[service], temp: value.replace(/\D/g, "") } } }
                  : l
              )
            }
          : r
      )
    );
  };

  const confirmPrice = (region, city, service) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.name === region
          ? {
              ...r,
              locations: r.locations.map((l) =>
                l.city === city
                  ? { ...l, services: { ...l.services, [service]: { ...l.services[service], confirmed: l.services[service].temp } } }
                  : l
              )
            }
          : r
      )
    );
  };

  const updateAvailability = (region, city, day, field, value) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.name === region
          ? {
              ...r,
              locations: r.locations.map((l) => {
                if (l.city !== city) return l;
                let avail = [...l.availability];
                let existing = avail.find((a) => a.day === day);
                if (!existing) { existing = { day, from: "", to: "" }; avail.push(existing); }
                avail = avail.map((a) => (a.day === day ? { ...a, [field]: value } : a));
                return { ...l, availability: avail };
              })
            }
          : r
      )
    );
  };

  const toggleDay = (region, city, day, enabled) => {
    setRegions((prev) =>
      prev.map((r) =>
        r.name === region
          ? {
              ...r,
              locations: r.locations.map((l) => {
                if (l.city !== city) return l;
                let avail = [...l.availability];
                avail = enabled
                  ? avail.filter((a) => a.day !== day)
                  : [...avail, { day, from: "09:00", to: "17:00" }];
                return { ...l, availability: avail };
              })
            }
          : r
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};
    const activeRegions = locationType === "india" ? indiaRegions : intlRegions;
    if (!activeRegions.length) newErrors.location = "At least one location is required";
    activeRegions.forEach((region) => {
      region.locations.forEach((loc) => {
        const hasPrice = Object.values(loc.services).some((s) => s.confirmed && s.confirmed !== "");
        if (!hasPrice) newErrors[`service-${region.name}-${loc.city}`] = "Add at least one service price";
        if (!loc.availability.length) newErrors[`availability-${region.name}-${loc.city}`] = "Select availability";
      });
    });
    if (!selectedCommodities.length) newErrors.commodity = "Select at least one commodity";
    if (editDescription && (!description || description.trim() === "")) {
      newErrors.description = "Description required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    try {
      const payload = {
        coverageType: locationType,
        indiaRegions,
        intlRegions,
        commodities: selectedCommodities,
        description: editDescription ? description : ""
      };
      const res = await fetch(`${BASE_URL}/inspectionCompany/quick-inspection/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Services saved successfully!");
      setIndiaRegions([]);
      setIntlRegions([]);
      setCurrentState(null);
      setCurrentCountry(null);
      setInput("");
      setErrors({});
      if (onSaved) onSaved(data.data);
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {existingData ? "Add More Services" : "Setup Quick Inspection Services"}
        </h2>
        {existingData && (
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            New additions will merge with existing
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {["india", "intl"].map((type) => (
          <button
            key={type}
            onClick={() => setLocationType(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition cursor-pointer ${
              locationType === type ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {type === "india" ? "🇮🇳 India" : "🌍 International"}
          </button>
        ))}
      </div>

      {locationType === "india" ? (
        <Select
          options={stateOptions}
          value={currentState}
          onChange={setCurrentState}
          placeholder="Select state..."
          classNamePrefix="react-select"
        />
      ) : (
        <Select
          options={countryOptions}
          value={currentCountry}
          onChange={setCurrentCountry}
          placeholder="Select country..."
          classNamePrefix="react-select"
        />
      )}

      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
          className="flex-1 border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          placeholder="Enter city name and press Enter"
        />
        <button
          onClick={addLocation}
          className="px-4 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
        >
          <Plus size={16} />
        </button>
      </div>
      {errors.location && <p className="text-red-500 text-xs -mt-4">{errors.location}</p>}

      {regions.map((region) => (
        <div key={region.name} className="border border-gray-200 rounded-2xl p-4 space-y-4 bg-gray-50">
          <h3 className="font-semibold text-gray-900">{region.name}</h3>
          {region.locations.map((loc) => (
            <div key={loc.city} className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-800">{loc.city}</span>
                <button
                  onClick={() => removeLocation(region.name, loc.city)}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <X size={13} /> Remove
                </button>
              </div>
              {errors[`service-${region.name}-${loc.city}`] && (
                <p className="text-red-500 text-xs">{errors[`service-${region.name}-${loc.city}`]}</p>
              )}

              <div className="space-y-2">
                {["psi", "loading", "stuffing"].map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm">
                    <span className="w-20 text-xs font-medium text-gray-500 uppercase">{s}</span>
                    <input
                      value={loc.services[s].temp}
                      onChange={(e) => updateTemp(region.name, loc.city, s, e.target.value)}
                      className="border border-gray-200 rounded-lg p-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                      placeholder={`${currency} amount`}
                    />
                    <button
                      onClick={() => confirmPrice(region.name, loc.city, s)}
                      className="px-3 py-2 bg-black text-white rounded-lg text-xs cursor-pointer hover:bg-gray-800 transition"
                    >
                      Set
                    </button>
                    {loc.services[s].confirmed && (
                      <span className="text-xs text-green-600 font-medium whitespace-nowrap">
                        ✓ {currency}{loc.services[s].confirmed}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {errors[`availability-${region.name}-${loc.city}`] && (
                <p className="text-red-500 text-xs">{errors[`availability-${region.name}-${loc.city}`]}</p>
              )}

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-600 mb-2">Availability</p>
                {weekDays.map((day) => {
                  const entry = loc.availability.find((a) => a.day === day);
                  const enabled = !!entry;
                  return (
                    <div key={day} className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2">
                      <span className="w-8 text-xs font-medium text-gray-600">{day}</span>
                      <button
                        onClick={() => toggleDay(region.name, loc.city, day, enabled)}
                        className={`w-9 h-5 rounded-full relative transition ${enabled ? "bg-black" : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${enabled ? "right-0.5" : "left-0.5"}`} />
                      </button>
                      {enabled ? (
                        <div className="flex items-center gap-1 ml-3">
                          <input
                            type="time"
                            value={entry.from}
                            onChange={(e) => updateAvailability(region.name, loc.city, day, "from", e.target.value)}
                            className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
                          />
                          <span className="text-gray-400">–</span>
                          <input
                            type="time"
                            value={entry.to}
                            onChange={(e) => updateAvailability(region.name, loc.city, day, "to", e.target.value)}
                            className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none"
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 ml-3">Unavailable</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Commodities</label>
        <select
          onChange={(e) => {
            const val = e.target.value;
            if (val && !selectedCommodities.includes(val)) {
              setSelectedCommodities((p) => [...p, val]);
            }
            e.target.value = "";
          }}
          className="w-full border border-gray-200 p-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
        >
          <option value="">Add commodity...</option>
          {commoditiesList.filter((c) => !selectedCommodities.includes(c)).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.commodity && <p className="text-red-500 text-xs">{errors.commodity}</p>}
        <div className="flex flex-wrap gap-2">
          {selectedCommodities.map((c) => (
            <span
              key={c}
              className="flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-xs"
            >
              {c}
              <X
                size={11}
                className="cursor-pointer hover:opacity-70"
                onClick={() => setSelectedCommodities((p) => p.filter((x) => x !== c))}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Company Description</label>
          {existingData?.description && !editDescription && (
            <button
              onClick={() => setEditDescription(true)}
              className="text-xs text-blue-600 underline cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
        {!editDescription && existingData?.description ? (
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-xl p-3">
            {existingData.description}
          </p>
        ) : (
          <>
            <textarea
              value={description}
              onChange={(e) => {
                const w = e.target.value.trim().split(/\s+/).filter(Boolean);
                if (w.length <= MAX_WORDS) setDescription(e.target.value);
              }}
              placeholder="Describe your company and inspection services..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none"
              rows={3}
            />
            <p className="text-xs text-gray-400 text-right">
              {description.trim().split(/\s+/).filter(Boolean).length}/{MAX_WORDS} words
            </p>
          </>
        )}
        {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition cursor-pointer"
      >
        {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : "Save Services"}
      </button>
    </div>
  );
}