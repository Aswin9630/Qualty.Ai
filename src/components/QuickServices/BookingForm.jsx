import React, { useEffect, useRef, useState } from "react";
import { Calendar, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { setPendingCart, setRedirectAfterLogin } from "../../redux/slice/userSlice";

const libraries = ["places"];
const units = ["kg", "ton", "litre", "unit"];
const GMAP_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function BookingForm({ service, onClose = () => {} }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GMAP_API_KEY,
    libraries,
  });

  const [data, setData] = useState({
    country: "",
    location: "",
    commodity: "",
    volume: "",
    unit: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [globalMessage, setGlobalMessage] = useState({ type: "", text: "" });

  const countryAutoRef = useRef(null);
  const locationAutoRef = useRef(null);
  const calendarRef = useRef(null);

  const user = useSelector((s) => s.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setData({
      country: service?.country || "",
      location: service?.location || "",
      commodity: "",
      volume: "",
      unit: "",
    });
    setFormErrors({});
    setSelectedDate(null);
    setShowCalendar(false);
    setSubmitting(false);
    setGlobalMessage({ type: "", text: "" });
  }, [service]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!calendarRef.current) return;
      if (!calendarRef.current.contains(e.target)) setShowCalendar(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // --- utilities for country detection and options ---
  const countryNameToIso = (name = "") => {
    const n = String(name).trim().toLowerCase();
    if (!n) return "";
    if (n.includes("india")) return "in";
    if (n.includes("united arab emirates") || n === "uae") return "ae";
    if (n.includes("china")) return "cn";
    if (n.includes("pakistan")) return "pk";
    if (n.includes("united states") || n.includes("usa") || n.includes("us")) return "us";
    // extend mapping as needed
    return "";
  };

  function buildLocationOptionsForCountryIso(iso) {
    if (!iso) return { fields: ["address_components", "formatted_address", "name"] };
    if (iso.toLowerCase() === "cn") return null; // Google Places unreliable in China -> fallback to manual
    return {
      componentRestrictions: { country: iso.toLowerCase() },
      fields: ["address_components", "formatted_address", "name"],
    };
  }

  // Autocomplete base options
  const countryAutoOptions = {
    types: ["(regions)"],
    fields: ["address_components", "formatted_address", "name"],
  };

  // helpers to extract nice labels from PlaceResult
  function extractCountryFromPlace(place) {
    if (!place) return "";
    if (!place.address_components) return place.formatted_address || place.name || "";
    const comp = place.address_components.find((c) => c.types.includes("country"));
    return comp ? comp.long_name : place.formatted_address || place.name || "";
  }

  function extractLocationFromPlace(place) {
    if (!place) return "";
    if (!place.address_components) return place.formatted_address || place.name || "";

    const find = (types) => place.address_components.find((c) => types.some((t) => c.types.includes(t)));

    // Prefer locality / city like components
    const locality = find(["locality", "postal_town", "sublocality", "neighborhood"]);
    if (locality) return locality.long_name;

    // District / county
    const subAdmin = find(["administrative_area_level_2"]);
    if (subAdmin) return subAdmin.long_name;

    // State / province (covers Gujarat etc.)
    const state = find(["administrative_area_level_1"]);
    if (state) return state.long_name;

    // Fallback
    return place.formatted_address || place.name || "";
  }

  const handleCountryPlaceChanged = () => {
    try {
      const place = countryAutoRef.current?.getPlace?.();
      const country = extractCountryFromPlace(place);
      setData((s) => ({ ...s, country }));
      setFormErrors((f) => ({ ...f, country: "" }));
    } catch (err) {
      console.warn("country place parse error", err);
    }
  };

  const handleLocationPlaceChanged = () => {
    try {
      const place = locationAutoRef.current?.getPlace?.();
      if (!place || (!place.address_components && !place.formatted_address && !place.name)) {
        // User typed without selecting a prediction; keep typed text
        return;
      }
      const location = extractLocationFromPlace(place);
      setData((s) => ({ ...s, location }));
      setFormErrors((f) => ({ ...f, location: "" }));
    } catch (err) {
      console.warn("location place parse error", err);
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!data.country || !data.country.trim()) errors.country = "Country is required";
    if (!data.location || !data.location.trim()) errors.location = "Location is required";
    if (!data.commodity || !data.commodity.trim()) errors.commodity = "Commodity is required";
    if (data.volume === "" || data.volume === null || data.volume === undefined) errors.volume = "Volume is required";
    if (data.volume && Number.isNaN(Number(data.volume))) errors.volume = "Enter a valid number";
    if (!data.unit) errors.unit = "Unit is required";
    if (!selectedDate) errors.date = "Date is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setGlobalMessage({ type: "", text: "" });
    if (!validateFields()) {
      setGlobalMessage({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    const payload = {
      serviceType: service?.name || "UNKNOWN",
      country: data.country.trim(),
      location: data.location.trim(),
      commodity: data.commodity.trim(),
      volume: Number(data.volume),
      unit: data.unit,
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
    };

    if (!user) {
      dispatch(setPendingCart(payload));
      dispatch(setRedirectAfterLogin("cart"));
      setGlobalMessage({ type: "info", text: "Please login to complete booking." });
      setTimeout(() => {
        onClose();
        navigate("/login");
      }, 600);
      return;
    }

    setSubmitting(true);
    try {
      const res = await addToCart(payload);
      if (res?.error) {
        setGlobalMessage({ type: "error", text: res.error || "Failed to add to cart" });
      } else if (res?.enquiry) {
        setGlobalMessage({
          type: "info",
          text: res.data?.message || "Location requires enquiry. Our team will contact you.",
        });
        setTimeout(() => {
          onClose();
          navigate("/customer/cart");
        }, 700);
      } else {
        setGlobalMessage({ type: "success", text: "Added to cart" });
        setTimeout(() => {
          onClose();
          navigate("/customer/cart");
        }, 300);
      }
    } catch (err) {
      console.error("addToCart error:", err);
      setGlobalMessage({ type: "error", text: err?.message || "Unexpected error" });
    } finally {
      setSubmitting(false);
    }
  };

  // If maps failed to load show friendly fallback and allow manual input
  if (loadError) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-500" aria-label="Close">
            <X />
          </button>
          <h3 className="text-lg font-semibold mb-2">Location services unavailable</h3>
          <p className="text-sm text-gray-700 mb-4">
            Google Places could not be initialized. You can continue by typing country and location manually.
          </p>

          <div className="space-y-4">
            <input
              value={data.country}
              onChange={(e) => setData((s) => ({ ...s, country: e.target.value }))}
              placeholder="Country"
              className="w-full border-b p-2"
            />
            <input
              value={data.location}
              onChange={(e) => setData((s) => ({ ...s, location: e.target.value }))}
              placeholder="Location (city / port / region)"
              className="w-full border-b p-2"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-gray-900 text-white rounded">
                {submitting ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // show spinner while maps load
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
          <div className="text-sm text-gray-700">Loading location services…</div>
        </div>
      </div>
    );
  }

  // MAIN MODAL UI (maps loaded)
  // Determine location options dynamically based on selected country
  const detectedIsoFromCountryName = countryNameToIso(data.country);
  // Also try to get short_name from countryAutoRef if user selected a place
  let detectedIsoFromPlace = "";
  try {
    const place = countryAutoRef.current?.getPlace?.();
    if (place && place.address_components) {
      const countryComp = place.address_components.find((c) => c.types.includes("country"));
      if (countryComp) detectedIsoFromPlace = (countryComp.short_name || "").toLowerCase();
    }
  } catch {
    detectedIsoFromPlace = "";
  }
  const locationIso = detectedIsoFromPlace || detectedIsoFromCountryName || "";

  const locationOptions = buildLocationOptionsForCountryIso(locationIso);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Close"
          type="button"
        >
          <X size={20} />
        </button>

        <h2 id="booking-title" className="text-lg font-semibold mb-4 text-gray-800 text-center">
          Add Details — {service?.name}
        </h2>

        {globalMessage.text && (
          <div
            className={`mb-4 p-3 rounded text-sm ${
              globalMessage.type === "error"
                ? "bg-red-50 text-red-700 border border-red-100"
                : globalMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-blue-50 text-blue-700 border border-blue-100"
            }`}
            role={globalMessage.type === "error" ? "alert" : "status"}
          >
            {globalMessage.text}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Country Autocomplete */}
            <div>
              <Autocomplete
                onLoad={(ref) => (countryAutoRef.current = ref)}
                onPlaceChanged={handleCountryPlaceChanged}
                options={countryAutoOptions}
              >
                <input
                  type="text"
                  placeholder="Country"
                  aria-label="Country"
                  value={data.country}
                  onChange={(e) => {
                    setData((s) => ({ ...s, country: e.target.value }));
                    setFormErrors((f) => ({ ...f, country: "" }));
                  }}
                  className={`pl-3 border-b p-2 w-full placeholder-gray-500 focus:outline-none transition ${
                    formErrors.country ? "border-red-500" : "border-gray-300 focus:border-gray-800"
                  }`}
                />
              </Autocomplete>
              {formErrors.country && <p className="text-xs text-red-500 mt-1">{formErrors.country}</p>}
            </div>

            {/* LOCATION INPUT — adaptive per country */}
            <div>
              {locationOptions === null ? (
                <>
                  <label className="text-xs text-gray-500">
                    Location (manual input — Google Places limited in selected country)
                  </label>
                  <input
                    type="text"
                    placeholder="Location (city / port / region)"
                    aria-label="Location"
                    value={data.location}
                    onChange={(e) => {
                      setData((s) => ({ ...s, location: e.target.value }));
                      setFormErrors((f) => ({ ...f, location: "" }));
                    }}
                    className={`pl-3 border-b p-2 w-full placeholder-gray-500 focus:outline-none transition ${
                      formErrors.location ? "border-red-500" : "border-gray-300 focus:border-gray-800"
                    }`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Note: Google Places predictions are limited for the selected country. Please enter the location manually.
                  </p>
                </>
              ) : (
                <Autocomplete
                  onLoad={(ref) => (locationAutoRef.current = ref)}
                  onPlaceChanged={handleLocationPlaceChanged}
                  options={locationOptions}
                >
                  <input
                    type="text"
                    placeholder="Location (city / port / region)"
                    aria-label="Location"
                    value={data.location}
                    onChange={(e) => {
                      setData((s) => ({ ...s, location: e.target.value }));
                      setFormErrors((f) => ({ ...f, location: "" }));
                    }}
                    className={`pl-3 border-b p-2 w-full placeholder-gray-500 focus:outline-none transition ${
                      formErrors.location ? "border-red-500" : "border-gray-300 focus:border-gray-800"
                    }`}
                  />
                </Autocomplete>
              )}
              {formErrors.location && <p className="text-xs text-red-500 mt-1">{formErrors.location}</p>}
            </div>

            <div ref={calendarRef} className="relative">
              <div
                onClick={() => setShowCalendar((v) => !v)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setShowCalendar((v) => !v);
                }}
                className={`flex items-center justify-between border-b p-2 cursor-pointer ${
                  formErrors.date ? "border-red-500" : "border-gray-300 hover:border-gray-800"
                }`}
              >
                <span className="text-sm text-gray-700">
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                    : "Select Date"}
                </span>
                <Calendar size={18} className="text-gray-600 ml-2" />
              </div>

              {showCalendar && (
                <div className="absolute z-50 mt-2">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setFormErrors((f) => ({ ...f, date: "" }));
                      setShowCalendar(false);
                    }}
                    inline
                    minDate={new Date()}
                    calendarClassName="rounded-xl border-none shadow-none"
                  />
                </div>
              )}
              {formErrors.date && <p className="text-xs text-red-500 mt-1">{formErrors.date}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Commodity"
                aria-label="Commodity"
                value={data.commodity}
                onChange={(e) => {
                  setData((s) => ({ ...s, commodity: e.target.value }));
                  setFormErrors((f) => ({ ...f, commodity: "" }));
                }}
                className={`pl-3 border-b p-2 w-full placeholder-gray-500 focus:outline-none transition ${
                  formErrors.commodity ? "border-red-500" : "border-gray-300 focus:border-gray-800"
                }`}
              />
              {formErrors.commodity && <p className="text-xs text-red-500 mt-1">{formErrors.commodity}</p>}
            </div>

            <div>
              <input
                type="number"
                placeholder="Volume"
                aria-label="Volume"
                value={data.volume}
                onChange={(e) => {
                  setData((s) => ({ ...s, volume: e.target.value }));
                  setFormErrors((f) => ({ ...f, volume: "" }));
                }}
                className={`pl-3 border-b p-2 w-full placeholder-gray-500 focus:outline-none transition ${
                  formErrors.volume ? "border-red-500" : "border-gray-300 focus:border-gray-800"
                }`}
              />
              {formErrors.volume && <p className="text-xs text-red-500 mt-1">{formErrors.volume}</p>}
            </div>

            <div>
              <select
                value={data.unit}
                aria-label="Unit"
                onChange={(e) => {
                  setData((s) => ({ ...s, unit: e.target.value }));
                  setFormErrors((f) => ({ ...f, unit: "" }));
                }}
                className={`border-b p-2 bg-transparent text-gray-700 w-full focus:outline-none transition ${
                  formErrors.unit ? "border-red-500" : "border-gray-300 focus:border-gray-800"
                }`}
              >
                <option value="">Unit</option>
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              {formErrors.unit && <p className="text-xs text-red-500 mt-1">{formErrors.unit}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-full text-sm hover:bg-gray-50 cursor-pointer"
              type="button"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 bg-gray-900 text-white rounded-full text-sm hover:bg-gray-800 cursor-pointer ${submitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              type="button"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
