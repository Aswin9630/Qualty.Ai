// import React, {  useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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





































// import React, { useState } from "react";
// import { Eye, EyeOff, User, FileText, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../utils/constants";

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
//     role: "customer",
//     tradeLicense: null,
//     importExportCertificate: null,
//     wantsKyc: false,
//     panNumber: "",
//     gstNumber: ""
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [formError, setFormError] = useState("");

//   const [kycState, setKycState] = useState({
//     verifying: false,
//     panVerified: false,
//     gstVerified: false,
//     panError: "",
//     gstError: ""
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];
//     if (!file) return;

//     const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
//     const maxSize = 5 * 1024 * 1024;

//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Invalid file type. Only PDF, JPG, and PNG allowed.");
//       return;
//     }
//     if (file.size > maxSize) {
//       toast.error("File size exceeds 5MB limit.");
//       return;
//     }

//     setFormData(prev => ({ ...prev, [name]: file }));
//   };

//   const validatePasswords = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setFormError("Password and Confirm Password do not match");
//       return false;
//     }
//     setFormError("");
//     return true;
//   };

//   const verifyKyc = async () => {
//     setKycState(prev => ({ ...prev, verifying: true, panError: "", gstError: "" }));
//     try {
//       // if (formData.wantsKyc) {
//       //   if (!formData.panNumber || !/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(formData.panNumber.trim())) {
//       //     setKycState(prev => ({ ...prev, panError: "Invalid PAN format", verifying: false }));
//       //     return false;
//       //   }
//       //   const panRes = await fetch(`${BASE_URL}/kyc/verify-pan`, {
//       //     method: "POST",
//       //     headers: { "Content-Type": "application/json" },
//       //     credentials: "include",
//       //     body: JSON.stringify({ panNumber: formData.panNumber.trim() })
//       //   });
//       //   const panData = await panRes.json();
//       //   if (!panRes.ok || !panData?.success) {
//       //     setKycState(prev => ({ ...prev, panError: panData?.message || "PAN verification failed" }));
//       //     return false;
//       //   }
//       //   setKycState(prev => ({ ...prev, panVerified: true }));
//       // }

//       if (formData.wantsKyc) {
//         if (
//           !formData.gstNumber ||
//           !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/.test(formData.gstNumber.trim())
//         ) {
//           setKycState(prev => ({ ...prev, gstError: "Invalid GST format", verifying: false }));
//           return false;
//         }
//         const gstRes = await fetch(`${BASE_URL}/kyc/verify-gst`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify({ gstNumber: formData.gstNumber.trim() })
//         });
//         const gstData = await gstRes.json();
//         if (!gstRes.ok || !gstData?.success) {
//           setKycState(prev => ({ ...prev, gstError: gstData?.message || "GST verification failed" }));
//           return false;
//         }
//         setKycState(prev => ({ ...prev, gstVerified: true }));
//       }

//       setKycState(prev => ({ ...prev, verifying: false }));
//       toast.success("KYC verification successful");
//       return true;
//     } catch (err) {
//       setKycState(prev => ({ ...prev, verifying: false }));
//       toast.error("KYC verification failed");
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!validatePasswords()) return;

//     if (formData.wantsKyc) {
//       const verified = await verifyKyc();
//       if (!verified) {
//         toast.error("Please resolve KYC errors before signing up.");
//         return;
//       }
//     }

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
//       if (formData.wantsKyc) {
//         payload.append("panNumber", formData.panNumber.trim());
//         payload.append("gstNumber", formData.gstNumber.trim());
//       }

//       if (formData.publishRequirements) {
//         if (formData.tradeLicense) payload.append("tradeLicense", formData.tradeLicense);
//         if (formData.importExportCertificate) payload.append("importExportCertificate", formData.importExportCertificate);
//       }

//       const response = await fetch(`${BASE_URL}/auth/signup/customer`, {
//         method: "POST",
//         body: payload,
//         credentials: "include"
//       });

