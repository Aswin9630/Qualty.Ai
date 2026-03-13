// import React, { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { BASE_URL } from "../../utils/constants";

// const CERTIFICATE_OPTIONS = ["NABL", "NABCB", "COC", "ISO", "FOSFA", "ECTN"];

// export default function CompanySignup() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setError,
//     clearErrors,
//     formState: { errors, touchedFields },
//   } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

//   const publishRequirements = watch("publishRequirements", false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const [certificateSelections, setCertificateSelections] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [fileUploads, setFileUploads] = useState({});
//   const [submitError, setSubmitError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const dropdownRef = useRef(null);

//   const filteredCertificates = CERTIFICATE_OPTIONS.filter(
//     (c) => c.toLowerCase().includes(searchTerm.toLowerCase()) && !certificateSelections.includes(c)
//   );

//   useEffect(() => {
//     const onClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, []);

//   const handlePasswordChange = (e) => {
//     const val = e.target.value || "";
//     const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//     if (val.length < 8) setPasswordStrength("Weak");
//     else if (!strengthRegex.test(val)) setPasswordStrength("Medium");
//     else setPasswordStrength("Strong");
//   };

//   const handleFileChange = (e) => {
//     setSubmitError("");
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const allowed = ["application/pdf", "image/jpeg", "image/png"];
//     if (!allowed.includes(file.type)) {
//       setSubmitError("Only PDF, JPG, or PNG files are allowed for incorporation certificate.");
//       e.target.value = null;
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setSubmitError("File is too large. Please upload a file under 5MB.");
//       e.target.value = null;
//       return;
//     }
//     setFileUploads((p) => ({ ...p, incorporationCertificate: file }));
//   };

//   const addCertificate = (cert) => {
//     if (!cert) return;
//     if (certificateSelections.includes(cert)) return;
//     if (certificateSelections.length >= 5) {
//       setError("certificates", { type: "manual", message: "You can only select up to 5 certificates." });
//       return;
//     }
//     const updated = [...certificateSelections, cert];
//     setCertificateSelections(updated);
//     clearErrors("certificates");
//     setSearchTerm("");
//   };

//   const removeCertificate = (cert) => {
//     const updated = certificateSelections.filter((c) => c !== cert);
//     setCertificateSelections(updated);
//     if (updated.length === 0) {
//       setError("certificates", { type: "manual", message: "Please select at least one certificate." });
//     } else {
//       clearErrors("certificates");
//     }
//   };

//   const onSubmit = async (data) => {
//     setSubmitError("");
//     if (!Array.isArray(certificateSelections) || certificateSelections.length < 1) {
//       setError("certificates", { type: "manual", message: "Please select at least one certificate." });
//       return;
//     }
//     if (certificateSelections.length > 5) {
//       setError("certificates", { type: "manual", message: "You can only select up to 5 certificates." });
//       return;
//     }

//     const pub = data.publishRequirements === "true" || data.publishRequirements === true;
//     if (pub) {
//       const hasLicense = data.licenseNumber && String(data.licenseNumber).trim().length >= 6;
//       const hasFile = !!fileUploads.incorporationCertificate;
//       if (!hasLicense) {
//         setSubmitError("GST/VAT/TAX number is required when publishing requirements.");
//         return;
//       }
//       if (!hasFile) {
//         setSubmitError("Incorporation certificate is required when publishing requirements.");
//         return;
//       }
//     }

//     const formData = new FormData();
//     Object.entries(data).forEach(([k, v]) => {
//       if (typeof v === "boolean") formData.append(k, v.toString());
//       else if (typeof v !== "undefined" && v !== "") formData.append(k, v);
//     });

//     if (data.websiteUrl && data.websiteUrl.trim() !== "") formData.append("websiteUrl", data.websiteUrl.trim());

//     formData.append("role", "inspection_company");
//     formData.append("certificates", JSON.stringify(certificateSelections));

//     if (fileUploads.incorporationCertificate) {
//       formData.append("incorporationCertificate", fileUploads.incorporationCertificate);
//     }

//     try {
//       setIsSubmitting(true);
//       const res = await fetch(`${BASE_URL}/auth/signup/inspectionCompany`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const json = await res.json()
//       if (!res.ok || !json.success) {
//         if (json && Array.isArray(json.errors) && json.errors.length > 0) {
//           setSubmitError(json.errors[0].msg || json.message || "Validation failed");
//         } else {
//           setSubmitError(json.message || "Signup failed. Please check your details.");
//         }
//         return;
//       }

