// import React, { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import Select from "react-select";
// import CreatableSelect from "react-select/creatable";
// import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
// import "react-datepicker/dist/react-datepicker.css";

// /* --- Options (example lists, replace/expand as required) --- */
// const urgencyOptions = [
//   { value: "low", label: "Low" },
//   { value: "medium", label: "Medium" },
//   { value: "high", label: "High" },
// ];

// const categoryOptions = [
//   { value: "agriculture", label: "Agriculture" },
//   { value: "electronics", label: "Electronics" },
// ];

// const subcategoryOptions = {
//   agriculture: [{ value: "grains", label: "Grains" }],
//   electronics: [{ value: "mobile", label: "Mobile Devices" }],
// };

// const commodityOptions = {
//   grains: [{ value: "wheat", label: "Wheat" }],
//   mobile: [{ value: "smartphone", label: "Smartphone" }],
// };

// const unitOptions = [
//   { value: "kg", label: "Kilograms" },
//   { value: "tons", label: "Tons" },
// ];

// const serviceOptions = [
//   { value: "pre-shipment", label: "Pre-shipment Inspection" },
//   { value: "loading", label: "Loading Truck" },
//   { value: "stuffing", label: "Stuffing Container" },
// ];

// const certificationOptions = [
//   { value: "NABL", label: "NABL" },
//   { value: "NABCB", label: "NABCB" },
//   { value: "COC", label: "COC" },
//   { value: "ISO", label: "ISO" },
//   { value: "FOSFE", label: "FOSFE" },
// ];

// /* --- Component --- */
// export default function NewRaiseEnquiryForm() {
//   const { control, handleSubmit, watch, setValue, register, resetField } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [countryAuto, setCountryAuto] = useState(null);
//   const [locationAuto, setLocationAuto] = useState(null);
//   const [selectedCountryCode, setSelectedCountryCode] = useState("");

//   const category = watch("category");
//   const subcategory = watch("subcategory");
//   const country = watch("country");
//   const dateFrom = watch("dateFrom");

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],
//   });

//   useEffect(() => {
//     // clear location when country changes
//     setValue("location", "");
//     if (!country) setSelectedCountryCode("");
//   }, [country, setValue]);

//   const getCurrencySymbol = () => {
//     if (String(country || "").toLowerCase() === "india") return "₹";
//     return "$";
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // normalize creatable certs to array of strings (value or label)
//       if (Array.isArray(data.certifications)) {
//         data.certifications = data.certifications.map((c) => c.value || c.label || c);
//       }
//       if (Array.isArray(data.services)) {
//         data.services = data.services.map((s) => s.value || s.label || s);
//       }
//       // map select objects to values for category/subcategory/commodity/unit/urgency
//       if (data.category) data.category = data.category.value || data.category;
//       if (data.subcategory) data.subcategory = data.subcategory.value || data.subcategory;
//       if (data.commodity) data.commodity = data.commodity.value || data.commodity;
//       if (data.unit) data.unit = data.unit.value || data.unit;
//       if (data.urgency) data.urgency = data.urgency.value || data.urgency;

//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const result = await res.json();
//       console.log("submitted", result);
//       // reset form or show success as needed
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loadError) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
//         <p className="text-red-600">Google Maps failed to load. Check your API key and network.</p>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-4xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg space-y-8"
//     >
//       <h2 className="text-2xl font-bold text-center">Raise Inspection Enquiry</h2>

//       {/* Inspection Details */}
//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold">Inspection Details</h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Country Autocomplete */}
//           {isLoaded ? (
//             <>
//               <Autocomplete
//                 onLoad={(aut) => setCountryAuto(aut)}
//                 onPlaceChanged={() => {
//                   const place = countryAuto?.getPlace();
//                   if (!place || !place.address_components) {
//                     setValue("country", "");
//                     setSelectedCountryCode("");
//                     return;
//                   }
//                   const countryComponent = place.address_components.find((c) =>
//                     c.types.includes("country")
//                   );
//                   if (countryComponent) {
//                     setValue("country", countryComponent.long_name, { shouldDirty: true });
//                     setSelectedCountryCode(countryComponent.short_name || "");
//                   } else {
//                     setValue("country", place.formatted_address || "", { shouldDirty: true });
//                     setSelectedCountryCode("");
//                   }
//                 }}
//                 options={{ types: ["(regions)"], fields: ["address_components", "formatted_address"] }}
//               >
//                 <input
//                   name="countryInput"
//                   placeholder="Select Country"
//                   className="p-2 border rounded w-full"
//                   type="text"
//                 />
//               </Autocomplete>