//       const data = await response.json();
//       if (!data.success) {
//         setError(data.errors?.[0]?.msg || data.message || "Signup failed");
//       } else {
//         setError("");
//         toast.success(data.message || "Registration successful!");
//         navigate("/verify-pending");
//       }
//     } catch (error) {
//       setError(error.message || "Something went wrong");
//       console.error("Customer signup error:", error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black flex items-center justify-center py-20 px-4">
//       <div className="max-w-2xl w-full bg-gray-50 shadow-xl rounded-2xl p-8 border border-gray-200">
//         <div className="flex justify-center mb-6">
//           <div className="bg-black p-3 rounded-full">
//             <User className="w-8 h-8 text-white" />
//           </div>
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-2">Customer Registration</h2>
//         <p className="text-gray-600 text-center mb-8">
//           Register to request inspection services and connect with providers.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Role */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               required
//             >
//               <option value="customer">Customer</option>
//               <option value="inspector" disabled>Inspector</option>
//             </select>
//           </div>

//           {/* Country Code */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Country Code</label>
//             <select
//               name="countryCode"
//               value={formData.countryCode}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               required
//             >
//               <option value="">Select Country Code</option>
//               <option value="+91">+91 India</option>
//               <option value="+1">+1 USA</option>
//               <option value="+44">+44 UK</option>
//               <option value="+62">+62 Indonesia</option>
//             </select>
//           </div>

//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email address"
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-sm font-medium mb-2">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               required
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-11 cursor-pointer text-gray-500"
//             >
//               {showPassword ? <EyeOff /> : <Eye />}
//             </span>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <label className="block text-sm font-medium mb-2">Confirm Password</label>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               required
//             />
//             <span
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-11 cursor-pointer text-gray-500"
//             >
//               {showConfirmPassword ? <EyeOff /> : <Eye />}
//             </span>
//           </div>

//           {/* Mobile Number */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Mobile Number</label>
//             <input
//               type="tel"
//               name="mobileNumber"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               placeholder="Enter mobile number"
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//               required
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Address</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Enter your address"
//               rows="2"
//               className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//             />
//           </div>

//           {/* Publish Requirements */}
//           <div className="flex items-start space-x-2">
//             <input
//               type="checkbox"
//               name="publishRequirements"
//               checked={formData.publishRequirements}
//               onChange={handleChange}
//               className="mt-1 w-5 h-5 border-gray-400 rounded focus:ring-2 focus:ring-black"
//             />
//             <label className="text-sm font-medium">
//               I want to publish requirements on the platform
//               <br />
//               <span className="text-gray-500">
//                 Check this option if you want to post inspection requirements and connect with inspection companies.
//               </span>
//             </label>
//           </div>

//           {formData.publishRequirements && (
//             <div className="space-y-4 mt-4 bg-gray-100 border border-gray-200 rounded-xl p-4">
//               <h3 className="text-sm font-semibold flex items-center gap-2">
//                 <ShieldCheck className="w-4 h-4" /> Additional Documents Required
//               </h3>
//               <p className="text-gray-600 text-sm">To publish requirements, please provide the following documents:</p>

//               <div>
//                 <label className="block text-sm font-medium mb-2 flex items-center gap-2">
//                   <FileText className="w-4 h-4" /> Trade License / Legal Document / GST Certificate
//                 </label>
//                 <input
//                   type="file"
//                   name="tradeLicense"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={handleFileChange}
//                   className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 flex items-center gap-2">
//                   <FileText className="w-4 h-4" /> Import/Export Certificate
//                 </label>
//                 <input
//                   type="file"
//                   name="importExportCertificate"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={handleFileChange}
//                   className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>
//               </div>
//             </div>
//           )}

//           {/* KYC Checkbox (PAN + GST) */}
//           <div className="flex items-start space-x-2">
//             <input
//               type="checkbox"
//               name="wantsKyc"
//               checked={formData.wantsKyc}
//               onChange={handleChange}
//               className="mt-1 w-5 h-5 border-gray-400 rounded focus:ring-2 focus:ring-black"
//             />
//             <label className="text-sm font-medium">
//               Verify PAN & GST now
//               <br />
//               <span className="text-gray-500">We’ll verify your PAN and GST with sandbox.co.in for faster onboarding.</span>
//             </label>
//           </div>

