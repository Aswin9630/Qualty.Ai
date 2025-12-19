import React, { useState, useRef, useEffect, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Autocomplete, useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../../../utils/constants";
import useFetchUser from "../../../hooks/useFetchUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addEnquiries } from "../../../redux/slice/enquirySlice";

import {
  CATEGORY_OPTIONS,
  SUBCATEGORY_OPTIONS,
  COMMODITY_OPTIONS,
  URGENCY_OPTIONS,
  UNIT_OPTIONS,
  SERVICE_OPTIONS,
  CERTIFICATION_OPTIONS,
} from "../../../utils/constants";
import InspectionParametersModal from "./InspectionParametersModal";

const MAP_CONTAINER_STYLE = { width: "100%", height: "360px", borderRadius: 8 };
const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 };

const INPUT_CLASS = "p-2 rounded w-full border-[1.5px] border-gray-300 focus:outline-none focus:border-black";

const reactSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#000000" : "#D1D5DB",
    boxShadow: "none",
    minHeight: "40px",
    borderWidth: "1.5px",
    "&:hover": { borderColor: "#000000" },
  }),
  valueContainer: (p) => ({ ...p, padding: "6px 8px" }),
  indicatorsContainer: (p) => ({ ...p, height: 40 }),
  option: (p) => ({ ...p }),
};

export default function NewRaiseEnquiryFormWithMap() {
  useFetchUser()
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    resetField,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();


  const [submitting, setSubmitting] = useState(false);
  const [certError, setCertError] = useState("");

  const [countryAuto, setCountryAuto] = useState(null);
  const [locationAuto, setLocationAuto] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [markerPos, setMarkerPos] = useState(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const mapRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const country = watch("country");
  const location = watch("location");
  const dateFrom = watch("dateFrom");
  const category = watch("category");
  const subcategory = watch("subcategory");

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [inspectionModal, setInspectionModal] = useState({ open: false, type: null, initialSelected: [], initialNotes: {}, initialExtra: [] });
  const [inspectionParams, setInspectionParams] = useState({
    physical: { selected: [], extra: [] },
    chemical: { selected: [], extra: [] },
  });

  useEffect(() => {
    if (!country) {
      setSelectedCountryCode("");
      resetField("locationLat");
      resetField("locationLng");
      setMarkerPos(null);
    }
  }, [country, resetField]);

  const reverseGeocode = async ({ lat, lng }) => {
    if (!window.google || !window.google.maps) return null;
    const geocoder = new window.google.maps.Geocoder();
    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng } }, (res, status) => {
          if (status === "OK") resolve(res);
          else reject(status);
        });
      });
      return results && results[0] ? results[0] : null;
    } catch (err) {
      console.error("Reverse geocode error", err);
      return null;
    }
  };

  function countryLooksLikeIndia(countryStr) {
  if (!countryStr) return false;
  const c = String(countryStr).trim().toLowerCase();
  return c === "india" || c === "in" || c.includes("india");
}