//               {/* Location shows only after country selection */}
//               {selectedCountryCode ? (
//                 <Autocomplete
//                   onLoad={(aut) => setLocationAuto(aut)}
//                   onPlaceChanged={() => {
//                     const place = locationAuto?.getPlace();
//                     if (!place) return;
//                     // store full formatted address
//                     const formatted = place.formatted_address || place.name || "";
//                     setValue("location", formatted, { shouldDirty: true });
//                     // if you want lat/lng:
//                     if (place.geometry?.location) {
//                       const lat = place.geometry.location.lat();
//                       const lng = place.geometry.location.lng();
//                       setValue("locationLat", lat);
//                       setValue("locationLng", lng);
//                     }
//                   }}
//                   options={{
//                     // allow full address/places inside the selected country
//                     componentRestrictions: { country: selectedCountryCode.toLowerCase() },
//                     fields: ["formatted_address", "geometry", "name"],
//                   }}
//                 >
//                   <input
//                     name="locationInput"
//                     placeholder="Search location, address or landmark"
//                     className="p-2 border rounded w-full"
//                     type="text"
//                     onFocus={(e) => {
//                       // If user hasn't selected a country but typed country text in country input,
//                       // we try to derive the country code from the watch('country')
//                       if (!selectedCountryCode && country) {
//                         // no op here; selectedCountryCode is set only via autocomplete selection
//                       }
//                     }}
//                   />
//                 </Autocomplete>
//               ) : (
//                 // if country not selected, show disabled location field with hint
//                 <input
//                   placeholder="Select country first to search locations"
//                   className="p-2 border rounded w-full bg-gray-50 text-gray-500"
//                   disabled
//                 />
//               )}
//             </>
//           ) : (
//             // fallback inputs if google maps not loaded yet
//             <>
//               <input
//                 placeholder="Country"
//                 className="p-2 border rounded w-full"
//                 {...register("country")}
//               />
//               <input
//                 placeholder="Location"
//                 className="p-2 border rounded w-full"
//                 {...register("location")}
//               />
//             </>
//           )}

//           {/* Date From */}
//           <Controller
//             name="dateFrom"
//             control={control}
//             render={({ field }) => (
//               <DatePicker
//                 {...field}
//                 selected={field.value}
//                 onChange={(d) => {
//                   field.onChange(d);
//                   // if dateTo exists and earlier than new from, clear dateTo
//                   const dt = watch("dateTo");
//                   if (dt && d && new Date(dt) < new Date(d)) {
//                     resetField("dateTo");
//                   }
//                 }}
//                 minDate={new Date()}
//                 placeholderText="Inspection Date From"
//                 className="p-2 border rounded w-full"
//               />
//             )}
//           />

//           {/* Date To - minDate depends on dateFrom */}
//           <Controller
//             name="dateTo"
//             control={control}
//             render={({ field }) => (
//               <DatePicker
//                 {...field}
//                 selected={field.value}
//                 onChange={field.onChange}
//                 minDate={dateFrom || new Date()}
//                 placeholderText="Inspection Date To"
//                 className="p-2 border rounded w-full"
//               />
//             )}
//           />

//           {/* Urgency */}
//           <Controller
//             name="urgency"
//             control={control}
//             render={({ field }) => <Select {...field} options={urgencyOptions} placeholder="Urgency" />}
//           />
//         </div>
//       </div>

//       {/* Commodity Specification */}
//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold">Commodity Specification</h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <Controller
//             name="category"
//             control={control}
//             render={({ field }) => <Select {...field} options={categoryOptions} placeholder="Category" />}
//           />

//           <Controller
//             name="subcategory"
//             control={control}
//             render={({ field }) => (
//               <Select {...field} options={subcategoryOptions[field.value?.value || category?.value] || subcategoryOptions[category?.value] || []} placeholder="Subcategory" />
//             )}
//           />

//           <Controller
//             name="commodity"
//             control={control}
//             render={({ field }) => (
//               <Select {...field} options={commodityOptions[subcategory?.value] || []} placeholder="Specific Commodity" />
//             )}
//           />

//           {/* show inspection type checkboxes only after category + commodity selected */}
//           {category && subcategory && (
//             <div className="col-span-2 flex gap-6 items-center">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" {...register("physicalInspection")} />
//                 Physical Inspection
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" {...register("chemicalInspection")} />
//                 Chemical Inspection
//               </label>
//             </div>
//           )}