//           {formData.wantsKyc && (
//             <div className="space-y-4 mt-4 bg-gray-100 border border-gray-200 rounded-xl p-4">
//               {/* <div>
//                 <label className="block text-sm font-medium mb-2">PAN Number</label>
//                 <input
//                   type="text"
//                   name="panNumber"
//                   value={formData.panNumber}
//                   onChange={handleChange}
//                   placeholder="ABCDE1234F"
//                   className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//                 />
//                 <div className="mt-2 text-sm flex items-center gap-2">
//                   {kycState.panVerified ? (
//                     <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> PAN verified</span>
//                   ) : kycState.panError ? (
//                     <span className="text-red-600 flex items-center gap-1"><XCircle className="w-4 h-4" /> {kycState.panError}</span>
//                   ) : null}
//                 </div>
//               </div> */}

//               <div>
//                 <label className="block text-sm font-medium mb-2">GST Number</label>
//                 <input
//                   type="text"
//                   name="gstNumber"
//                   value={formData.gstNumber}
//                   onChange={handleChange}
//                   placeholder="22ABCDE1234F1Z5"
//                   className="w-full px-4 py-3 border rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-black transition"
//                 />
//                 <div className="mt-2 text-sm flex items-center gap-2">
//                   {kycState.gstVerified ? (
//                     <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> GST verified</span>
//                   ) : kycState.gstError ? (
//                     <span className="text-red-600 flex items-center gap-1"><XCircle className="w-4 h-4" /> {kycState.gstError}</span>
//                   ) : null}
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={verifyKyc}
//                 disabled={kycState.verifying}
//                 className="w-full bg-black text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition disabled:opacity-60"
//               >
//                 {kycState.verifying ? "Verifying…" : "Verify PAN & GST"}
//               </button>
//             </div>
//           )}

//           {/* Errors */}
//           {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
//           {formError && <p className="text-red-500 text-sm text-center mt-2">{formError}</p>}

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-transform transform hover:scale-[1.02] focus:ring-4 focus:ring-gray-500 focus:outline-none"
//           >
//             Create Customer Account
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CustomerSignup;























