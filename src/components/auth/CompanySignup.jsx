import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../utils/constants";

const CERTIFICATE_OPTIONS = ["NABL", "NABCB", "COC", "ISO", "FOSFA", "ECTN"];

export default function CompanySignup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onBlur", reValidateMode: "onChange" });

  const publishRequirements = watch("publishRequirements", false);

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [certificateSelections, setCertificateSelections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fileUploads, setFileUploads] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dropdownRef = useRef(null);

  const filteredCertificates = CERTIFICATE_OPTIONS.filter(
    (c) => c.toLowerCase().includes(searchTerm.toLowerCase()) && !certificateSelections.includes(c)
  );

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
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

  const handleFileChange = (e) => {
    setSubmitError("");
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      setSubmitError("Only PDF, JPG, or PNG files are allowed for incorporation certificate.");
      e.target.value = null;
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError("File is too large. Please upload a file under 5MB.");
      e.target.value = null;
      return;
    }
    setFileUploads((p) => ({ ...p, incorporationCertificate: file }));
  };

  const addCertificate = (cert) => {
    if (!cert) return;
    if (certificateSelections.includes(cert)) return;
    if (certificateSelections.length >= 5) {
      setError("certificates", { type: "manual", message: "You can only select up to 5 certificates." });
      return;
    }
    const updated = [...certificateSelections, cert];
    setCertificateSelections(updated);
    clearErrors("certificates");
    setSearchTerm("");
  };

  const removeCertificate = (cert) => {
    const updated = certificateSelections.filter((c) => c !== cert);
    setCertificateSelections(updated);
    if (updated.length === 0) {
      setError("certificates", { type: "manual", message: "Please select at least one certificate." });
    } else {
      clearErrors("certificates");
    }
  };

  const onSubmit = async (data) => {
    setSubmitError("");
    if (!Array.isArray(certificateSelections) || certificateSelections.length < 1) {
      setError("certificates", { type: "manual", message: "Please select at least one certificate." });
      return;
    }
    if (certificateSelections.length > 5) {
      setError("certificates", { type: "manual", message: "You can only select up to 5 certificates." });
      return;
    }

    const pub = data.publishRequirements === "true" || data.publishRequirements === true;
    if (pub) {
      const hasLicense = data.licenseNumber && String(data.licenseNumber).trim().length >= 6;
      const hasFile = !!fileUploads.incorporationCertificate;
      if (!hasLicense) {
        setSubmitError("GST/VAT/TAX number is required when publishing requirements.");
        return;
      }
      if (!hasFile) {
        setSubmitError("Incorporation certificate is required when publishing requirements.");
        return;
      }
    }

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (typeof v === "boolean") formData.append(k, v.toString());
      else if (typeof v !== "undefined" && v !== "") formData.append(k, v);
    });

    if (data.websiteUrl && data.websiteUrl.trim() !== "") formData.append("websiteUrl", data.websiteUrl.trim());

    formData.append("role", "inspection_company");
    formData.append("certificates", JSON.stringify(certificateSelections));

    if (fileUploads.incorporationCertificate) {
      formData.append("incorporationCertificate", fileUploads.incorporationCertificate);
    }

    try {
      setIsSubmitting(true);
      const res = await fetch(`${BASE_URL}/auth/signup/inspectionCompany`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await res.json()
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
      console.error(err);
      setSubmitError("Failed to submit form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full border-b border-gray-600 p-2.5 text-sm bg-white focus:outline-none";
  const chipClass = "inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md text-xs";

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-4 py-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl border border-gray-300 bg-white rounded-2xl p-8 shadow-md space-y-4"
        noValidate
      >
        <h2 className="text-2xl font-bold text-center text-black">Company Signup</h2>

        <input type="text" value="inspection_company" readOnly className={`${inputClass} bg-gray-100 cursor-not-allowed`} />

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
                pattern: { value: /^[0-9]{6,15}$/, message: "Enter only digits (6–15 characters)." },
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <input
              placeholder="Mobile Number"
              {...register("mobileNumber", {
                required: "Mobile number is required.",
                pattern: { value: /^[0-9]{10,15}$/, message: "Enter a valid number." },
              })}
              className={inputClass}
            />
            {touchedFields.mobileNumber && errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...register("companyEmail", {
                required: "Email is required.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." },
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
              aria-label={showPassword ? "Hide password" : "Show password"}
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

        <div ref={dropdownRef} className="space-y-2">
          <label className="block text-sm font-medium text-black">Certificates you provide</label>

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
                  aria-label={`Remove ${cert}`}
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
              aria-autocomplete="list"
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
                  role="option"
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

        <div className="flex items-center gap-2">
          <input type="checkbox" id="publishRequirements" {...register("publishRequirements")} />
          <label htmlFor="publishRequirements" className="text-sm text-black">
            I want to upload my documents to proceed with bidding.
          </label>
        </div>

        {publishRequirements && (
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 space-y-4 shadow-sm mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="GST / VAT / Tax ID"
                  {...register("licenseNumber", {
                    required: publishRequirements ? "Please enter your GST number" : false,
                    minLength: publishRequirements ? { value: 6, message: "License number must be at least 6 characters" } : undefined,
                    pattern: publishRequirements ? { value: /^[A-Za-z0-9-\s]+$/, message: "Use only letters, numbers, spaces, or hyphens" } : undefined,
                  })}
                  className={inputClass}
                />
                {touchedFields.licenseNumber && errors.licenseNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Website URL (optional)"
                  {...register("websiteUrl")}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Legal document (GST certificate / VAT registration / Incorporation certificate)</label>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="incorp-file"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md cursor-pointer text-sm select-none"
                >
                  Upload file
                </label>

                <div className="flex-1">
                  <input
                    id="incorp-file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="text-sm text-gray-700">
                    {fileUploads.incorporationCertificate ? (
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate">{fileUploads.incorporationCertificate.name}</span>
                        <button
                          type="button"
                          onClick={() => setFileUploads((p) => ({ ...p, incorporationCertificate: null }))}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No file selected. PDF, JPG, PNG (max 5MB).</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {submitError && <p className="text-red-600 text-sm mt-2">{submitError}</p>}

        <div>
          <button
            type="submit"
            className={`w-full cursor-pointer bg-black text-white py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span>Signing up…</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
 