const getCurrencySymbol = () => (countryLooksLikeIndia(watch("country")) ? "₹" : "$");


  const handleCountryPlace = () => {
    const place = countryAuto?.getPlace();
    if (!place || !place.address_components) {
      setValue("country", "", { shouldDirty: true });
      setSelectedCountryCode("");
      return;
    }
    const countryComp = place.address_components.find((c) => c.types.includes("country"));
    if (countryComp) {
      setValue("country", countryComp.long_name, { shouldDirty: true });
      setSelectedCountryCode(countryComp.short_name || "");
    } else {
      setValue("country", place.formatted_address || "", { shouldDirty: true });
      setSelectedCountryCode("");
    }
    resetField("locationLat");
    resetField("locationLng");
    setMarkerPos(null);
  };

  const handleLocationPlace = () => {
    const place = locationAuto?.getPlace();
    if (!place) return;
    const formatted = place.formatted_address || place.name || "";
    setValue("location", formatted, { shouldDirty: true });
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setValue("locationLat", lat);
      setValue("locationLng", lng);
      setMarkerPos({ lat, lng });
      setMapCenter({ lat, lng });
    }
  };

  const onMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPos({ lat, lng });
    setValue("locationLat", lat);
    setValue("locationLng", lng);
    const geo = await reverseGeocode({ lat, lng });
    const addr = geo?.formatted_address || geo?.name || `${lat}, ${lng}`;
    setValue("location", addr, { shouldDirty: true });
  };

  const onMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPos({ lat, lng });
    setValue("locationLat", lat);
    setValue("locationLng", lng);
    const geo = await reverseGeocode({ lat, lng });
    const addr = geo?.formatted_address || geo?.name || `${lat}, ${lng}`;
    setValue("location", addr, { shouldDirty: true });
  };

  const openMap = async () => {
    const lat = watch("locationLat");
    const lng = watch("locationLng");
    if (lat && lng) {
      setMapCenter({ lat: Number(lat), lng: Number(lng) });
      setMarkerPos({ lat: Number(lat), lng: Number(lng) });
      setIsMapOpen(true);
      return;
    }
    if (location && window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK" && results && results[0] && results[0].geometry) {
          const loc = results[0].geometry.location;
          const lat0 = loc.lat();
          const lng0 = loc.lng();
          setMapCenter({ lat: lat0, lng: lng0 });
          setMarkerPos({ lat: lat0, lng: lng0 });
        } else {
          setMapCenter(DEFAULT_CENTER);
          setMarkerPos(null);
        }
        setIsMapOpen(true);
      });
      return;
    }
    setMapCenter(DEFAULT_CENTER);
    setMarkerPos(null);
    setIsMapOpen(true);
  };

  const applyMarkerToLocation = async () => {
    if (!markerPos) {
      setIsMapOpen(false);
      return;
    }
    setValue("locationLat", markerPos.lat);
    setValue("locationLng", markerPos.lng);
    const geo = await reverseGeocode(markerPos);
    const addr = geo?.formatted_address || geo?.name || `${markerPos.lat}, ${markerPos.lng}`;
    setValue("location", addr, { shouldDirty: true });
    setIsMapOpen(false);
  };

  const handleCertChange = (values, field) => {
    const arr = Array.isArray(values) ? values : [];

    if (arr.length > 5) {
      setCertError("You can add up to 5 certificates only.");
      setError("certifications", { type: "max", message: "Max 5 certificates" });
      const trimmed = arr.slice(0, 5);
      field.onChange(trimmed);
      return;
    }

    const invalid = arr.find((item) => {
      const label = (item && (item.label || item.value || String(item))) || "";
      const lettersOnly = label.replace(/[^A-Za-z]/g, "");
      return lettersOnly.length > 10;
    });

    if (invalid) {
      setCertError("Each certificate name may contain at most 10 letters.");
      setError("certifications", { type: "length", message: "Max 10 letters per certificate" });
      return;
    }

    setCertError("");
    clearErrors("certifications");
    field.onChange(arr);
  };

  const preventInvalidNumberKeys = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
  };

  const handleNumberBlur = (name, value) => {
    if (value === "" || value === undefined || value === null) {
      setValue(name, "");
      clearErrors(name);
      return;
    }
    const num = Number(value);
    if (Number.isNaN(num) || num < 1) {
      setError(name, { type: "min", message: `${name === "budget" ? "Amount" : "Volume"} must be at least 1` });
      setValue(name, "");
    } else {
      clearErrors(name);
      setValue(name, num, { shouldDirty: true });
    }
  };

 const onSubmit = async (data) => {
  setSubmitting(true);
  setError("");

  try {
    const category = data.category?.value || data.category;
    const subcategory = data.subcategory?.value || data.subcategory;
    const commodity = data.commodity?.value || data.commodity;
    const unit = data.unit?.value || data.unit;
    const urgencyRaw = data.urgency?.value || data.urgency;

    const urgency = ["Low", "Medium", "High"].includes(urgencyRaw)
      ? urgencyRaw
      : "Medium";

    const budgetVal = Number(data.budget);
    const volumeVal = Number(data.volume);

    if (Number.isNaN(budgetVal) || budgetVal < 1) {
      setError("Amount must be at least 1");
      setSubmitting(false);
      return;
    }

    if (Number.isNaN(volumeVal) || volumeVal < 1) {
      setError("Volume must be at least 1");
      setSubmitting(false);
      return;
    }

    const allowedServices = ["pre-shipment", "loading", "stuffing"];
    const services = Array.isArray(data.services)
      ? data.services
          .map((s) => s.value || s.label || s)
          .map((s) => s.toLowerCase())
          .filter((s) => allowedServices.includes(s))
      : [];

    const allowedCerts = ["COC", "ISO", "ECTN", "FOSFA", "NABCB", "NABL"];
    const certifications = Array.isArray(data.certifications)
      ? data.certifications
          .map((c) => c.value || c.label || c)
          .map((c) => c.toUpperCase())
          .filter((c) => allowedCerts.includes(c))
      : [];

    const physicalInspectionParameters = inspectionParams.physical;
    const chemicalInspectionParameters = inspectionParams.chemical;

    const submissionData = {
      location: data.location,
      locationLat: data.locationLat,
      locationLng: data.locationLng,
      country: data.country,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      urgency,
      category,
      subcategory,
      commodity,
       otherRequirements: data.otherRequirements || "",
      volume: volumeVal,
      unit,
      inspectionBudget: budgetVal,
      currency: countryLooksLikeIndia(data.country) ? "INR" : "USD",
      physicalInspection: !!data.physicalInspection,
      chemicalInspection: !!data.chemicalInspection,
      physicalInspectionParameters,
      chemicalInspectionParameters,
      services,
      certifications,
      selectionSummary: `${category || ""} - ${commodity || ""} (${volumeVal || ""} ${unit || ""})`,
    };

    const response = await fetch(`${BASE_URL}/customer/raise-enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
      credentials: "include",
    }); 

    const result = await response.json();
    setSubmitting(false);

    if (!result.success) {
       toast.error(result.message || "Failed to submit enquiry") || setError(result.message || "Failed to submit enquiry");
       return;
    } else {
      dispatch(addEnquiries(result.enquiry));
      toast.success(result.message || "Enquiry submitted successfully");

      resetField("location");
      resetField("locationLat");
      resetField("locationLng");
      resetField("country");
      resetField("dateFrom");
      resetField("dateTo");
      resetField("urgency");
      resetField("category");
      resetField("subcategory");
      resetField("commodity");
      resetField("volume");
      resetField("unit");
      resetField("budget");
      resetField("physicalInspection");
      resetField("chemicalInspection");
      resetField("services");
      resetField("certifications");
      setInspectionParams({ physical: { selected: [], extra: [] }, chemical: { selected: [], extra: [] } });
      navigate("/customer/bidding");
    }
  } catch (err) {
    console.error("Error submitting enquiry:", err);
    setSubmitting(false);
     toast.error("Something went wrong. Please try again.")|| setError("Something went wrong. Please try again.");
  }
};

  if (loadError) {
    return <div className="max-w-4xl mx-auto p-6 bg-white text-red-600 rounded">Google Maps failed to load. Check API key.</div>;
  }

  const currentSubcats = SUBCATEGORY_OPTIONS[category?.value] || [];
  const currentCommodities = COMMODITY_OPTIONS[subcategory?.value] || COMMODITY_OPTIONS.default;

  const hasSavedPhysical = (inspectionParams.physical.selected?.length || 0) > 0 || (inspectionParams.physical.extra?.length || 0) > 0;
  const hasSavedChemical = (inspectionParams.chemical.selected?.length || 0) > 0 || (inspectionParams.chemical.extra?.length || 0) > 0;

  const EditIcon = ({ className = "h-5 w-5 text-gray-700" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 21v-3a2 2 0 0 1 .6-1.4L17 3a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L6.6 22.4A2 2 0 0 1 5.2 23H3z" />
      <path d="M14 7l3 3" />
    </svg>
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white text-black rounded shadow space-y-6">
        <h2 className="text-2xl font-bold text-center">Raise Inspection Enquiry</h2>
        <div>
          <h3 className="text-lg font-semibold mb-2">Inspection Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoaded ? (
              <Fragment>
                <Autocomplete
                  onLoad={(aut) => setCountryAuto(aut)}
                  onPlaceChanged={handleCountryPlace}
                  options={{ types: ["(regions)"], fields: ["address_components", "formatted_address"] }}
                >
                  <input placeholder="Select Country" className={INPUT_CLASS} type="text" />
                </Autocomplete>

                {selectedCountryCode ? (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Autocomplete
                        onLoad={(aut) => setLocationAuto(aut)}
                        onPlaceChanged={handleLocationPlace}
                        options={{
                          componentRestrictions: { country: selectedCountryCode.toLowerCase() },
                          fields: ["formatted_address", "geometry", "name"],
                        }}
                      >
                        <input
                          value={location || ""}
                          onChange={(e) => setValue("location", e.target.value, { shouldDirty: true })}
                          placeholder="Search location, address or landmark (or type)"
                          className={INPUT_CLASS}
                          type="text"
                        />
                      </Autocomplete>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button type="button" onClick={openMap} className="px-3 py-2 bg-gray-800 text-white rounded">
                        Map
                      </button>
                    </div>
                  </div>
                ) : (
                  <input placeholder="Select country first to search locations" className={`${INPUT_CLASS} bg-gray-50 text-gray-500`} disabled />
                )}
              </Fragment>
            ) : (
              <>
                <input placeholder="Country" className={INPUT_CLASS} {...register("country")} />
                <input placeholder="Location" className={INPUT_CLASS} {...register("location")} />
              </>
            )}

            <Controller
              name="dateFrom"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(d) => {
                    field.onChange(d);
                    const dt = watch("dateTo");
                    if (dt && d && new Date(dt) < new Date(d)) resetField("dateTo");
                  }}
                  minDate={new Date()}
                  placeholderText="Inspection Date From"
                  className={INPUT_CLASS}
                />
              )}
            />

            <Controller
              name="dateTo"
              control={control}
              render={({ field }) => (
                <DatePicker {...field} selected={field.value} onChange={field.onChange} minDate={dateFrom || new Date()} placeholderText="Inspection Date To" className={INPUT_CLASS} />
              )}
            />

            <Controller name="urgency" control={control} render={({ field }) => <Select {...field} options={URGENCY_OPTIONS} placeholder="Urgency" styles={reactSelectStyles} />} />
          </div>
        </div>

        {isMapOpen && isLoaded && (
          <div className="border rounded p-3 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium">Pin location on map</div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsMapOpen(false)} className="px-3 py-1 bg-gray-200 rounded">Close</button>
                <button type="button" onClick={applyMarkerToLocation} className="px-3 py-1 bg-blue-600 text-white rounded">Use this location</button>
              </div>
            </div>

            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={mapCenter}
              zoom={16}
              onLoad={(map) => (mapRef.current = map)}
              onClick={onMapClick}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                clickableIcons: false,
              }}
            >
              {markerPos && <Marker position={markerPos} draggable={true} onDragEnd={onMarkerDragEnd} />}
            </GoogleMap>

            <div className="mt-2 text-sm">
              <div><strong>Selected address:</strong> {watch("location") || "—"}</div>
              <div className="mt-1"><strong>Lat:</strong> {watch("locationLat") || "—"} <strong>Lng:</strong> {watch("locationLng") || "—"}</div>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Commodity Specification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller name="category" control={control} render={({ field }) => <Select {...field} options={CATEGORY_OPTIONS} placeholder="Category" styles={reactSelectStyles} />} />

            <Controller name="subcategory" control={control} render={({ field }) => <Select {...field} options={currentSubcats} placeholder="Subcategory" styles={reactSelectStyles} />} />

            <Controller name="commodity" control={control} render={({ field }) => <Select {...field} options={currentCommodities} placeholder="Specific Commodity" styles={reactSelectStyles} />} />


             {/* <div className="col-span-1 md:col-span-2">
      <textarea
        placeholder="Other commodity requirements (optional)"
        {...register("otherRequirements")}
        className={`${INPUT_CLASS} min-h-[80px]`}
      />
      {errors.otherRequirements && (
        <div className="text-sm text-red-600 mt-1">{errors.otherRequirements.message}</div>
      )}
    </div>
     <div className="col-span-1 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-2">Attach supporting file (optional)</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        {...register("attachment")}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-black file:text-white
                   hover:file:bg-gray-800"
      />
    </div> */}


    <div className="col-span-1 md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">Your commodity requirements (optional)</label>
  <textarea
    placeholder="Type here..."
    rows={3}
    {...register("otherRequirements")}
    className={`${INPUT_CLASS} resize-none text-sm`}
  />
  {errors.otherRequirements && (
    <div className="text-sm text-red-600 mt-1">{errors.otherRequirements.message}</div>
  )}
</div>

<div className="col-span-1 md:col-span-2">
  <label className="block text-sm font-medium text-gray-700 mb-1">Attach requirement file (optional)</label>
  <input
    type="file"
    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
    {...register("attachment")}
    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
  />
</div>



            <div className="col-span-1 md:col-span-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("physicalInspection")}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setInspectionModal({
                        open: true,
                        type: "physical",
                        initialSelected: inspectionParams.physical.selected.map((p) => p.key),
                        initialNotes: inspectionParams.physical.selected.reduce((acc, p) => ({ ...acc, [p.key]: p.notes || "" }), {}),
                        initialExtra: inspectionParams.physical.extra || [],
                      });
                    } else {
                    }
                  }}
                />
                <span className="text-sm">Physical Inspection</span>
              </div>

              {hasSavedPhysical && (
                <button
                  type="button"
                  aria-label="Edit physical parameters"
                  onClick={() =>
                    setInspectionModal({
                      open: true,
                      type: "physical",
                      initialSelected: inspectionParams.physical.selected.map((p) => p.key),
                      initialNotes: inspectionParams.physical.selected.reduce((acc, p) => ({ ...acc, [p.key]: p.notes || "" }), {}),
                      initialExtra: inspectionParams.physical.extra || [],
                    })
                  }
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <span className="sr-only">Edit physical parameters</span>
                  <svg className="h-5 w-5 cursor-pointer text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 21v-3a2 2 0 0 1 .6-1.4L17 3a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L6.6 22.4A2 2 0 0 1 5.2 23H3z" />
                    <path d="M14 7l3 3" />
                  </svg>
                </button>
              )}

              <div className="flex items-center gap-2 ml-2">
                <input
                  type="checkbox"
                  {...register("chemicalInspection")}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setInspectionModal({
                        open: true,
                        type: "chemical",
                        initialSelected: inspectionParams.chemical.selected.map((p) => p.key),
                        initialNotes: inspectionParams.chemical.selected.reduce((acc, p) => ({ ...acc, [p.key]: p.notes || "" }), {}),
                        initialExtra: inspectionParams.chemical.extra || [],
                      });
                    } else {
                    }
                  }}
                />
                <span className="text-sm">Chemical Inspection</span>
              </div>

              {hasSavedChemical && (
                <button
                  type="button"
                  aria-label="Edit chemical parameters"
                  onClick={() =>
                    setInspectionModal({
                      open: true,
                      type: "chemical",
                      initialSelected: inspectionParams.chemical.selected.map((p) => p.key),
                      initialNotes: inspectionParams.chemical.selected.reduce((acc, p) => ({ ...acc, [p.key]: p.notes || "" }), {}),
                      initialExtra: inspectionParams.chemical.extra || [],
                    })
                  }
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <span className="sr-only">Edit chemical parameters</span>
                  <svg className="h-5 w-5 text-gray-700 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 21v-3a2 2 0 0 1 .6-1.4L17 3a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L6.6 22.4A2 2 0 0 1 5.2 23H3z" />
                    <path d="M14 7l3 3" />
                  </svg>
                </button>
              )}

              <div className="ml-auto text-sm text-gray-600 space-y-1">
                {hasSavedPhysical && inspectionParams.physical.selected.length > 0 && (
                  <div><strong className="font-medium">P:</strong> {inspectionParams.physical.selected.map(p => p.label).slice(0,3).join(", ")}{inspectionParams.physical.selected.length>3 ? "…" : ""}</div>
                )}
                {hasSavedChemical && inspectionParams.chemical.selected.length > 0 && (
                  <div><strong className="font-medium">C:</strong> {inspectionParams.chemical.selected.map(p => p.label).slice(0,3).join(", ")}{inspectionParams.chemical.selected.length>3 ? "…" : ""}</div>
                )}
              </div>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-600">{getCurrencySymbol()}</span>
              <input
                type="number"
                placeholder={`Enter budget in ${getCurrencySymbol()}`}
                step="1"
                min="1"
                inputMode="numeric"
                onKeyDown={preventInvalidNumberKeys}
                onBlur={(e) => handleNumberBlur("budget", e.target.value)}
                {...register("budget", {
                  valueAsNumber: true,
                  validate: (v) => (v === "" || Number(v) >= 1) || "Amount must be at least 1",
                })}
                className={`pl-8 ${INPUT_CLASS}`}
              />
              {errors.budget && <div className="text-sm text-red-600 mt-1">{errors.budget.message}</div>}
            </div>

            <div>
              <input
                type="number"
                placeholder="Volume"
                min="1"
                step="1"
                inputMode="numeric"
                onKeyDown={preventInvalidNumberKeys}
                onBlur={(e) => handleNumberBlur("volume", e.target.value)}
                {...register("volume", {
                  valueAsNumber: true,
                  validate: (v) => (v === "" || Number(v) >= 1) || "Volume must be at least 1",
                })}
                className={INPUT_CLASS}
              />
              {errors.volume && <div className="text-sm text-red-600 mt-1">{errors.volume.message}</div>}
            </div>

            <Controller name="unit" control={control} render={({ field }) => <Select {...field} options={UNIT_OPTIONS} placeholder="Unit" styles={reactSelectStyles} />} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Service & Compliance</h3>
          <div className="grid grid-cols-1 gap-4">
            <Controller name="services" control={control} render={({ field }) => <Select {...field} options={SERVICE_OPTIONS} isMulti placeholder="Additional Services" styles={reactSelectStyles} />} />

            <Controller
              name="certifications"
              control={control}
              render={({ field }) => (
                <div>
                  <CreatableSelect
                    {...field}
                    isMulti
                    options={CERTIFICATION_OPTIONS}
                    placeholder="Certifications Required (Select or type your own certificate)"
                    onChange={(v) => handleCertChange(v, field)}
                    value={field.value || []}
                    styles={reactSelectStyles}
                  />
                  {certError ? <div className="text-sm text-red-600 mt-1">{certError}</div> : null}
                  {errors.certifications && !certError ? <div className="text-sm text-red-600 mt-1">{errors.certifications.message}</div> : null}
                </div>
              )}
            />
          </div>
        </div>

        <input type="hidden" {...register("physicalInspectionParameters")} />
        <input type="hidden" {...register("chemicalInspectionParameters")} />

        <div>
          <button type="submit" disabled={submitting} className="w-full py-3 bg-black text-white rounded cursor-pointer">
            {submitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </form>

      <InspectionParametersModal
        open={inspectionModal.open}
        type={inspectionModal.type}
        initialSelected={inspectionModal.initialSelected}
        initialNotes={inspectionModal.initialNotes}
        initialExtra={inspectionModal.initialExtra}
        onClose={() => setInspectionModal((s) => ({ ...s, open: false }))}
        onSave={(selectedParameters, extraRequirements) => {
          const key = inspectionModal.type; 
          setInspectionParams((prev) => ({
            ...prev,
            [key]: { selected: selectedParameters, extra: extraRequirements },
          }));
          setValue(`${key}InspectionParameters`, { parameters: selectedParameters, extra: extraRequirements });
          setInspectionModal((s) => ({ ...s, open: false }));
        }}
      />
    </>
  );
}