//       toast.success("Signup successful. Verification email sent.");
//       navigate("/verify-pending");
//     } catch (err) {
//       console.error(err);
//       setSubmitError("Failed to submit form. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputClass = "w-full border-b border-gray-600 p-2.5 text-sm bg-white focus:outline-none";
//   const chipClass = "inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md text-xs";

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-white px-4 py-6">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-2xl border border-gray-300 bg-white rounded-2xl p-8 shadow-md space-y-4"
//         noValidate
//       >
//         <h2 className="text-2xl font-bold text-center text-black">Company Signup</h2>

//         <input type="text" value="inspection_company" readOnly className={`${inputClass} bg-gray-100 cursor-not-allowed`} />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <input
//               placeholder="Company Name"
//               {...register("companyName", {
//                 required: "Company name is required.",
//                 minLength: { value: 2, message: "Enter at least 2 characters." },
//                 maxLength: { value: 100, message: "Too long (max 100 characters)." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.companyName && errors.companyName && (
//               <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
//             )}
//           </div>

//           <div>
//             <input
//               placeholder="Company Phone Number"
//               {...register("phoneNumber", {
//                 required: "Phone number is required.",
//                 pattern: { value: /^[0-9]{6,15}$/, message: "Enter only digits (6–15 characters)." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.phoneNumber && errors.phoneNumber && (
//               <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <input
//               placeholder="First Name"
//               {...register("firstName", {
//                 required: "First name is required.",
//                 pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.firstName && errors.firstName && (
//               <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
//             )}
//           </div>
//           <div>
//             <input
//               placeholder="Last Name"
//               {...register("lastName", {
//                 required: "Last name is required.",
//                 pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.lastName && errors.lastName && (
//               <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div>
//             <input
//               placeholder="Mobile Number"
//               {...register("mobileNumber", {
//                 required: "Mobile number is required.",
//                 pattern: { value: /^[0-9]{10,15}$/, message: "Enter a valid number." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.mobileNumber && errors.mobileNumber && (
//               <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
//             )}
//           </div>

