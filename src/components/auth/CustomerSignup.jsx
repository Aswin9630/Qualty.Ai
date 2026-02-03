// import React, {  useState } from "react";
// import { BASE_URL } from "../../utils/constants";
// import { useNavigate } from 'react-router-dom'
// import { toast } from "react-toastify";
// import { Eye, EyeOff, User, FileText, ShieldCheck } from "lucide-react";

// const CustomerSignup = () => {
//   const [formData, setFormData] = useState({
//     countryCode: "",
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobileNumber: "",
//     address: "",
//     publishRequirements: false,
//     role: "",
//     tradeLicense: "",
//     importExportCertificate: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [formError, setFormError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];
//     if (!file) return;

//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
//     const maxSize = 5 * 1024 * 1024;

//     if (!allowedTypes.includes(file.type)) {
//       alert('Invalid file type. Only PDF, JPG, and PNG allowed.');
//       return;
//     }

//     if (file.size > maxSize) {
//       alert('File size exceeds 5MB limit.');
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]: file,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setFormError("Password and Confirm Password do not match");
//       setError("");
//       return;
//     }

//     setFormError("");

//     try {
//       const payload = new FormData();

//       payload.append("role", "customer");
//       payload.append("countryCode", formData.countryCode);
//       payload.append("name", formData.name);
//       payload.append("email", formData.email);
//       payload.append("password", formData.password);
//       payload.append("confirmPassword", formData.confirmPassword);
//       payload.append("mobileNumber", formData.mobileNumber);
//       payload.append("address", formData.address);
//       payload.append("publishRequirements", String(formData.publishRequirements));

//       if (formData.publishRequirements) {
//         if (formData.tradeLicense) {
//           payload.append("tradeLicense", formData.tradeLicense);
//         }
//         if (formData.importExportCertificate) {
//           payload.append("importExportCertificate", formData.importExportCertificate);
//         }
//       }

//       const response = await fetch(`${BASE_URL}/auth/signup/customer`, {
//         method: "POST",
//         body: payload,
//         credentials: "include",
//       });

//       const data = await response.json();
//       if (!data.success) {
//         setError(data.errors?.[0]?.msg || data.message);
//       } else {
//         setError("");
//         setFormError("");
//         toast.success(data.message || 'Registration successful!');
//           navigate("/verify-pending");
//       }
//         setFormError("");
//       }

//      catch (error) {
//       setError(error.message || "Something went wrong");
//       console.error("Customer signup error:", error.message);
//     }
//   };

// return (
//   <div className="min-h-screen bg-white text-black flex items-center justify-center py-25 px-4">
//     {/* <NewHeader/> */}
//     <div className="max-w-2xl w-full bg-gray-50 shadow-xl rounded-2xl p-8 border border-gray-200">
//       {/* Header Icon */}
//       <div className="flex justify-center mb-6">
//         <div className="bg-black p-3 rounded-full">
//           <User className="w-8 h-8 text-white" />
//         </div>
//       </div>

//       <h2 className="text-3xl font-bold text-center mb-2">Customer Registration</h2>
//       <p className="text-gray-600 text-center mb-8">
//         Register to request inspection services and connect with providers.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Role */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             required
//           >
//             <option value="">-- Select Role --</option>
//             <option value="customer">Customer</option>
//             <option value="inspector">Inspector</option>
//           </select>
//         </div>

//         {/* Country Code */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Country Code</label>
//           <select
//             name="countryCode"
//             value={formData.countryCode}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             required
//           >
//             <option value="">Select Country Code</option>
//             <option value="+91">+91 India</option>
//             <option value="+1">+1 USA</option>
//             <option value="+44">+44 UK</option>
//             <option value="+62">+62 INDONESIA</option>
//           </select>
//         </div>

//         {/* Full Name */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your full name"
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Email Address</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email address"
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="relative">
//           <label className="block text-sm font-medium mb-2">Password</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             required
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-11 cursor-pointer text-gray-500"
//           >
//             {showPassword ? <EyeOff /> : <Eye />}
//           </span>
//         </div>

