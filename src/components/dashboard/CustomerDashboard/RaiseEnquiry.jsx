import React, { useState } from "react";
import { X, FileText, CheckCircle } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import useFetchUser from "../../../hooks/useFetchUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addEnquiries } from "../../../redux/slice/enquirySlice";
import { FaRegEdit } from "react-icons/fa";


const commodityData = {
  "Food & Beverages": {
    Rice: ["Basmati Rice", "Jasmine Rice", "Brown Rice", "White Rice"],
    Wheat: ["Wheat Flour", "Whole Wheat", "Durum Wheat"],
    Pulses: ["Lentils", "Chickpeas", "Black Beans"],
  },
  "Textiles & Garments": {
    Cotton: ["Organic Cotton", "Conventional Cotton"],
    Silk: ["Mulberry Silk", "Tussar Silk"],
  },
  Electronics: {
    Devices: ["Smartphones", "Laptops"],
    Components: ["Resistors", "Capacitors"],
  },
  Other: {},
};

const units = [
  "Kg",
  "Tons",
  "Pieces",
  "Cartons",
  "Pallets",
  "Containers",
  "Liters",
  "Cubic Meters",
];

const additionalServicesOptions = [
  "Pre-Shipment Inspection",
  "Loading Truck",
  "Stuffing Container",
];

const certificationOptions = [
  {
    value: "NABL",
    label: "NABL",
    description:
      "National Accreditation Board for Testing and Calibration Laboratories",
  },
  {
    value: "NABCB",
    label: "NABCB",
    description: "National Accreditation Board for Certification Bodies",
  },
  { value: "COC", label: "COC", description: "Certificate of Conformity" },
  {
    value: "FOSFE",
    label: "FOSFE",
    description: "Federation of Seed & Farm Equipment",
  },
  {
    value: "GAFTA",
    label: "GAFTA",
    description: "Grain and Feed Trade Association",
  },
  {
    value: "ISO",
    label: "ISO",
    description: "International Organization for Standardization",
  },
];

