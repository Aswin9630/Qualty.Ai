import React, {  useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { Eye, EyeOff, User, FileText, ShieldCheck } from "lucide-react";
import NewHeader from "../NewHeader";

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    countryCode: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    address: "",
    publishRequirements: false,
    role: "",
    tradeLicense: "",
    importExportCertificate: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only PDF, JPG, and PNG allowed.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError("Password and Confirm Password do not match");
      setError(""); 
      return;
    }

    setFormError(""); 

    try {
      const payload = new FormData();

      payload.append("role", "customer");
      payload.append("countryCode", formData.countryCode);
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("confirmPassword", formData.confirmPassword);
      payload.append("mobileNumber", formData.mobileNumber);
      payload.append("address", formData.address);
      payload.append("publishRequirements", String(formData.publishRequirements));

      if (formData.publishRequirements) {
        if (formData.tradeLicense) {
          payload.append("tradeLicense", formData.tradeLicense);
        }
        if (formData.importExportCertificate) {
          payload.append("importExportCertificate", formData.importExportCertificate);
        }
      }

      const response = await fetch(`${BASE_URL}/auth/signup/customer`, {
        method: "POST",
        body: payload,
        credentials: "include",
      });

      const data = await response.json();
      if (!data.success) {
        setError(data.errors?.[0]?.msg || data.message);
      } else {
        setError(""); 
        setFormError(""); 
        toast.success(data.message || 'Registration successful!');
          navigate("/verify-pending");     
      }
        setFormError("");
      }

     catch (error) {
      setError(error.message || "Something went wrong");
      console.error("Customer signup error:", error.message);
    }
  };



return (
  <div className="min-h-screen bg-white text-black flex items-center justify-center py-25 px-4">
    {/* <NewHeader/> */}
    <div className="max-w-2xl w-full bg-gray-50 shadow-xl rounded-2xl p-8 border border-gray-200">
      {/* Header Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-black p-3 rounded-full">
          <User className="w-8 h-8 text-white" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-2">Customer Registration</h2>
      <p className="text-gray-600 text-center mb-8">
        Register to request inspection services and connect with providers.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
            required
          >
            <option value="">-- Select Role --</option>
            <option value="customer">Customer</option>
            <option value="inspector">Inspector</option>
          </select>
        </div>

        {/* Country Code */}
        <div>
          <label className="block text-sm font-medium mb-2">Country Code</label>
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
            required
          >
            <option value="">Select Country Code</option>
            <option value="+91">+91 India</option>
            <option value="+1">+1 USA</option>
            <option value="+44">+44 UK</option>
            <option value="+62">+62 INDONESIA</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11 cursor-pointer text-gray-500"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
            required
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-11 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium mb-2">Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="2"
            className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="publishRequirements"
            checked={formData.publishRequirements}
            onChange={handleChange}
            className="mt-1 w-5 h-5 border-gray-400 rounded focus:ring-2 focus:ring-black"
          />
          <label className="text-sm font-medium">
            I want to publish requirements on the platform
            <br />
            <span className="text-gray-500">
              Check this option if you want to post inspection requirements and
              connect with inspection companies.
            </span>
          </label>
        </div>

        {/* Additional Docs */}
        {formData.publishRequirements && (
          <div className="space-y-4 mt-4 bg-gray-100 border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Additional Documents Required
            </h3>
            <p className="text-gray-600 text-sm">
              To publish requirements, please provide the following documents:
            </p>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Trade License / Legal Document / GST Certificate
              </label>
              <input
                type="file"
                name="tradeLicense"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload trade license (PDF, JPG, PNG files allowed, Max size: 5MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Import/Export Certificate
              </label>
              <input
                type="file"
                name="importExportCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload certificate (PDF, JPG, PNG files allowed, Max size: 5MB)
              </p>
            </div>
          </div>
        )}

        {/* Errors */}
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        {formError && <p className="text-red-500 text-sm text-center mt-2">{formError}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black cursor-pointer hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-transform transform hover:scale-[1.02] focus:ring-4 focus:ring-gray-500 focus:outline-none"
        >
          Create Customer Account
        </button>
      </form>
    </div>
  </div>
);

};

export default CustomerSignup;