//         {/* Confirm Password */}
//         <div className="relative">
//           <label className="block text-sm font-medium mb-2">Confirm Password</label>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm your password"
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             required
//           />
//           <span
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute right-3 top-11 cursor-pointer text-gray-500"
//           >
//             {showConfirmPassword ? <EyeOff /> : <Eye />}
//           </span>
//         </div>

//         {/* Mobile Number */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Mobile Number</label>
//           <input
//             type="tel"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             placeholder="Enter mobile number"
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             required
//           />
//         </div>

//         {/* Address */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Address</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             placeholder="Enter your address"
//             rows="2"
//             className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//           />
//         </div>

//         {/* Checkbox */}
//         <div className="flex items-start space-x-2">
//           <input
//             type="checkbox"
//             name="publishRequirements"
//             checked={formData.publishRequirements}
//             onChange={handleChange}
//             className="mt-1 w-5 h-5 border-gray-400 rounded focus:ring-2 focus:ring-black"
//           />
//           <label className="text-sm font-medium">
//             I want to publish requirements on the platform
//             <br />
//             <span className="text-gray-500">
//               Check this option if you want to post inspection requirements and
//               connect with inspection companies.
//             </span>
//           </label>
//         </div>

//         {formData.publishRequirements && (
//           <div className="space-y-4 mt-4 bg-gray-100 border border-gray-200 rounded-xl p-4">
//             <h3 className="text-sm font-semibold flex items-center gap-2">
//               <ShieldCheck className="w-4 h-4" /> Additional Documents Required
//             </h3>
//             <p className="text-gray-600 text-sm">
//               To publish requirements, please provide the following documents:
//             </p>

//             <div>
//               <label className="block text-sm font-medium mb-2 flex items-center gap-2">
//                 <FileText className="w-4 h-4" /> Trade License / Legal Document / GST Certificate
//               </label>
//               <input
//                 type="file"
//                 name="tradeLicense"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 onChange={handleFileChange}
//                 className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Upload trade license (PDF, JPG, PNG files allowed, Max size: 5MB)
//               </p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 flex items-center gap-2">
//                 <FileText className="w-4 h-4" /> Import/Export Certificate
//               </label>
//               <input
//                 type="file"
//                 name="importExportCertificate"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 onChange={handleFileChange}
//                 className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Upload certificate (PDF, JPG, PNG files allowed, Max size: 5MB)
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Errors */}
//         {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
//         {formError && <p className="text-red-500 text-sm text-center mt-2">{formError}</p>}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-black cursor-pointer hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-transform transform hover:scale-[1.02] focus:ring-4 focus:ring-gray-500 focus:outline-none"
//         >
//           Create Customer Account
//         </button>
//       </form>
//     </div>
//   </div>
// );

// };

// export default CustomerSignup;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, countryCodes } from "../../utils/constants";
import {
  Eye,
  EyeOff,
  User,
  FileText,
  ShieldCheck, 
  CheckCircle,
  Zap,
  Globe,
  Award,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setGstVerification } from "../../redux/slice/LegalVerificationSlice/CustomerSlice/gstSlice";

const CustomerSignup = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();

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
  const [isLoading, setIsLoading] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
const [gstVerified, setGstVerified] = useState(false);
const [gstVerifying, setGstVerifying] = useState(false);
const [gstError, setGstError] = useState("");