import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, FileText, ShieldCheck } from "lucide-react";


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
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  /**
   * Password validation rules (mirrors backend)
   * - length 8-20
   * - uppercase A-Z
   * - lowercase a-z
   * - digit 0-9
   * - special char from set: !@#$%^&*(){}:"<>?,.|
   */
  const passwordValidationRules = {
    minLength: 8,
    maxLength: 20,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    digit: /\d/,
    special: /[!@#$%^&*(){}:"<>?,.|]/,
  };

  const validatePassword = (pwd) => {
    const rules = passwordValidationRules;
    const errors = [];

    if (!pwd || pwd.length < rules.minLength || pwd.length > rules.maxLength) {
      errors.push(`Password must be ${rules.minLength}-${rules.maxLength} characters`);
    }
    if (pwd && !rules.uppercase.test(pwd)) {
      errors.push("Include at least one uppercase letter");
    }
    if (pwd && !rules.lowercase.test(pwd)) {
      errors.push("Include at least one lowercase letter");
    }
    if (pwd && !rules.digit.test(pwd)) {
      errors.push("Include at least one number");
    }
    if (pwd && !rules.special.test(pwd)) {
      errors.push("Include at least one special character (!@#$%^&*(){}:\"<>?,.|)");
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    validateField(name, newValue);
    if (name === "password" || name === "confirmPassword") {
      validateField("confirmPassword", name === "confirmPassword" ? newValue : formData.confirmPassword);
      validateField("password", name === "password" ? newValue : formData.password);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only PDF, JPG, and PNG allowed.");
      return;
    }

    if (file.size > maxSize) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

 
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!value || value.trim().length < 2) message = "Please enter your full name";
        break;

      case "email":
        if (!value) {
          message = "Email is required";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) message = "Enter a valid email address";
        }
        break;

      case "password": {
        const pwdErrors = validatePassword(value);
        if (pwdErrors.length > 0) {
          message = pwdErrors.join(". ");
        }
        break;
      }

      case "confirmPassword":
        if (!value) {
          message = "Please confirm your password";
        } else if (value !== formData.password) {
          message = "Passwords do not match";
        }
        break;

      case "mobileNumber":
        if (!value) {
          message = "Mobile number is required";
        } else {
          const digits = value.replace(/\D/g, "");
          if (!/^\d{6,15}$/.test(digits)) message = "Enter a valid mobile number (6-15 digits)";
        }
        break;

      case "countryCode":
        if (!value) message = "Please select a country code";
        break;

      case "role":
        if (!value) message = "Please select a role";
        break;

      default:
        message = "";
    }

    setFieldErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateAllFieldsForUI = () => {
    const keys = [
      "role",
      "countryCode",
      "name",
      "email",
      "password",
      "confirmPassword",
      "mobileNumber",
    ];
    keys.forEach((k) => validateField(k, formData[k]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateAllFieldsForUI();

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
        toast.success(data.message || "Registration successful!");
        navigate("/verify-pending");
      }
      setFormError("");
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Customer signup error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 sm:p-10">
        <div className="flex justify-center mb-6">
          <div className="bg-black p-3 rounded-full">
            <User className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">Customer Registration</h2>
        <p className="text-gray-600 text-center mb-8">
          Register to request inspection services and connect with providers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 ${
                fieldErrors.role ? "border-red-500" : "border-gray-200"
              }`}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="customer">Customer</option>
              <option value="inspector">Inspector</option>
            </select>
            {fieldErrors.role && <p className="text-red-500 text-xs mt-1">{fieldErrors.role}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Country Code</label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className={`w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 ${
                fieldErrors.countryCode ? "border-red-500" : "border-gray-200"
              }`}
              required
            >
              <option value="">Select Country Code</option>
              <option value="+91">+91 India</option>
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
              <option value="+62">+62 INDONESIA</option>
            </select>
            {fieldErrors.countryCode && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.countryCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 ${
                fieldErrors.name ? "border-red-500" : "border-gray-200"
              }`}
              required
            />
            {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 ${
                fieldErrors.email ? "border-red-500" : "border-gray-200"
              }`}
              required
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 ${
                fieldErrors.password ? "border-red-500" : "border-gray-200"
              }`}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>

            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
            ) }
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 ${
                fieldErrors.confirmPassword ? "border-red-500" : "border-gray-200"
              }`}
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-9 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
            {fieldErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className={`w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 ${
                fieldErrors.mobileNumber ? "border-red-500" : "border-gray-200"
              }`}
              required
            />
            {fieldErrors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.mobileNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="2"
              className="w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 border-gray-200"
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="publishRequirements"
              checked={formData.publishRequirements}
              onChange={handleChange}
              className="mt-1 w-5 h-5 text-black rounded focus:ring-0"
            />
            <label className="text-sm font-medium">
              I want to publish requirements on the platform
              <br />
              <span className="text-gray-500">
                Check this option if you want to post inspection requirements and connect with inspection companies.
              </span>
            </label>
          </div>

          {formData.publishRequirements && (
            <div className="space-y-4 mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Additional Documents Required
              </h3>
              <p className="text-gray-600 text-sm">To publish requirements, please provide the following documents:</p>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Trade License / Legal Document / GST Certificate
                </label>
                <input
                  type="file"
                  name="tradeLicense"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Upload trade license (PDF, JPG, PNG files allowed, Max size: 5MB)</p>
                {fieldErrors.tradeLicense && <p className="text-red-500 text-xs mt-1">{fieldErrors.tradeLicense}</p>}
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
                  className="w-full px-0 py-3 bg-transparent text-gray-900 focus:outline-none border-0 border-b-2 border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Upload certificate (PDF, JPG, PNG files allowed, Max size: 5MB)</p>
                {fieldErrors.importExportCertificate && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.importExportCertificate}</p>
                )}
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          {formError && <p className="text-red-500 text-sm text-center mt-2">{formError}</p>}

          <button
            type="submit"
            className="w-full bg-black cursor-pointer hover:bg-gray-900 text-white font-semibold py-4 px-6 rounded-xl transition-transform transform hover:scale-[1.02] focus:ring-4 focus:ring-gray-200 focus:outline-none"
          >
            Create Customer Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;