//           {/* Budget with currency prefix */}
//           <div className="relative">
//             <span className="absolute left-3 top-3 text-gray-600">{getCurrencySymbol()}</span>
//             <input
//               type="number"
//               placeholder={`Enter budget in ${getCurrencySymbol()}`}
//               {...register("budget")}
//               className="pl-8 p-2 border rounded w-full"
//             />
//           </div>

//           <input type="number" placeholder="Volume" {...register("volume")} className="p-2 border rounded w-full" />

//           <Controller name="unit" control={control} render={({ field }) => <Select {...field} options={unitOptions} placeholder="Unit" />} />
//         </div>
//       </div>

//       {/* Service & Compliance */}
//       <div className="space-y-4">
//         <h3 className="text-xl font-semibold">Service & Compliance</h3>

//         <Controller
//           name="services"
//           control={control}
//           render={({ field }) => <Select {...field} options={serviceOptions} isMulti placeholder="Additional Services" />}
//         />

//         <Controller
//           name="certifications"
//           control={control}
//           render={({ field }) => (
//             <CreatableSelect
//               {...field}
//               isMulti
//               options={certificationOptions}
//               placeholder="Certifications Required"
//               onChange={(newValue) => field.onChange(newValue)}
//             />
//           )}
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3 cursor-pointer bg-black text-white font-semibold rounded hover:bg-gray-800 transition flex items-center justify-center"
//         disabled={loading}
//       >
//         {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" /> : "Submit Enquiry"}
//       </button>
//     </form>
//   );
// }


