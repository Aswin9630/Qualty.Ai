import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NewHeader from "../NewHeader";

const allowedCommodities = [
  "Textiles & Garments",
  "Electronics & Electrical",
  "Automotive Parts",
  "Food & Beverages",
  "Pharmaceuticals",
  "Chemicals",
  "Machinery & Equipment",
  "Furniture & Wood Products",
  "Metals & Alloys",
  "Plastics & Rubber",
  "Agricultural Products",
  "Jewelry & Accessories",
  "Toys & Games",
  "Cosmetics & Personal Care",
  "Sports Equipment",
  "Other",
];

export default function InspectorSignup() {
  const [formData, setFormData] = useState({
    role: "inspector",
    inspectorType: "indian",
    name: "",
    email: "",
    password: "",
    countryCode: "+91",
    mobileNumber: "",
    address: "",
    acceptsRequests: false,
    identityDocuments: {
      aadhaarCard: null,
    },
    billingDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
    commodities: [{ commodity: "", experienceYears: 0 }],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.startsWith("identityDocuments.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        identityDocuments: {
          ...prev.identityDocuments,
          [key]: files ? files[0] : value,
        },
      }));
    } else if (name.startsWith("billingDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        billingDetails: {
          ...prev.billingDetails,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCommodityChange = (index, field, value) => {
    const updated = [...formData.commodities];
    updated[index][field] = field === "experienceYears" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, commodities: updated }));
  };

  const addCommodity = () => {
    setFormData((prev) => ({
      ...prev,
      commodities: [...prev.commodities, { commodity: "", experienceYears: 0 }],
    }));
  };

  const removeCommodity = (index) => {
    const updated = [...formData.commodities];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, commodities: updated }));
  };

  const handleAadhaarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Aadhaar card file size should not exceed 5MB.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        identityDocuments: {
          ...prev.identityDocuments,
          aadhaarCard: file,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      formData.acceptsRequests &&
      (!formData.identityDocuments.aadhaarCard ||
        !formData.billingDetails.accountNumber ||
        !formData.billingDetails.bankName ||
        !formData.billingDetails.ifscCode)
    ) {
      setError("Please fill all required fields to accept requests.");
      return;
    }

    const formdataToSend = new FormData();
    formdataToSend.append("role", formData.role);
    formdataToSend.append("inspectorType", formData.inspectorType);
    formdataToSend.append("name", formData.name);
    formdataToSend.append("email", formData.email);
    formdataToSend.append("password", formData.password);
    formdataToSend.append("countryCode", formData.countryCode);
    formdataToSend.append("mobileNumber", formData.mobileNumber);
    formdataToSend.append("address", formData.address);
    formdataToSend.append(
      "acceptsRequests",
      formData.acceptsRequests ? "true" : "false"
    );

    if (formData.identityDocuments.aadhaarCard)
      formdataToSend.append(
        "aadhaarCard",
        formData.identityDocuments.aadhaarCard
      );

    formdataToSend.append(
      "accountNumber",
      formData.billingDetails.accountNumber
    );
    formdataToSend.append("bankName", formData.billingDetails.bankName);
    formdataToSend.append("ifscCode", formData.billingDetails.ifscCode);

    formData.commodities.forEach((item, index) => {
      formdataToSend.append(`commodities[${index}][commodity]`, item.commodity);
      formdataToSend.append(
        `commodities[${index}][experienceYears]`,
        item.experienceYears
      );
    });

    try {
      const response = await fetch(`${BASE_URL}/auth/signup/inspector`, {
        method: "POST",
        body: formdataToSend,
        credentials: "include",
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.errors?.[0]?.msg || data.message);
      } else {
        toast.success(data.message || "Signup Successful");
        navigate("/verify-pending");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6 py-25">
      {/* <NewHeader/> */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white border border-gray-200 p-8 rounded-xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Inspector Signup
        </h2>

        {/* Role Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="customer">Customer</option>
            <option value="inspector">Inspector</option>
          </select>
        </div>

        {/* Inspector Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Inspector Type</label>
          <select
            name="inspectorType"
            value={formData.inspectorType}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="indian">Indian</option>
            <option value="international">International</option>
          </select>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Country Code */}
        <div className="space-y-2">
          <label htmlFor="countryCode" className="block text-sm font-semibold">
            Country Code
          </label>
          <input
            id="countryCode"
            name="countryCode"
            type="tel"
            placeholder="+91"
            value={formData.countryCode}
            onChange={handleChange}
            pattern="^\+\d{1,4}$"
            inputMode="numeric"
            maxLength={5}
            required
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="text-xs text-gray-500">
            Include "+" and country digits (e.g. +91)
          </p>
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <label htmlFor="mobileNumber" className="block text-sm font-semibold">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            placeholder="10-digit mobile number"
            value={formData.mobileNumber}
            onChange={handleChange}
            pattern="\d{10}"
            inputMode="numeric"
            maxLength={10}
            minLength={10}
            required
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <p className="text-xs text-gray-500">
            Only digits allowed. No spaces or symbols.
          </p>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-semibold">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Accepts Requests */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="acceptsRequests"
            checked={formData.acceptsRequests}
            onChange={handleChange}
            className="cursor-pointer"
          />
          <label className="text-sm font-medium">I agree to accept inspection requests and participate in bidding</label>
        </div>

        {formData.acceptsRequests && (
          <div className="space-y-6 mt-6 border-t border-gray-300 pt-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">
                Aadhaar Card <span className="text-gray-500">(Max 5MB)</span>
              </label>
              <input
                type="file"
                name="aadhaarCard"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleAadhaarChange}
                className="block w-full text-sm text-black p-2 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-gray-500">
                Accepted formats: JPG, PNG, PDF
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["accountNumber", "bankName", "ifscCode"].map((field, i) => (
                <div
                  key={field}
                  className={`space-y-2 ${i === 2 ? "sm:col-span-2" : ""}`}
                >
                  <label className="block text-sm font-semibold">
                    {field === "accountNumber"
                      ? "Account Number"
                      : field === "bankName"
                      ? "Bank Name"
                      : "IFSC Code"}
                  </label>
                  <input
                    name={`billingDetails.${field}`}
                    value={formData.billingDetails[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                    required
                    className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commodities Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Commodities</h3>
          {formData.commodities.map((item, index) => (
            <div
              key={index}
              className="space-y-2 border border-gray-200 p-4 rounded-lg"
            >
              <select
                value={item.commodity}
                onChange={(e) =>
                  handleCommodityChange(index, "commodity", e.target.value)
                }
                className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Commodity</option>
                {allowedCommodities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                max="50"
                value={item.experienceYears}
                onChange={(e) =>
                  handleCommodityChange(
                    index,
                    "experienceYears",
                    e.target.value
                  )
                }
                placeholder="Years of Experience"
                required
                className="w-full p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              {formData.commodities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCommodity(index)}
                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCommodity}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add Commodity
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-600 font-medium">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-semibold cursor-pointer transition"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