const handleGSTVerify = async () => {
  if (!gstNumber.trim()) {
    setGstError("Please enter GST number");
    return;
  }

  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstRegex.test(gstNumber.toUpperCase())) {
    setGstError("Invalid GST number format");
    return;
  }

  setGstVerifying(true);
  setGstError("");

  try {
    const response = await fetch(`${BASE_URL}/kyc/verify-gst`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gstNumber: gstNumber.toUpperCase() }),
      credentials: "include",
    });

    const data = await response.json();
    console.log("dataGST",data)
    
    if (data?.success && data?.data?.status==="Active") {
      setGstVerified(true);
      setFormData((prev) => ({
        ...prev,
        gstNumber: gstNumber.toUpperCase(),
      }));

        dispatch(
    setGstVerification({
      gstNumber: data.data.gstNumber,
      status: data.data.status,
      details: {
        legalName: data.data.result?.data?.data?.lgnm,
        tradeName: data.data.result?.data?.data?.tradeNam,
        gstType: data.data.result?.data?.data?.ctb,
        registrationDate: data.data.result?.data?.data?.rgdt,
        state: data.data.result?.data?.data?.stj,
      },
    })
  );

    } else {
      setGstError(data.message || "GST verification failed");
    }
  } catch (error) {
    console.error("GST verification error:", error);
    setGstError("Error verifying GST. Please try again.");
  } finally {
    setGstVerifying(false);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

     if (name === "countryCode") {
    setGstNumber("");
    setGstVerified(false);
    setGstError("");
  }

  if (name === "publishRequirements" && !checked) {
    setGstNumber("");
    setGstVerified(false);
    setGstError("");
  }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF, JPG and PNG files allowed");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size should be less than 5MB");
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
      return;
    }

     if (formData.countryCode === "+91" && formData.publishRequirements) {
    if (!gstVerified) {
      setFormError("Please verify your GST number to publish requirements");
      return;
    }
  }

  if (formData.countryCode !== "+91" && formData.publishRequirements) {
    if (!formData.tradeLicense) {
      setFormError("Please upload any legal documents to publish requirements");
      return;
    }
  }

    setFormError("");
    setError("");
    setIsLoading(true);

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
      payload.append(
        "publishRequirements",
        String(formData.publishRequirements)
      );

      if (formData.publishRequirements) {
        if (formData.countryCode === "+91") {
        payload.append("gstNumber", gstNumber.toUpperCase());
      }
        if (formData.tradeLicense)
          payload.append("tradeLicense", formData.tradeLicense);
        // if (formData.importExportCertificate)
          // payload.append(
          //   "importExportCertificate",
          //   formData.importExportCertificate
          // );
      }

      const response = await fetch(`${BASE_URL}/auth/signup/customer`, {
        method: "POST",
        body: payload,
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.errors?.[0]?.msg || data.message);
        setIsLoading(false);
      } else {
        toast.success(data.message || "Registration successful!");
        navigate("/verify-pending");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-center px-12 py-12 border-r border-gray-200 bg-gradient-to-br from-white to-gray-50">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-black text-black">Qualty AI</h1>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Quality Inspection Made Easy
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with verified inspectors and ensure quality assurance
                for your commodities across borders
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition">
                  <Globe className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Global Network
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Access 50,000+ verified inspectors worldwide
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Fast Verification
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get quality inspections completed in 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition">
                  <ShieldCheck className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Trusted & Secure
                  </h3>
                  <p className="text-gray-600 text-sm">
                    All inspectors are verified and certified
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Transparent Process
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Real-time updates and detailed inspection reports
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Industry Certified
                  </h3>
                  <p className="text-gray-600 text-sm">
                    ISO certified and compliant with international standards
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-black text-black">1K+</div>
                <p className="text-xs text-gray-600 font-semibold mt-1">
                  Active Users
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-2xl font-black text-black">50+</div>
                <p className="text-xs text-gray-600 font-semibold mt-1">
                  Countries
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-black text-black">Qualty</h1>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Create Account
              </h2> 
              <p className="text-sm text-gray-600">
                Register to find quality inspectors for your commodities
              </p>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-sm text-gray-600">
                Register to find quality inspectors and get started with
                verification
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 focus:outline-none transition text-sm"
                    required
                  >
                    <option value="customer">Importer/Exporter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Country Code
                  </label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 focus:outline-none transition text-sm"
                    required
                  >
                    <option value="">Select Country</option>
                    {countryCodes.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code} {item.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 placeholder-gray-400 focus:outline-none transition text-sm"
                    required
                  />
                </div>  
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 placeholder-gray-400 focus:outline-none transition text-sm"
                    required
                  />
                </div> 
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 placeholder-gray-400 focus:outline-none transition text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Business address"  
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 placeholder-gray-400 focus:outline-none transition text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 placeholder-gray-400 focus:outline-none transition text-sm pr-7"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-9 text-gray-500 hover:text-black transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full px-3 py-2 bg-white border-b border-gray-300 focus:border-black text-gray-900 placeholder-gray-400 focus:outline-none transition text-sm pr-7"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 top-9 text-gray-500 hover:text-black transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="publishRequirements"
                    checked={formData.publishRequirements}
                    onChange={handleChange}
                    className="w-4 h-4 border-2 border-gray-400 rounded mt-0.5 cursor-pointer accent-black"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Publish requirements
                    </p>
                    <p className="text-xs text-gray-500">
                      Tick this option if you want to post inspection
                      requirements and connect with inspection companies.
                    </p>
                  </div>
                </label>
              </div>


              {formData.publishRequirements && (
  <div className="space-y-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
    <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
      <ShieldCheck className="w-4 h-4" /> Additional Verification Required
    </h3>
    <p className="text-gray-600 text-xs">
      {formData.countryCode === "+91"
        ? "Verify your GST number to publish requirements on the platform"
        : "Upload legal documents to publish requirements on the platform"}
    </p>

    {formData.countryCode === "+91" ? ( 
      <div>
        <label className="block text-xs font-semibold text-gray-900 mb-2">
          GST Number
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={gstNumber}   
            onChange={(e) => {
              setGstNumber(e.target.value.toUpperCase());
              setGstError("");
            }}
            placeholder="Enter 15-digit GST number"
            disabled={gstVerified}
            className={`flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400 focus:outline-none transition ${
              gstVerified ? "bg-gray-100" : "focus:border-black"
            } disabled:cursor-not-allowed`}
          />
          <button
            type="button"
            onClick={handleGSTVerify}
            disabled={gstVerifying || gstVerified}
            className={`px-4 py-2 text-xs font-bold rounded transition cursor-pointer ${
              gstVerified
                ? "bg-green-600 text-white cursor-default"
                : "bg-black text-white hover:bg-gray-900 disabled:bg-gray-500"
            }`}
          >
            {gstVerifying ? (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : gstVerified ? (
              "✓ Verified"
            ) : (
              "Verify"
            )}
          </button>
        </div>
        {gstError && (
          <p className="text-red-600 text-xs mt-1">{gstError}</p>
        )}
        {gstVerified && (
          <p className="text-green-600 text-xs mt-1 font-semibold">
            ✓ GST verified successfully
          </p>
        )}
      </div>
    ) : (
      <>
        <div>
          <label className="block text-xs font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Trade License / Legal Document
          </label>
          <input
            type="file"
            name="tradeLicense"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-600 file:px-2 file:py-1 file:bg-gray-900 file:text-white file:border-0 file:rounded file:text-xs file:font-semibold file:cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload legal document (PDF, JPG, PNG allowed, Max 5MB)
          </p>
        </div>
      </>
    )}
  </div>
 )} */}


              {error && (
                <p className="text-red-600 text-xs font-semibold text-center mt-2 bg-red-50 p-3 rounded border-l-4 border-red-600">
                  {error}
                </p>
              )}
              {formError && (
                <p className="text-red-600 text-xs font-semibold text-center mt-2 bg-red-50 p-3 rounded border-l-4 border-red-600">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full cursor-pointer text-white font-bold py-2.5 px-4 rounded text-sm transition-all transform hover:scale-[1.01] mt-6 ${
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed hover:scale-100"
                    : "bg-black hover:bg-gray-900"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Customer Account"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;