//           <div>
//             <input
//               type="email"
//               placeholder="Email Address"
//               {...register("companyEmail", {
//                 required: "Email is required.",
//                 pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.companyEmail && errors.companyEmail && (
//               <p className="text-red-500 text-xs mt-1">{errors.companyEmail.message}</p>
//             )}
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               {...register("password", {
//                 required: "Password is required.",
//                 minLength: { value: 8, message: "At least 8 characters required." },
//               })}
//               onChange={handlePasswordChange}
//               className={inputClass}
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 cursor-pointer text-black"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               role="button"
//               tabIndex={0}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             {passwordStrength && (
//               <p
//                 className={`text-xs mt-1 ${
//                   passwordStrength === "Weak"
//                     ? "text-red-500"
//                     : passwordStrength === "Medium"
//                     ? "text-yellow-600"
//                     : "text-green-600"
//                 }`}
//               >
//                 Password Strength: {passwordStrength}
//               </p>
//             )}
//           </div>
//         </div>

//         <div ref={dropdownRef} className="space-y-2">
//           <label className="block text-sm font-medium text-black">Certificates you provide</label>

//           <div
//             className="w-full border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 items-center min-h-[44px] cursor-text"
//             onClick={() => setDropdownOpen(true)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 setDropdownOpen((s) => !s);
//                 e.preventDefault();
//               }
//             }}
//           >
//             {certificateSelections.length === 0 && (
//               <span className="text-xs text-gray-500">Select certificates (min 1, max 5)</span>
//             )}

//             {certificateSelections.map((cert) => (
//               <span key={cert} className={chipClass}>
//                 <span className="text-xs">{cert}</span>
//                 <button
//                   type="button"
//                   onClick={(ev) => {
//                     ev.stopPropagation();
//                     removeCertificate(cert);
//                   }}
//                   className="ml-1 text-white opacity-80 hover:opacity-100"
//                   aria-label={`Remove ${cert}`}
//                 >
//                   <FaTimes size={12} />
//                 </button>
//               </span>
//             ))}

//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setDropdownOpen(true);
//               }}
//               className="flex-1 min-w-[120px] outline-none p-1 text-sm"
//               aria-autocomplete="list"
//             />
//           </div>

//           {dropdownOpen && filteredCertificates.length > 0 && (
//             <ul className="mt-1 border border-gray-200 rounded-md max-h-40 overflow-y-auto text-sm bg-white shadow-sm">
//               {filteredCertificates.map((cert) => (
//                 <li
//                   key={cert}
//                   onClick={() => {
//                     addCertificate(cert);
//                     setDropdownOpen(false);
//                   }}
//                   className="px-3 py-2 hover:bg-black hover:text-white cursor-pointer"
//                   role="option"
//                 >
//                   {cert}
//                 </li>
//               ))}
//             </ul>
//           )}

//           {errors.certificates && (
//             <p className="text-red-500 text-xs mt-1">{errors.certificates.message}</p>
//           )}
//         </div>

//         <div className="flex items-center gap-2">
//           <input type="checkbox" id="publishRequirements" {...register("publishRequirements")} />
//           <label htmlFor="publishRequirements" className="text-sm text-black">
//             I want to upload my documents to proceed with bidding.
//           </label>
//         </div>

//         {publishRequirements && (
//           <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 space-y-4 shadow-sm mt-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <input
//                   placeholder="GST / VAT / Tax ID"
//                   {...register("licenseNumber", {
//                     required: publishRequirements ? "Please enter your GST number" : false,
//                     minLength: publishRequirements ? { value: 6, message: "License number must be at least 6 characters" } : undefined,
//                     pattern: publishRequirements ? { value: /^[A-Za-z0-9-\s]+$/, message: "Use only letters, numbers, spaces, or hyphens" } : undefined,
//                   })}
//                   className={inputClass}
//                 />
//                 {touchedFields.licenseNumber && errors.licenseNumber && (
//                   <p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>
//                 )}
//               </div>

//               <div>
//                 <input
//                   placeholder="Website URL (optional)"
//                   {...register("websiteUrl")}
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-black mb-2">Legal document (GST certificate / VAT registration / Incorporation certificate)</label>

//               <div className="flex items-center gap-3">
//                 <label
//                   htmlFor="incorp-file"
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md cursor-pointer text-sm select-none"
//                 >
//                   Upload file
//                 </label>

//                 <div className="flex-1">
//                   <input
//                     id="incorp-file"
//                     type="file"
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                   <div className="text-sm text-gray-700">
//                     {fileUploads.incorporationCertificate ? (
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="truncate">{fileUploads.incorporationCertificate.name}</span>
//                         <button
//                           type="button"
//                           onClick={() => setFileUploads((p) => ({ ...p, incorporationCertificate: null }))}
//                           className="text-xs text-red-600 hover:underline"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ) : (
//                       <span className="text-xs text-gray-500">No file selected. PDF, JPG, PNG (max 5MB).</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {submitError && <p className="text-red-600 text-sm mt-2">{submitError}</p>}

//         <div>
//           <button
//             type="submit"
//             className={`w-full cursor-pointer bg-black text-white py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
//                 </svg>
//                 <span>Signing up…</span>
//               </>
//             ) : (
//               <span>Sign Up</span>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
 



// import React, { useState, useRef, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { BASE_URL, COUNTRY_CODES } from "../../utils/constants";

// const CERTIFICATE_OPTIONS = ["NABL", "NABCB", "COC", "ISO", "FOSFA", "ECTN"];

// const selectStyles = {
//   control: (base, state) => ({
//     ...base,
//     border: "none",
//     borderBottom: "1px solid #4b5563",
//     borderRadius: 0,
//     boxShadow: "none",
//     background: "white",
//     minHeight: "38px",
//     "&:hover": { borderBottom: "1px solid #111" },
//   }),
//   valueContainer: (base) => ({ ...base, padding: "0 4px" }),
//   indicatorSeparator: () => ({ display: "none" }),
//   menu: (base) => ({ ...base, zIndex: 50, borderRadius: "8px", fontSize: "13px" }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isFocused ? "#000" : "white",
//     color: state.isFocused ? "white" : "#111",
//     cursor: "pointer",
//     padding: "8px 12px",
//   }),
//   singleValue: (base) => ({ ...base, fontSize: "13px" }),
//   placeholder: (base) => ({ ...base, fontSize: "13px", color: "#9ca3af" }),
// };

// export default function CompanySignup() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     control,
//     setError,
//     clearErrors,
//     formState: { errors, touchedFields },
//   } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const [certificateSelections, setCertificateSelections] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [submitError, setSubmitError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const dropdownRef = useRef(null);

//   const filteredCertificates = CERTIFICATE_OPTIONS.filter(
//     (c) =>
//       c.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       !certificateSelections.includes(c)
//   );

//   useEffect(() => {
//     const onClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", onClick);
//     return () => document.removeEventListener("mousedown", onClick);
//   }, []);

//   const handlePasswordChange = (e) => {
//     const val = e.target.value || "";
//     const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//     if (val.length < 8) setPasswordStrength("Weak");
//     else if (!strengthRegex.test(val)) setPasswordStrength("Medium");
//     else setPasswordStrength("Strong");
//   };

//   const addCertificate = (cert) => {
//     if (!cert || certificateSelections.includes(cert)) return;
//     if (certificateSelections.length >= 5) {
//       setError("certificates", {
//         type: "manual",
//         message: "You can only select up to 5 certificates.",
//       });
//       return;
//     }
//     setCertificateSelections([...certificateSelections, cert]);
//     clearErrors("certificates");
//     setSearchTerm("");
//   };

//   const removeCertificate = (cert) => {
//     const updated = certificateSelections.filter((c) => c !== cert);
//     setCertificateSelections(updated);
//     if (updated.length === 0)
//       setError("certificates", {
//         type: "manual",
//         message: "Please select at least one certificate.",
//       });
//     else clearErrors("certificates");
//   };

//   const onSubmit = async (data) => {
//     setSubmitError("");

//     if (!certificateSelections.length) {
//       setError("certificates", {
//         type: "manual",
//         message: "Please select at least one certificate.",
//       });
//       return;
//     }
//     if (certificateSelections.length > 5) {
//       setError("certificates", {
//         type: "manual",
//         message: "You can only select up to 5 certificates.",
//       });
//       return;
//     }

//     if (!data.countryCode?.value) {
//       setSubmitError("Please select a country code.");
//       return;
//     }

//     const formData = new FormData();

//     const fields = [
//       "companyName",
//       "phoneNumber",
//       "firstName",
//       "lastName",
//       "mobileNumber",
//       "companyEmail",
//       "password",
//       "websiteUrl",
//     ];

//     fields.forEach((k) => {
//       if (data[k] !== undefined && data[k] !== "") formData.append(k, data[k]);
//     });

//     formData.append("role", "inspection_company");
//     formData.append("countryCode", data.countryCode.value);
//     formData.append("certificates", JSON.stringify(certificateSelections));

//     try {
//       setIsSubmitting(true);
//       const res = await fetch(`${BASE_URL}/auth/signup/inspectionCompany`, {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       const json = await res.json();
//       if (!res.ok || !json.success) {
//         if (json && Array.isArray(json.errors) && json.errors.length > 0) {
//           setSubmitError(json.errors[0].msg || json.message || "Validation failed");
//         } else {
//           setSubmitError(json.message || "Signup failed. Please check your details.");
//         }
//         return;
//       }

//       toast.success("Signup successful. Verification email sent.");
//       navigate("/verify-pending");
//     } catch (err) {
//       setSubmitError("Failed to submit form. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputClass =
//     "w-full border-b border-gray-600 p-2.5 text-sm bg-white focus:outline-none";
//   const chipClass =
//     "inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md text-xs";

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-white px-4 py-6">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-2xl border border-gray-300 bg-white rounded-2xl p-8 shadow-md space-y-4"
//         noValidate
//       >
//         <h2 className="text-2xl font-bold text-center text-black">Company Signup</h2>

//         <input
//           type="text"
//           value="inspection_company"
//           readOnly
//           className={`${inputClass} bg-gray-100 cursor-not-allowed`}
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <input
//               placeholder="Company Name"
//               {...register("companyName", {
//                 required: "Company name is required.",
//                 minLength: { value: 2, message: "Enter at least 2 characters." },
//                 maxLength: { value: 100, message: "Too long (max 100 characters)." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.companyName && errors.companyName && (
//               <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
//             )}
//           </div>

//           <div>
//             <input
//               placeholder="Company Phone Number"
//               {...register("phoneNumber", {
//                 required: "Phone number is required.",
//                 pattern: {
//                   value: /^[0-9]{6,15}$/,
//                   message: "Enter only digits (6–15 characters).",
//                 },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.phoneNumber && errors.phoneNumber && (
//               <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <input
//               placeholder="First Name"
//               {...register("firstName", {
//                 required: "First name is required.",
//                 pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.firstName && errors.firstName && (
//               <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
//             )}
//           </div>
//           <div>
//             <input
//               placeholder="Last Name"
//               {...register("lastName", {
//                 required: "Last name is required.",
//                 pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.lastName && errors.lastName && (
//               <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-xs text-gray-500 mb-1">Country Code</label>
//             <Controller
//               name="countryCode"
//               control={control}
//               rules={{ required: "Country code is required." }}
//               render={({ field }) => (
//                 <Select
//                   {...field}
//                   options={COUNTRY_CODES}
//                   placeholder="Select country code..."
//                   styles={selectStyles}
//                   isSearchable
//                   menuPlacement="auto"
//                 />
//               )}
//             />
//             {errors.countryCode && (
//               <p className="text-red-500 text-xs mt-1">{errors.countryCode.message}</p>
//             )}
//           </div>

//           <div>
//             <input
//               placeholder="Mobile Number"
//               {...register("mobileNumber", {
//                 required: "Mobile number is required.",
//                 pattern: {
//                   value: /^[0-9]{6,15}$/,
//                   message: "Enter a valid number (digits only).",
//                 },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.mobileNumber && errors.mobileNumber && (
//               <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <input
//               type="email"
//               placeholder="Email Address"
//               {...register("companyEmail", {
//                 required: "Email is required.",
//                 pattern: {
//                   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                   message: "Invalid email format.",
//                 },
//               })}
//               className={inputClass}
//             />
//             {touchedFields.companyEmail && errors.companyEmail && (
//               <p className="text-red-500 text-xs mt-1">{errors.companyEmail.message}</p>
//             )}
//           </div>

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               {...register("password", {
//                 required: "Password is required.",
//                 minLength: { value: 8, message: "At least 8 characters required." },
//               })}
//               onChange={handlePasswordChange}
//               className={inputClass}
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 cursor-pointer text-black"
//               role="button"
//               tabIndex={0}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//             {passwordStrength && (
//               <p
//                 className={`text-xs mt-1 ${
//                   passwordStrength === "Weak"
//                     ? "text-red-500"
//                     : passwordStrength === "Medium"
//                     ? "text-yellow-600"
//                     : "text-green-600"
//                 }`}
//               >
//                 Password Strength: {passwordStrength}
//               </p>
//             )}
//           </div>
//         </div>

//         <div>
//           <input
//             placeholder="Website URL (optional)"
//             {...register("websiteUrl")}
//             className={inputClass}
//           />
//         </div>

//         <div ref={dropdownRef} className="space-y-2">
//           <label className="block text-sm font-medium text-black">
//             Certificates you provide
//           </label>

//           <div
//             className="w-full border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 items-center min-h-[44px] cursor-text"
//             onClick={() => setDropdownOpen(true)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 setDropdownOpen((s) => !s);
//                 e.preventDefault();
//               }
//             }}
//           >
//             {certificateSelections.length === 0 && (
//               <span className="text-xs text-gray-500">Select certificates (min 1, max 5)</span>
//             )}
//             {certificateSelections.map((cert) => (
//               <span key={cert} className={chipClass}>
//                 <span className="text-xs">{cert}</span>
//                 <button
//                   type="button"
//                   onClick={(ev) => {
//                     ev.stopPropagation();
//                     removeCertificate(cert);
//                   }}
//                   className="ml-1 text-white opacity-80 hover:opacity-100"
//                 >
//                   <FaTimes size={12} />
//                 </button>
//               </span>
//             ))}
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setDropdownOpen(true);
//               }}
//               className="flex-1 min-w-[120px] outline-none p-1 text-sm"
//             />
//           </div>

//           {dropdownOpen && filteredCertificates.length > 0 && (
//             <ul className="mt-1 border border-gray-200 rounded-md max-h-40 overflow-y-auto text-sm bg-white shadow-sm">
//               {filteredCertificates.map((cert) => (
//                 <li
//                   key={cert}
//                   onClick={() => {
//                     addCertificate(cert);
//                     setDropdownOpen(false);
//                   }}
//                   className="px-3 py-2 hover:bg-black hover:text-white cursor-pointer"
//                 >
//                   {cert}
//                 </li>
//               ))}
//             </ul>
//           )}

//           {errors.certificates && (
//             <p className="text-red-500 text-xs mt-1">{errors.certificates.message}</p>
//           )}
//         </div>

//         <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
//           <p className="text-xs text-gray-500 leading-relaxed">
//             <strong className="text-gray-700">Note:</strong> After signup and email
//             verification, go to <strong>My Account → GST Details</strong> to verify your
//             GSTIN (Indian companies) or upload a legal document (international companies).
//             Verification is required before you can place bids.
//           </p>
//         </div>

//         {submitError && <p className="text-red-600 text-sm mt-2">{submitError}</p>}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full cursor-pointer bg-black text-white py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
//         >
//           {isSubmitting ? (
//             <>
//               <svg
//                 className="animate-spin h-4 w-4 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8z"
//                 />
//               </svg>
//               <span>Signing up…</span>
//             </>
//           ) : (
//             <span>Sign Up</span>
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }












import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, COUNTRY_CODES } from "../../utils/constants";


const CERTIFICATE_OPTIONS = ["NABL", "NABCB", "COC", "ISO", "FOSFA", "ECTN"];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: "none",
    borderBottom: "1px solid #4b5563",
    borderRadius: 0,
    boxShadow: "none",
    background: "white",
    minHeight: "38px",
    "&:hover": { borderBottom: "1px solid #111" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 4px" }),
  indicatorSeparator: () => ({ display: "none" }),
  menu: (base) => ({ ...base, zIndex: 50, borderRadius: "8px", fontSize: "13px" }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#000" : "white",
    color: state.isFocused ? "white" : "#111",
    cursor: "pointer",
    padding: "8px 12px",
  }),
  singleValue: (base) => ({ ...base, fontSize: "13px" }),
  placeholder: (base) => ({ ...base, fontSize: "13px", color: "#9ca3af" }),
};



const TRUST_POINTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    heading: "Verified Trader Network",
    body: "Every trader is KYC-verified before posting inspection queries. No spam, no ghosts.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    heading: "Escrow-Protected Payments",
    body: "Funds are locked in escrow before you start. 20 % advance on acceptance, 100 % on delivery.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    heading: "50 + Countries, One Platform",
    body: "Instant visibility to traders across Europe, Asia, Americas, and Africa.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    heading: "Instant Query Matching",
    body: "Our algorithm surfaces your company the moment a matching query is posted.",
  },
];

const STATS = [
  { value: "10K+",  label: "Traders"    },
  { value: "2.5K+", label: "Partners"   },
  { value: "50+",   label: "Countries"  },
  { value: "0%",    label: "Commission" },
];

const TESTIMONIALS = [
  {
    quote: "Got our first inspection query within 48 hours of signup. The escrow system gave us total confidence.",
    name:  "Arjun S.",
    role:  "Inspection Manager, Mumbai",
    init:  "AS",
  },
  {
    quote: "No back-and-forth. We list, get matched, inspect, and get paid. Exactly what we needed.",
    name:  "Chen Wei",
    role:  "QC Director, Shenzhen",
    init:  "CW",
  },
  {
    quote: "Qualty.AI brought us traders from 12 countries in our first month. Outstanding reach.",
    name:  "Priya M.",
    role:  "Director, Chennai Labs",
    init:  "PM",
  },
];

function LeftPanel() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <aside
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        background: "linear-gradient(160deg, #09090f 0%, #0e1520 55%, #0a1018 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "44px 40px",
        overflow: "hidden",
        gap: 0,
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}/>

      <div style={{
        position: "absolute", top: -140, right: -100,
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,100,160,0.22) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", bottom: -100, left: -80,
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,40,80,0.45) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)",
      }}/>

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold font-sans text-white">Qualty.AI</a>
          </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, marginBottom: 22 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(255,255,255,0.055)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 100, padding: "5px 13px",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
            animation: "lp_pulse 2s infinite",
          }}/>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
          }}>
            Now accepting partners
          </span>
        </span>
      </div>

      <div style={{ position: "relative", zIndex: 1, marginBottom: 10 }}>
        <h2 style={{
          fontSize: "clamp(24px,2.4vw,32px)", fontWeight: 900,
          lineHeight: 1.1, letterSpacing: "-0.7px", color: "white", margin: 0,
        }}>
          Join the global
          <br/>
          <span style={{
            background: "linear-gradient(120deg,#a8c4e8 0%,#6899cc 60%,#3d6ea8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            inspection network.
          </span>
        </h2>
        <p style={{
          marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.35)",
          lineHeight: 1.75, maxWidth: 310,
        }}>
          Register your company and connect with verified traders worldwide.
          Real queries. Guaranteed payments.
        </p>
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", gap: 16,
        margin: "24px 0",
      }}>
        {TRUST_POINTS.map(({ icon, heading, body }, i) => (
          <div key={i} style={{
            display: "flex", gap: 13, alignItems: "flex-start",
            animation: `lp_up 0.55s ${i * 90}ms both`,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 9, flexShrink: 0,
              background: "rgba(255,255,255,0.055)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(168,196,232,0.82)",
            }}>
              {icon}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.82)" }}>
                {heading}
              </p>
              <p style={{ margin: "3px 0 0", fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9,
        marginBottom: 24,
      }}>
        {STATS.map(({ value, label }) => (
          <div key={label} style={{
            background: "rgba(255,255,255,0.038)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 11, padding: "13px 15px",
          }}>
            <div style={{ fontSize: 21, fontWeight: 900, color: "white", letterSpacing: "-0.5px", lineHeight: 1 }}>
              {value}
            </div>
            <div style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.26)", marginTop: 4,
            }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.042)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, padding: "18px 20px",
          position: "relative", overflow: "hidden",
          minHeight: 130,
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg,transparent,rgba(168,196,232,0.35),transparent)",
          }}/>

          <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="#f59e0b" width="11" height="11">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>

          <div style={{ position: "relative", minHeight: 74 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                position: i === 0 ? "relative" : "absolute",
                top: 0, left: 0, right: 0,
                opacity: tick === i ? 1 : 0,
                transform: tick === i ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
                pointerEvents: tick === i ? "auto" : "none",
              }}>
                <p style={{
                  fontSize: 12, color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7, fontStyle: "italic", margin: "0 0 12px",
                }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg,#1a1a2e,#4a6fa5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 800, color: "white",
                  }}>
                    {t.init}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.68)" }}>{t.name}</p>
                    <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.28)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 12 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTick(i)}
              style={{
                height: 4, borderRadius: 100, border: "none",
                background: tick === i ? "rgba(168,196,232,0.75)" : "rgba(255,255,255,0.14)",
                width: tick === i ? 20 : 6,
                transition: "all 0.3s ease",
                cursor: "pointer", padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lp_pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        @keyframes lp_up    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </aside>
  );
}



function CompanySignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const [showPassword, setShowPassword]             = useState(false);
  const [passwordStrength, setPasswordStrength]     = useState("");
  const [certificateSelections, setCertificateSelections] = useState([]);
  const [searchTerm, setSearchTerm]                 = useState("");
  const [dropdownOpen, setDropdownOpen]             = useState(false);
  const [submitError, setSubmitError]               = useState("");
  const [isSubmitting, setIsSubmitting]             = useState(false);
  const dropdownRef = useRef(null);

  const filteredCertificates = CERTIFICATE_OPTIONS.filter(
    (c) =>
      c.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !certificateSelections.includes(c)
  );

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handlePasswordChange = (e) => {
    const val = e.target.value || "";
    const strengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (val.length < 8) setPasswordStrength("Weak");
    else if (!strengthRegex.test(val)) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  const addCertificate = (cert) => {
    if (!cert || certificateSelections.includes(cert)) return;
    if (certificateSelections.length >= 5) {
      setError("certificates", {
        type: "manual",
        message: "You can only select up to 5 certificates.",
      });
      return;
    }
    setCertificateSelections([...certificateSelections, cert]);
    clearErrors("certificates");
    setSearchTerm("");
  };

  const removeCertificate = (cert) => {
    const updated = certificateSelections.filter((c) => c !== cert);
    setCertificateSelections(updated);
    if (updated.length === 0)
      setError("certificates", {
        type: "manual",
        message: "Please select at least one certificate.",
      });
    else clearErrors("certificates");
  };

  const onSubmit = async (data) => {
    setSubmitError("");

    if (!certificateSelections.length) {
      setError("certificates", {
        type: "manual",
        message: "Please select at least one certificate.",
      });
      return;
    }
    if (certificateSelections.length > 5) {
      setError("certificates", {
        type: "manual",
        message: "You can only select up to 5 certificates.",
      });
      return;
    }

    if (!data.countryCode?.value) {
      setSubmitError("Please select a country code.");
      return;
    }

    const formData = new FormData();

    const fields = [
      "companyName",
      "phoneNumber",
      "firstName",
      "lastName",
      "mobileNumber",
      "companyEmail",
      "password",
      "websiteUrl",
    ];

    fields.forEach((k) => {
      if (data[k] !== undefined && data[k] !== "") formData.append(k, data[k]);
    });

    formData.append("role", "inspection_company");
    formData.append("countryCode", data.countryCode.value);
    formData.append("certificates", JSON.stringify(certificateSelections));

    try {
      setIsSubmitting(true);
      const res = await fetch(`${BASE_URL}/auth/signup/inspectionCompany`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        if (json && Array.isArray(json.errors) && json.errors.length > 0) {
          setSubmitError(json.errors[0].msg || json.message || "Validation failed");
        } else {
          setSubmitError(json.message || "Signup failed. Please check your details.");
        }
        return;
      }

      toast.success("Signup successful. Verification email sent.");
      navigate("/verify-pending");
    } catch (err) {
      setSubmitError("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border-b border-gray-600 p-2.5 text-sm bg-white focus:outline-none";
  const chipClass =
    "inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md text-xs";

  return (
    <div className="w-full px-4 py-8 lg:py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl border border-gray-300 bg-white rounded-2xl p-8 shadow-md space-y-4"
        noValidate
      >
        <h2 className="text-2xl font-bold text-center text-black">Company Signup</h2>

        <input
          type="text"
          value="inspection_company"
          readOnly
          className={`${inputClass} bg-gray-100 cursor-not-allowed`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              placeholder="Company Name"
              {...register("companyName", {
                required: "Company name is required.",
                minLength: { value: 2, message: "Enter at least 2 characters." },
                maxLength: { value: 100, message: "Too long (max 100 characters)." },
              })}
              className={inputClass}
            />
            {touchedFields.companyName && errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Company Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]{6,15}$/,
                  message: "Enter only digits (6–15 characters).",
                },
              })}
              className={inputClass}
            />
            {touchedFields.phoneNumber && errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is required.",
                pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
              })}
              className={inputClass}
            />
            {touchedFields.firstName && errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name is required.",
                pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed." },
              })}
              className={inputClass}
            />
            {touchedFields.lastName && errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Country Code</label>
            <Controller
              name="countryCode"
              control={control}
              rules={{ required: "Country code is required." }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={COUNTRY_CODES}
                  placeholder="Select country code..."
                  styles={selectStyles}
                  isSearchable
                  menuPlacement="auto"
                />
              )}
            />
            {errors.countryCode && (
              <p className="text-red-500 text-xs mt-1">{errors.countryCode.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Mobile Number"
              {...register("mobileNumber", {
                required: "Mobile number is required.",
                pattern: {
                  value: /^[0-9]{6,15}$/,
                  message: "Enter a valid number (digits only).",
                },
              })}
              className={inputClass}
            />
            {touchedFields.mobileNumber && errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("companyEmail", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              className={inputClass}
            />
            {touchedFields.companyEmail && errors.companyEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.companyEmail.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required.",
                minLength: { value: 8, message: "At least 8 characters required." },
              })}
              onChange={handlePasswordChange}
              className={inputClass}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-black"
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordStrength && (
              <p
                className={`text-xs mt-1 ${
                  passwordStrength === "Weak"
                    ? "text-red-500"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            placeholder="Website URL (optional)"
            {...register("websiteUrl")}
            className={inputClass}
          />
        </div>

        <div ref={dropdownRef} className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Certificates you provide
          </label>

          <div
            className="w-full border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 items-center min-h-[44px] cursor-text"
            onClick={() => setDropdownOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setDropdownOpen((s) => !s);
                e.preventDefault();
              }
            }}
          >
            {certificateSelections.length === 0 && (
              <span className="text-xs text-gray-500">Select certificates (min 1, max 5)</span>
            )}
            {certificateSelections.map((cert) => (
              <span key={cert} className={chipClass}>
                <span className="text-xs">{cert}</span>
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    removeCertificate(cert);
                  }}
                  className="ml-1 text-white opacity-80 hover:opacity-100"
                >
                  <FaTimes size={12} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDropdownOpen(true);
              }}
              className="flex-1 min-w-[120px] outline-none p-1 text-sm"
            />
          </div>

          {dropdownOpen && filteredCertificates.length > 0 && (
            <ul className="mt-1 border border-gray-200 rounded-md max-h-40 overflow-y-auto text-sm bg-white shadow-sm">
              {filteredCertificates.map((cert) => (
                <li
                  key={cert}
                  onClick={() => {
                    addCertificate(cert);
                    setDropdownOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-black hover:text-white cursor-pointer"
                >
                  {cert}
                </li>
              ))}
            </ul>
          )}

          {errors.certificates && (
            <p className="text-red-500 text-xs mt-1">{errors.certificates.message}</p>
          )}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Note:</strong> After signup and email
            verification, go to <strong>My Account → GST Details</strong> to verify your
            GSTIN (Indian companies) or upload a legal document (international companies).
            Verification is required before you can place bids.
          </p>
        </div>

        {submitError && <p className="text-red-600 text-sm mt-2">{submitError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer bg-black text-white py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <span>Signing up…</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>

        <div>
          <p className="text-blue-700 font-semibold">Already have an Account? 
            <Link to="/login">
            <span className="underline cursor-pointer text-blue-900">Login</span>
            </Link>
            </p>
        </div>
      </form>
    </div>
  );
}


export default function CompanySignupPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f5fb" }}>

      <div
        className="hidden lg:block"
        style={{ width: "42%", minWidth: 360, maxWidth: 500, flexShrink: 0 }}
      >
        <LeftPanel />
      </div>

      <div style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: 40,
      }}>

        <div
          className="flex lg:hidden items-center gap-2 w-full px-5 pt-5 pb-2"
        >
           <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold font-sans">Qualty.AI</a>
          </div>
        </div>

        <div
          className="flex lg:hidden flex-wrap gap-2 px-5 pb-3 w-full"
        >
          {[
            { e: "🔒", t: "Escrow payments" },
            { e: "✅", t: "Verified traders" },
            { e: "⚡", t: "Instant matching" },
          ].map(({ e, t }) => (
            <span key={t} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "white", border: "1px solid #e5e7eb",
              borderRadius: 100, padding: "4px 11px",
              fontSize: 11, fontWeight: 600, color: "#374151",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}>
              {e} {t}
            </span>
          ))}
        </div>

        <CompanySignup />

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 20, flexWrap: "wrap",
          padding: "0 20px 8px",
        }}>
          {[
            { icon: "🔐", label: "SSL Encrypted" },
            { icon: "🏦", label: "Bank-level Security" },
            { icon: "📋", label: "GDPR Compliant" },
          ].map(({ icon, label }) => (
            <div key={label} style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 11, fontWeight: 600, color: "#9ca3af",
            }}>
              <span style={{ fontSize: 13 }}>{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}