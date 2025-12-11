// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { COMPANY_API } from "../../../utils/constants";
// import { toast } from "react-toastify";

// export default function CompanyAccount() {
//   const user = useSelector(s => s.user.user);
//   const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || "");
//   const [file, setFile] = useState(null);

//   const upload = async () => {
//     const fd = new FormData();
//     if (file) fd.append("incorporationCertificate", file);
//     fd.append("licenseNumber", licenseNumber);
//     fd.append("publishRequirements", "true");

//     const res = await fetch(`${COMPANY_API}/profile/updateDocuments`, {
//       method: "PATCH",
//       credentials: "include",
//       body: fd
//     });
//     const data = await res.json();
//     if (res.ok) toast.success("Updated");
//     else toast.error(data.message || "Failed");
//   };

//   return (
//     <div className="min-h-screen bg-white px-6 py-10">
//       <div className="max-w-3xl mx-auto bg-white border rounded p-6">
//         <h1 className="text-2xl font-bold mb-4">My Account</h1>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm">License Number</label>
//             <input value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} className="w-full border px-3 py-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm">Incorporation Certificate</label>
//             <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files[0])} />
//           </div>
//           <button onClick={upload} className="bg-black text-white px-4 py-2 rounded">Upload</button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, COMPANY_API, getCurrencySymbol } from "../../../utils/constants";
import { toast } from "react-toastify";
import Shimmer from "../../ShimmerUI";

export default function CompanyAccount() {
  const reduxUser = useSelector((s) => s.user?.user || null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [licenseNumber, setLicenseNumber] = useState("");
  const [publishRequirements, setPublishRequirements] = useState(false);
  const [file, setFile] = useState(null);

  const [companyData, setCompanyData] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (reduxUser) {
      setCompanyData(reduxUser);
      setLicenseNumber(reduxUser.licenseNumber || "");
      setPublishRequirements(Boolean(reduxUser.publishRequirements));
      setLoading(false);
    } else {
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(`${BASE_URL}/auth/profile`, { credentials: "include" });
          const json = await res.json();
          if (res.ok && json.company) {
            setCompanyData(json.company);
            setLicenseNumber(json.company.licenseNumber || "");
            setPublishRequirements(Boolean(json.company.publishRequirements));
          } else {
            setCompanyData(reduxUser || null);
          }
        } catch (err) {
          console.error("Failed to load company profile", err);
          setCompanyData(reduxUser || null);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [reduxUser]);

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) {
      setFile(null);
      return;
    }
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowed.includes(f.type)) {
      toast.error("Only PDF, JPG or PNG allowed");
      e.target.value = null;
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      e.target.value = null;
      return;
    }
    setFile(f);
  };

  const handleSubmit = async () => {
    // basic client validation
    if (publishRequirements && (!licenseNumber || String(licenseNumber).trim().length < 16)) {
      toast.error("License number must be at least 16 characters when publishing requirements");
      return;
    }

    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("publishRequirements", publishRequirements ? "true" : "false");
      if (licenseNumber) fd.append("licenseNumber", licenseNumber.trim());
      if (file) fd.append("incorporationCertificate", file);

      const res = await fetch(`${COMPANY_API}/profile/updateDocuments`, {
        method: "PATCH",
        credentials: "include",
        body: fd,
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        toast.success(json.message || "Profile updated");
        // update local preview
        setCompanyData((prev) => ({
          ...(prev || {}),
          licenseNumber: licenseNumber || prev?.licenseNumber,
          publishRequirements,
          documents: {
            ...(prev?.documents || {}),
            incorporationCertificate: json.company?.documents?.incorporationCertificate || prev?.documents?.incorporationCertificate || prev?.documents?.incorporationCertificate,
          },
        }));
        // clear file input
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        toast.error(json.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error", err);
      toast.error("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <Shimmer className="h-8 w-1/3 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Shimmer className="h-40 rounded" />
            <Shimmer className="h-40 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const docUrl = companyData?.documents?.incorporationCertificate || null;

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white border rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">My Account</h1>
            <p className="text-sm text-gray-600 mt-1">Manage company profile and documents</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Member since</div>
            <div className="text-sm text-black font-medium">
              {companyData?.createdAt ? new Date(companyData.createdAt).toLocaleDateString() : "—"}
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Read-only details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">Company Name</div>
              <div className="text-sm text-black font-medium">{companyData?.companyName || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Contact Person</div>
              <div className="text-sm text-black font-medium">
                {companyData?.firstName || ""} {companyData?.lastName || ""}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Company Email</div>
              <div className="text-sm text-black font-medium">{companyData?.companyEmail || "—"}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500">Phone</div>
              <div className="text-sm text-black font-medium">{companyData?.phoneNumber || companyData?.mobileNumber || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">PAN</div>
              <div className="text-sm text-black font-medium">{companyData?.panNumber || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">GST</div>
              <div className="text-sm text-black font-medium">{companyData?.gstNumber || "—"}</div>
            </div>
          </div>
        </section>

        <hr className="my-4 border-gray-100" />

        {/* Editable form */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              id="publishRequirements"
              type="checkbox"
              checked={publishRequirements}
              onChange={(e) => setPublishRequirements(e.target.checked)}
              className="h-4 w-4 cursor-pointer"
            />
            <label htmlFor="publishRequirements" className="text-sm text-black cursor-pointer">
              I want to publish requirements (enable bidding)
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">License Number</label>
              <input
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="Enter license number"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
              <p className="text-xs text-gray-400 mt-1">Required when publishing requirements. Min 16 characters.</p>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Incorporation Certificate</label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="incorp-file"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded cursor-pointer text-sm select-none"
                >
                  Upload file
                </label>
                <input
                  id="incorp-file"
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={onFileChange}
                  className="hidden"
                />
                <div className="text-sm text-gray-700">
                  {file ? (
                    <div className="flex items-center gap-3">
                      <span className="truncate max-w-xs">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = null;
                        }}
                        className="text-xs text-red-600 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : docUrl ? (
                    <div className="flex items-center gap-3">
                      <a
                        href={docUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-black underline cursor-pointer"
                      >
                        View current document
                      </a>
                      <span className="text-xs text-gray-400">• uploaded</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">No file selected. PDF, JPG, PNG (max 5MB).</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              onClick={() => {
                // reset to original values
                setLicenseNumber(companyData?.licenseNumber || "");
                setPublishRequirements(Boolean(companyData?.publishRequirements));
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = null;
                toast.info("Changes discarded");
              }}
              className="px-4 py-2 rounded border border-gray-200 text-sm cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`px-4 py-2 rounded text-sm text-white bg-black hover:bg-gray-900 transition cursor-pointer ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Saving…" : "Save changes"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