import React, { useState, useRef, useEffect, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Autocomplete, useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";

/* ----- Example options (keep as before) ----- */
const urgencyOptions = [{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }];
const categoryOptions = [{ value: "agriculture", label: "Agriculture" }, { value: "electronics", label: "Electronics" }];
const subcategoryOptions = { agriculture: [{ value: "grains", label: "Grains" }], electronics: [{ value: "mobile", label: "Mobile Devices" }] };
const commodityOptions = { grains: [{ value: "wheat", label: "Wheat" }], mobile: [{ value: "smartphone", label: "Smartphone" }] };
const unitOptions = [{ value: "kg", label: "Kilograms" }, { value: "tons", label: "Tons" }];
const serviceOptions = [{ value: "pre-shipment", label: "Pre-shipment Inspection" }, { value: "loading", label: "Loading Truck" }, { value: "stuffing", label: "Stuffing Container" }];
const certificationOptions = [{ value: "NABL", label: "NABL" }, { value: "NABCB", label: "NABCB" }, { value: "COC", label: "COC" }, { value: "ISO", label: "ISO" }, { value: "FOSFE", label: "FOSFE" }];

/* ----- Map container style ----- */
const MAP_CONTAINER_STYLE = { width: "100%", height: "320px", borderRadius: 8, overflow: "hidden" };

/* ----- Default center (fallback) ----- */
const DEFAULT_CENTER = { lat: 20.5937, lng: 78.9629 }; // India centroid fallback

export default function NewRaiseEnquiryFormWithMap() {
  const { control, handleSubmit, watch, setValue, register, resetField } = useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Google Maps / Places
  const [countryAuto, setCountryAuto] = useState(null);
  const [locationAuto, setLocationAuto] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);

  // marker state
  const [markerPos, setMarkerPos] = useState(null); // { lat, lng }
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // watch form values
  const country = watch("country");
  const location = watch("location");
  const dateFrom = watch("dateFrom");
  const category = watch("category");
  const subcategory = watch("subcategory");

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  /* ----- Helper: reverse geocode (lat,lng -> formatted address) ----- */
  const reverseGeocode = async (latLng) => {
    if (!window.google || !window.google.maps) return null;
    try {
      const geocoder = new window.google.maps.Geocoder();
      const res = await geocoder.geocode({ location: latLng });
      if (res && res[0]) return res[0]; // full result object
      return null;
    } catch (err) {
      console.error("Reverse geocode failed", err);
      return null;
    }
  };

  /* ----- When user selects country via autocomplete ----- */
  const handleCountryPlace = () => {
    const place = countryAuto?.getPlace();
    if (!place || !place.address_components) {
      setValue("country", "");
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
    // reset previously chosen location & marker
    resetField("location");
    resetField("locationLat");
    resetField("locationLng");
    setMarkerPos(null);
  };

  /* ----- When user selects a place/address from Autocomplete for location ----- */
  const handleLocationPlace = async () => {
    const place = locationAuto?.getPlace();
    if (!place) return;
    const formatted = place.formatted_address || place.name || "";
    setValue("location", formatted, { shouldDirty: true });
    // set lat/lng if available
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setValue("locationLat", lat);
      setValue("locationLng", lng);
      setMarkerPos({ lat, lng });
      setMapCenter({ lat, lng });
    }
  };

  /* ----- Map click / marker drag handlers ----- */
  const onMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPos({ lat, lng });
    setValue("locationLat", lat);
    setValue("locationLng", lng);
    const geo = await reverseGeocode({ lat, lng });
    if (geo) {
      setValue("location", geo.formatted_address);
    }
  };

  const onMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPos({ lat, lng });
    setValue("locationLat", lat);
    setValue("locationLng", lng);
    const geo = await reverseGeocode({ lat, lng });
    if (geo) setValue("location", geo.formatted_address);
  };

  /* ----- Open map and set center based on existing location or country ----- */
  const openMap = async () => {
    // if lat/lng present in form, center on them
    const lat = watch("locationLat");
    const lng = watch("locationLng");
    if (lat && lng) {
      setMapCenter({ lat: Number(lat), lng: Number(lng) });
      setMarkerPos({ lat: Number(lat), lng: Number(lng) });
      setIsMapOpen(true);
      return;
    }

    // else if there's a manual location text, try geocode it
    if (location) {
      try {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: location }, (results, status) => {
          if (status === "OK" && results && results[0] && results[0].geometry) {
            const loc = results[0].geometry.location;
            const lat0 = loc.lat();
            const lng0 = loc.lng();
            setMapCenter({ lat: lat0, lng: lng0 });
            setMarkerPos({ lat: lat0, lng: lng0 });
          } else {
            // fallback: center by country if available
            if (selectedCountryCode) {
              // center to country bounding box would be better; use default for now
              setMapCenter(DEFAULT_CENTER);
              setMarkerPos(null);
            }
          }
          setIsMapOpen(true);
        });
        return;
      } catch (err) {
        console.warn("Geocode attempt failed", err);
      }
    }

    // fallback: center to selected country (if we had a way to geocode country)
    if (selectedCountryCode) {
      setMapCenter(DEFAULT_CENTER);
      setMarkerPos(null);
    }
    setIsMapOpen(true);
  };

  /* ----- Submit handler: normalize values before send ----- */
  const onSubmit = async (data) => {
    setLoadingSubmit(true);
    try {
      // normalize select values
      if (data.category) data.category = data.category.value || data.category;
      if (data.subcategory) data.subcategory = data.subcategory.value || data.subcategory;
      if (data.commodity) data.commodity = data.commodity.value || data.commodity;
      if (data.unit) data.unit = data.unit.value || data.unit;
      if (data.urgency) data.urgency = data.urgency.value || data.urgency;

      // normalize multi selects
      if (Array.isArray(data.certifications)) data.certifications = data.certifications.map((c) => c.value || c.label || c);
      if (Array.isArray(data.services)) data.services = data.services.map((s) => s.value || s.label || s);

      console.log("submit payload", data);
      // send to your backend
      // await fetch("/api/enquiry", { method: "POST", body: JSON.stringify(data) });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  /* ----- Render ----- */
  if (loadError) {
    return <div className="p-6 text-red-600">Google Maps failed to load. Check API key.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">Raise Inspection Enquiry</h2>

      {/* Inspection Details */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Inspection Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Country Autocomplete */}
          {isLoaded ? (
            <Fragment>
              <Autocomplete
                onLoad={(aut) => setCountryAuto(aut)}
                onPlaceChanged={handleCountryPlace}
                options={{ types: ["(regions)"], fields: ["address_components", "formatted_address"] }}
              >
                <input placeholder="Select Country" className="p-2 border rounded w-full" type="text" />
              </Autocomplete>

              {/* Location Autocomplete */}
              {selectedCountryCode ? (
                <div className="flex gap-2">
                  <Autocomplete
                    onLoad={(aut) => setLocationAuto(aut)}
                    onPlaceChanged={handleLocationPlace}
                    options={{
                      componentRestrictions: { country: selectedCountryCode.toLowerCase() },
                      fields: ["formatted_address", "geometry", "name"],
                    }}
                  >
                    <input placeholder="Search location, address or landmark" className="p-2 border rounded w-full" type="text" />
                  </Autocomplete>

                  {/* Open map button */}
                  <button type="button" onClick={openMap} className="px-3 bg-gray-800 text-white rounded">
                    Map
                  </button>
                </div>
              ) : (
                <input placeholder="Select country first to search locations" className="p-2 border rounded w-full bg-gray-50 text-gray-500" disabled />
              )}
            </Fragment>
          ) : (
            <>
              <input placeholder="Country" className="p-2 border rounded w-full" {...register("country")} />
              <input placeholder="Location" className="p-2 border rounded w-full" {...register("location")} />
            </>
          )}

          {/* Date From */}
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
                className="p-2 border rounded w-full"
              />
            )}
          />

          {/* Date To */}
          <Controller
            name="dateTo"
            control={control}
            render={({ field }) => (
              <DatePicker {...field} selected={field.value} onChange={field.onChange} minDate={dateFrom || new Date()} placeholderText="Inspection Date To" className="p-2 border rounded w-full" />
            )}
          />

          {/* Urgency */}
          <Controller name="urgency" control={control} render={({ field }) => <Select {...field} options={urgencyOptions} placeholder="Urgency" />} />
        </div>
      </div>

      {/* Inline Map Modal / Panel */}
      {isMapOpen && isLoaded && (
        <div className="border rounded p-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Pin location on map</div>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setIsMapOpen(false); }} className="px-3 py-1 bg-gray-200 rounded">Close</button>
              <button type="button" onClick={async () => {
                // confirm selection: pan map and close
                setIsMapOpen(false);
              }} className="px-3 py-1 bg-blue-600 text-white rounded">Use this location</button>
            </div>
          </div>

          <GoogleMap
            mapContainerStyle={MAP_CONTAINER_STYLE}
            center={mapCenter}
            zoom={12}
            onLoad={(map) => (mapRef.current = map)}
            onClick={onMapClick}
          >
            {markerPos && (
              <Marker position={markerPos} draggable={true} onDragEnd={onMarkerDragEnd} ref={markerRef} />
            )}
          </GoogleMap>
          <div className="mt-2 text-sm">
            <div><strong>Selected address:</strong> {watch("location") || "—"}</div>
            <div><strong>Lat:</strong> {watch("locationLat") || "—"} <strong>Lng:</strong> {watch("locationLng") || "—"}</div>
          </div>
        </div>
      )}

      {/* Commodity Spec */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Commodity Specification</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller name="category" control={control} render={({ field }) => <Select {...field} options={categoryOptions} placeholder="Category" />} />
          <Controller name="subcategory" control={control} render={({ field }) => <Select {...field} options={subcategoryOptions[category?.value] || []} placeholder="Subcategory" />} />
          <Controller name="commodity" control={control} render={({ field }) => <Select {...field} options={commodityOptions[subcategory?.value] || []} placeholder="Specific Commodity" />} />

          {category && subcategory && (
            <div className="col-span-2 flex gap-6 items-center">
              <label className="flex items-center gap-2"><input type="checkbox" {...register("physicalInspection")} /> Physical Inspection</label>
              <label className="flex items-center gap-2"><input type="checkbox" {...register("chemicalInspection")} /> Chemical Inspection</label>
            </div>
          )}

          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-600">{(String(country || "").toLowerCase() === "india") ? "₹" : "$"}</span>
            <input type="number" placeholder={`Enter budget in ${(String(country || "").toLowerCase() === "india") ? "₹" : "$"}`} {...register("budget")} className="pl-8 p-2 border rounded w-full" />
          </div>

          <input type="number" placeholder="Volume" {...register("volume")} className="p-2 border rounded w-full" />
          <Controller name="unit" control={control} render={({ field }) => <Select {...field} options={unitOptions} placeholder="Unit" />} />
        </div>
      </div>

      {/* Service & Compliance */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Service & Compliance</h3>
        <div className="grid grid-cols-1 gap-4">
          <Controller name="services" control={control} render={({ field }) => <Select {...field} options={serviceOptions} isMulti placeholder="Additional Services" />} />
          <Controller name="certifications" control={control} render={({ field }) => <CreatableSelect {...field} isMulti options={certificationOptions} placeholder="Certifications Required" onChange={(v) => field.onChange(v)} />} />
        </div>
      </div>

      {/* Hidden fields for lat/lng (useful for submit) */}
      <input type="hidden" {...register("locationLat")} />
      <input type="hidden" {...register("locationLng")} />

      <div>
        <button type="submit" disabled={loadingSubmit} className="w-full py-3 bg-black text-white rounded">
          {loadingSubmit ? "Submitting..." : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}