const RaiseEnquiry = () => {
  const [loading, setLoading] = useState(false);
  useFetchUser();
  const user = useSelector((store) => store?.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  const inputClass =
    "w-full px-4 py-2 bg-white border border-gray-500 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const [formData, setFormData] = useState({
    inspectionLocation: "",
    country: "",
    urgencyLevel: "",
    commodityCategory: "",
    subCommodity: "",
    specificCommodity: "",
    volume: "",
    unit: "",
    inspectionDateFrom: "",
    inspectionDateTo: "",
    inspectionTypes: [],
    physicalParameters: "",
    chemicalParameters: "",
    additionalServices: "",
    certifications: "",
    companyEmail: "",
    companyPhoneNumber: "",
    specialRequirements: "",
    description: "",
    inspectionBudget: "",
    role: user?.role,
  });

  const [ricePhysicalParams, setRicePhysicalParams] = useState({
    broken: 0,
    yellowKernel: 0,
    redKernel: 0,
    chalkyRice: 0,
    millingDegree: "",
    purity: 0,
    damageKernel: 0,
    paddyKernel: 0,
    liveInsects: "",
    averageGrainLength: 0,
  });

  const [modalState, setModalState] = useState({
    ricePhysical: false,
    genericPhysical: false,
    genericChemical: false,
  });

  const [tempGenericParams, setTempGenericParams] = useState({
    physical: "",
    chemical: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Open appropriate parameter modal based on commodity and inspection type
      if (formData.subCommodity === "Rice" && value === "Physical") {
        setModalState((prev) => ({ ...prev, ricePhysical: true }));
      } else if (value === "Physical") {
        setModalState((prev) => ({ ...prev, genericPhysical: true }));
      } else if (value === "Chemical") {
        setModalState((prev) => ({ ...prev, genericChemical: true }));
      }
    }

    setFormData((prev) => {
      const updated = checked
        ? [...prev.inspectionTypes, value]
        : prev.inspectionTypes.filter((type) => type !== value);
      return { ...prev, inspectionTypes: updated };
    });
  };

  const handleRiceParamChange = (e) => {
    const { name, value } = e.target;
    setRicePhysicalParams((prev) => ({
      ...prev,
      [name]: ["millingDegree", "liveInsects"].includes(name)
        ? value
        : parseFloat(value) || 0,
    }));
  };

  const handleGenericParamChange = (type, value) => {
    setTempGenericParams((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const saveRiceParameters = () => {
    const paramString = Object.entries(ricePhysicalParams)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    setFormData((prev) => ({ ...prev, physicalParameters: paramString }));
    setModalState((prev) => ({ ...prev, ricePhysical: false }));
  };

  const saveGenericParameters = (type) => {
    if (type === "physical") {
      setFormData((prev) => ({
        ...prev,
        physicalParameters: tempGenericParams.physical,
      }));
      setModalState((prev) => ({ ...prev, genericPhysical: false }));
    } else if (type === "chemical") {
      setFormData((prev) => ({
        ...prev,
        chemicalParameters: tempGenericParams.chemical,
      }));
      setModalState((prev) => ({ ...prev, genericChemical: false }));
    }
  };

  const closeModal = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    setError("");

    const fromDate = new Date(formData.inspectionDateFrom);
    const toDate = new Date(formData.inspectionDateTo);
    const now = new Date();

    if (fromDate < now || toDate < now) {
      setError("Inspection dates must be in the future.");
      setLoading(false);
      return;
    }

    const submissionData = {
      inspectionLocation: formData.inspectionLocation,
      country: formData.country,
      urgencyLevel: formData.urgencyLevel,
      commodityCategory: formData.commodityCategory,
      subCommodity: formData.subCommodity,
      volume: formData.volume,
      inspectionBudget: Number(formData.inspectionBudget) || 0,

      inspectionDate: {
        from: formData.inspectionDateFrom || null,
        to: formData.inspectionDateTo || null,
      },

      inspectionTypes: {
        physical: formData.inspectionTypes.includes("Physical"),
        chemical: formData.inspectionTypes.includes("Chemical"),
      },

      physicalParameters:
        formData.subCommodity === "Rice" ? ricePhysicalParams : {},

      chemicalParameters: formData.chemicalParameters
        ? [formData.chemicalParameters]
        : [],

      additionalServices: formData.additionalServices
        ? [formData.additionalServices]
        : [],

      certifications: formData.certifications ? [formData.certifications] : [],

      contact: {
        email: formData.companyEmail,
        phoneNumber: formData.companyPhoneNumber,
      },

      specialRequirements: formData.specialRequirements,
      description: formData.description,
    };

    try {
      const response = await fetch(`${BASE_URL}/customer/raise-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });
      const data = await response.json();
      setLoading(false);

      if (!data.success) {
        setError(data.message || "Failed to submit enquiry");
      } else {
        dispatch(addEnquiries(data.enquiry));
        toast.success(data.message || "Enquiry submitted successfully");
        setError("");
        setFormData({
          inspectionLocation: "",
          country: "",
          urgencyLevel: "",
          commodityCategory: "",
          subCommodity: "",
          specificCommodity: "",
          volume: "",
          unit: "",
          inspectionDateFrom: "",
          inspectionDateTo: "",
          inspectionTypes: [],
          physicalParameters: "",
          chemicalParameters: "",
          additionalServices: "",
          certifications: "",
          companyEmail: "",
          companyPhoneNumber: "",
          specialRequirements: "",
          description: "",
          inspectionBudget: "",
          role: user?.role,
        });
        navigate("/customer/bidding");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  const categoryOptions = Object.keys(commodityData);
  const subCategoryOptions = formData.commodityCategory
    ? Object.keys(commodityData[formData.commodityCategory] || {})
    : [];
  const specificOptions =
    formData.subCommodity &&
    commodityData[formData.commodityCategory]?.[formData.subCommodity]
      ? commodityData[formData.commodityCategory][formData.subCommodity]
      : [];

  const hasPhysicalParams = formData.physicalParameters;
  const hasChemicalParams = formData.chemicalParameters;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-gray-100">
       <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900 border-b pb-4 flex items-center justify-center gap-2">
  <FaRegEdit className="text-gray-700 text-2xl" />
  Raise Inspection Enquiry
</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">
              Inspection Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input
                name="inspectionLocation"
                placeholder="Inspection Location"
                value={formData.inspectionLocation}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Urgency Level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High - Urgent</option>
              </select>

              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-norma text-gray-600 mb-2">
                  Inspection Types
                </label>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value="Physical"
                      checked={formData.inspectionTypes.includes("Physical")}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-5 w-5 text-black border-gray-400 rounded focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    <span className="flex items-center gap-1 text-gray-700 font-norma">
                      Physical
                      {hasPhysicalParams && (
                        <CheckCircle size={16} className="text-green-600" />
                      )}
                      {formData.inspectionTypes.includes("Physical") && (
                        <span
                          className="text-xs text-blue-500 underline ml-2 cursor-pointer hover:text-blue-700"
                          onClick={() => {}}
                        >
                          {formData.subCommodity === "Rice"
                            ? "(Set Rice Params)"
                            : "(Set Generic Params)"}
                        </span>
                      )}
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value="Chemical"
                      checked={formData.inspectionTypes.includes("Chemical")}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-5 w-5 text-black border-gray-400 rounded focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    <span className="flex items-center gap-1 text-gray-700 font-norma">
                      Chemical
                      {hasChemicalParams && (
                        <CheckCircle size={16} className="text-green-600" />
                      )}
                      {formData.inspectionTypes.includes("Chemical") && (
                        <span
                          className="text-xs text-blue-500 underline ml-2 cursor-pointer hover:text-blue-700"
                          onClick={() => {}}
                        >
                          (Set Params)
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-norma text-gray-600 mb-2">
                  Inspection Date (From)
                </label>
                <input
                  name="inspectionDateFrom"
                  type="date"
                  value={formData.inspectionDateFrom}
                  onChange={handleChange}
                  className={inputClass}
                  min={today}
                />
              </div>
              <div>
                <label className="block text-sm font-norma text-gray-600 mb-2">
                  Inspection Date (To)
                </label>
                <input
                  name="inspectionDateTo"
                  type="date"
                  value={formData.inspectionDateTo}
                  onChange={handleChange}
                  className={inputClass}
                  min={today}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">
              Commodity Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <select
                name="commodityCategory"
                value={formData.commodityCategory}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                name="subCommodity"
                value={formData.subCommodity}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Sub Commodity</option>
                {subCategoryOptions.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              <select
                name="specificCommodity"
                value={formData.specificCommodity}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Specific Commodity</option>
                {specificOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <input
              type="number"
                name="inspectionBudget"
                placeholder="Inspection Budget"
                value={formData.inspectionBudget}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <input
              type="number"
                name="volume"
                placeholder="Volume / Quantity"
                value={formData.volume}
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(hasPhysicalParams || hasChemicalParams) && (
            <div className="bg-blue-50 p-6 rounded-xl border border-gray-500 transition-all duration-300">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-black">
                <FileText size={20} className="text-black" />
                Selected Inspection Parameters
              </h3>
              {hasPhysicalParams && (
                <div className="mb-3 border-l-4 border-gray-500 pl-3">
                  <h4 className="font-norma text-gray-700 mb-1">
                    Physical Parameters:
                  </h4>
                  <p className="text-sm text-gray-600 italic">
                    {formData.subCommodity === "Rice"
                      ? "Detailed rice physical parameters configured"
                      : formData.physicalParameters ||
                        "Generic parameters set."}
                  </p>
                </div>
              )}
              {hasChemicalParams && (
                <div className="border-l-4 border-green-400 pl-3">
                  <h4 className="font-norma text-gray-700 mb-1">
                    Chemical Parameters:
                  </h4>
                  <p className="text-sm text-gray-600 italic">
                    {formData.chemicalParameters ||
                      "Generic chemical parameters set."}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">
              Services and Compliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="additionalServices"
                value={formData.additionalServices}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Additional Services</option>
                {additionalServicesOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <select
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Certifications Required</option>
                {certificationOptions.map((cert) => (
                  <option
                    key={cert.value}
                    value={cert.value}
                    title={cert.description}
                  >
                    {cert.label} - {cert.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-md">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-2">
              Contact & Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                name="companyEmail"
                type="email"
                placeholder="Company Email"
                value={formData.companyEmail}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="companyPhoneNumber"
                placeholder="Company Phone Number"
                value={formData.companyPhoneNumber}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <textarea
              name="specialRequirements"
              placeholder="Special Requirements (e.g., preferred date/time, contact person on-site)"
              value={formData.specialRequirements}
              onChange={handleChange}
              rows={3}
              className={inputClass + " mb-6"}
            />
            <textarea
              name="description"
              placeholder="Detailed Description of the Commodity/Inspection Needs"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-norma">
              {error}
            </p>
          )}

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-10 py-4 rounded-xl text-white cursor-pointer font-semibold shadow-lg transition-all transform tracking-wide ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 active:bg-black hover:scale-[1.02] active:scale-100" // Premium Black/Gray Look
              }`}
            >
              {loading ? "Submitting..." : "Submit Inspection Enquiry "}
            </button>
          </div>
        </form>
      </div>

      {modalState.ricePhysical && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-black">
                Rice Physical Parameters
              </h3>
              <button
                onClick={() => closeModal("ricePhysical")}
                className="text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "broken", label: "Broken (%)" },
                  { name: "yellowKernel", label: "Yellow Kernel (%)" },
                  { name: "redKernel", label: "Red Kernel (%)" },
                  { name: "chalkyRice", label: "Chalky Rice (%)" },
                  { name: "purity", label: "Purity (%)" },
                  { name: "damageKernel", label: "Damage Kernel (%)" },
                  { name: "paddyKernel", label: "Paddy Kernel (%)" },
                  {
                    name: "averageGrainLength",
                    label: "Avg. Grain Length (mm)",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-norma text-black mb-2">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      value={ricePhysicalParams[field.name]}
                      onChange={handleRiceParamChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 border border-gray-500 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-norma text-black mb-2">
                    Milling Degree
                  </label>
                  <select
                    name="millingDegree"
                    value={ricePhysicalParams.millingDegree}
                    onChange={handleRiceParamChange}
                    className="w-full px-4 py-3 border border-gray-500 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    <option value="">Select Milling Degree</option>
                    <option value="Well Milled">Well Milled</option>
                    <option value="Reasonably Well Milled">
                      Reasonably Well Milled
                    </option>
                    <option value="Lightly Milled">Lightly Milled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-norma text-black mb-2">
                    Live Insects
                  </label>
                  <select
                    name="liveInsects"
                    value={ricePhysicalParams.liveInsects}
                    onChange={handleRiceParamChange}
                    className="w-full px-4 py-3 border border-gray-500 bg-white rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => closeModal("ricePhysical")}
                className="px-4 py-2 text-black hover:text-gray-800 transition-colors rounded-lg hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={saveRiceParameters}
                className="px-6 py-2 bg-black hover:bg-gray-700 cursor-pointer rounded-lg text-white font-norma transition-colors shadow-lg"
              >
                Save Parameters
              </button>
            </div>
          </div>
        </div>
      )}

      {modalState.genericPhysical && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-black">
                Generic Physical Parameters
              </h3>
              <button
                onClick={() => closeModal("genericPhysical")}
                className="text-white bg-black cursor-pointer hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={tempGenericParams.physical}
                onChange={(e) =>
                  handleGenericParamChange("physical", e.target.value)
                }
                placeholder="Specify the physical parameters you need tested (e.g.,broken(2/3 or 3/4), damaged & discolor, avg.length,chalky,foreign matter,moisture content, etc.)"
                rows={8}
                className="w-full px-4 py-3 bg-white border border-gray-500 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition duration-150 ease-in-out"
              />
              <p className="text-sm text-gray-400 mt-2">
                Specify your requirements in detail, including testing
                standards, acceptable limits, and any specific methodologies.
              </p>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => closeModal("genericPhysical")}
                className="px-4 py-2 text-white hover:bg-gray-800 cursor-pointer transition-colors rounded-lg bg-black"
              >
                Cancel
              </button>
              <button
                onClick={() => saveGenericParameters("physical")}
                className="px-6 py-2 bg-black cursor-pointer hover:bg-gray-900 rounded-lg text-white font-norma transition-colors shadow-lg"
              >
                Save Parameters
              </button>
            </div>
          </div>
        </div>
      )}

      {modalState.genericChemical && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between p-6 border-gray-500">
              <h3 className="text-2xl font-bold text-gray-800">
                Generic Chemical Parameters
              </h3>
              <button
                onClick={() => closeModal("genericChemical")}
                className="text-gray-400 cursor-pointer hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={tempGenericParams.chemical}
                onChange={(e) =>
                  handleGenericParamChange("chemical", e.target.value)
                }
                placeholder="Specify the chemical parameters you need tested (e.g., pH levels, composition analysis, contaminant testing, nutritional content, etc.)"
                rows={8}
                className="w-full px-4 py-3 bg-white border border-gray-500 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none transition duration-150 ease-in-out"
              />
              <p className="text-sm text-gray-400 mt-2">
                Specify your requirements in detail, including testing
                standards, acceptable limits, and any specific methodologies.
              </p>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => closeModal("genericChemical")}
                className="px-4 py-2 text-black cursor-pointer transition-colors rounded-lg hover:bg-black hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => saveGenericParameters("chemical")}
                className="px-6 py-2 bg-black cursor-pointer hover:bg-gray-700 rounded-lg text-white font-norma transition-colors shadow-lg"
              >
                Save Parameters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseEnquiry;
