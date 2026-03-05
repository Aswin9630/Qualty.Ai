// import { useState, useEffect } from "react";
// import {
//   ShieldCheck, Loader2, Search, Building2,
//   MapPin, Calendar, FileText, Hash,
//   RefreshCw, CheckCircle2, AlertTriangle, Info
// } from "lucide-react";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { addUser } from "../../../redux/slice/userSlice";
// import { BASE_URL } from "../../../utils/constants";

// const DetailRow = ({ icon: Icon, label, value }) => {
//   if (!value) return null;
//   return (
//     <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
//       <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
//         <Icon size={13} className="text-gray-500" strokeWidth={1.75} />
//       </div>
//       <div className="min-w-0">
//         <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest leading-none mb-0.5">
//           {label}
//         </p>
//         <p className="text-sm font-semibold text-gray-900 break-words">{value}</p>
//       </div>
//     </div>
//   );
// };

// export default function CompanyGSTSection({ user }) {
//   const dispatch = useDispatch();
//   const [gstInput,     setGstInput]     = useState("");
//   const [verifying,    setVerifying]    = useState(false);
//   const [gstData,      setGstData]      = useState(null);   
//   const [isVerified,   setIsVerified]   = useState(false);
//   const [gstNumber,    setGstNumber]    = useState("");

//   useEffect(() => {
//     if (user?.gstVerified && user?.gstDetails) {
//       setIsVerified(true);
//       setGstData(user.gstDetails);
//       setGstNumber(user.gstNumber || "");
//       setGstInput(user.gstNumber || "");
//     }
//   }, [user]);

//   const handleVerify = async () => {
//     const trimmed = gstInput.trim().toUpperCase();

//     if (!trimmed) {
//       toast.error("Please enter a GST number");
//       return;
//     }
//     if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/.test(trimmed)) {
//       toast.error("Invalid GSTIN format");
//       return;
//     }

//     setVerifying(true);
//     try {
//       const res = await fetch(`${BASE_URL}/inspectionCompany/kyc/verify-gst`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ gstNumber: trimmed }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Verification failed");

//       const details = data.data.gstDetails;
//       setGstData(details);
//       setGstNumber(trimmed);
//       setIsVerified(true);

//       dispatch(
//         addUser({
//           ...user,
//           gstNumber: trimmed,
//           gstVerified: true,
//           gstDetails: details,
//         })
//       );

//       toast.success("GST verified and saved successfully");
//     } catch (err) {
//       toast.error(err.message || "GST verification failed");
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handleReVerify = () => {
//     setIsVerified(false);
//     setGstData(null);
//     setGstNumber("");
//     setGstInput("");
//   };

//   return (
//     <div>
//       <div className="px-6 pt-5 pb-4 border-b border-gray-100">
//         <h2 className="text-sm font-bold text-gray-800">GST Details</h2>
//         <p className="text-xs text-gray-400 mt-0.5">
//           Verify your GSTIN to build trust with customers and unlock features
//         </p>
//       </div>

//       <div className="px-6 py-5 space-y-5">

//         {!isVerified && (
//           <>
//             <div className="space-y-1.5">
//               <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                 <Hash size={11} strokeWidth={2} />
//                 GST Number (GSTIN)
//               </label>

//               <div className="flex flex-col sm:flex-row gap-2">
//                 <input
//                   type="text"
//                   value={gstInput}
//                   onChange={(e) => setGstInput(e.target.value.toUpperCase())}
//                   onKeyDown={(e) => e.key === "Enter" && handleVerify()}
//                   placeholder="e.g. 12ABCDE3456F7GH"
//                   maxLength={15}
//                   className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 placeholder:font-sans placeholder:tracking-normal"
//                 />
//                 <button
//                   onClick={handleVerify}
//                   disabled={verifying || !gstInput.trim()}
//                   className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
//                 >
//                   {verifying
//                     ? <><Loader2 size={14} className="animate-spin" />Verifying…</>
//                     : <><Search size={14} />Verify GST</>}
//                 </button>
//               </div>

//               <p className="text-xs text-gray-400">
//                 Enter your 15-character GSTIN. Verified live via Sandbox.co.in against government records.
//               </p>
//             </div>

//             <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
//               <Info size={14} className="text-gray-400 shrink-0 mt-0.5" strokeWidth={1.75} />
//               <p className="text-xs text-gray-500 leading-relaxed">
//                 Only <strong>Active</strong> GSTINs are accepted. Your GSTIN will be securely
//                 saved upon successful verification. This helps customers verify your legitimacy.
//               </p>
//             </div>
//           </>
//         )}

//         {isVerified && (
//           <>
//             <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
//                   <CheckCircle2 size={18} className="text-gray-700" strokeWidth={1.75} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-gray-900">GSTIN Verified</p>
//                   <p className="text-xs font-mono text-gray-400 mt-0.5 tracking-widest">
//                     {gstNumber}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 flex-wrap">
//                 <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
//                   <ShieldCheck size={11} strokeWidth={2} />
//                   Active
//                 </span>
//                 <button
//                   onClick={handleReVerify}
//                   className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-2.5 py-1 rounded-full transition cursor-pointer"
//                 >
//                   <RefreshCw size={10} strokeWidth={2} />
//                   Re-verify
//                 </button>
//               </div>
//             </div>

//             {gstData && (
//               <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-1">
//                 <DetailRow icon={Building2} label="Legal Name"       value={gstData.legalName}        />
//                 <DetailRow icon={Building2} label="Trade Name"       value={gstData.tradeName}        />
//                 <DetailRow icon={FileText}  label="Business Type"    value={gstData.gstType}          />
//                 <DetailRow icon={MapPin}    label="State / Office"   value={gstData.state}            />
//                 <DetailRow icon={Calendar}  label="Registration Date" value={gstData.registrationDate} />
//                 {gstData.lastVerifiedAt && (
//                   <DetailRow
//                     icon={ShieldCheck}
//                     label="Last Verified"
//                     value={new Date(gstData.lastVerifiedAt).toLocaleDateString("en-IN", {
//                       day: "numeric", month: "long", year: "numeric",
//                     })}
//                   />
//                 )}
//               </div>
//             )}

//             <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
//               <AlertTriangle size={14} className="text-gray-400 shrink-0 mt-0.5" strokeWidth={1.75} />
//               <p className="text-xs text-gray-500 leading-relaxed">
//                 Your GSTIN is verified and saved. Use <strong>Re-verify</strong> only if you
//                 need to update with a different GSTIN. Changes will overwrite the current record.
//               </p>
//             </div>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }





import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Loader2,
  Search,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Hash,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Upload,
  ExternalLink,
  Globe,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/slice/userSlice";
import { BASE_URL } from "../../../utils/constants";

const DetailRow = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={13} className="text-gray-500" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 break-words">{value}</p>
      </div>
    </div>
  );
};

function buildFullAddress(addr) {
  if (!addr) return null;
  const parts = [
    addr.floor,
    addr.buildingNumber && addr.buildingName
      ? `${addr.buildingNumber}, ${addr.buildingName}`
      : addr.buildingNumber || addr.buildingName,
    addr.street,
    addr.locality,
    addr.location,
    addr.district,
    addr.state,
    addr.pincode,
  ].filter(Boolean);
  return parts.join(", ") || null;
}

function IndianGSTSection({ user, dispatch }) {
  const [gstInput, setGstInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [gstData, setGstData] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [gstNumber, setGstNumber] = useState("");

  useEffect(() => {
    if (user?.gstVerified && user?.gstDetails?.legalName) {
      setIsVerified(true);
      setGstData(user.gstDetails);
      setGstNumber(user.gstNumber || "");
      setGstInput(user.gstNumber || "");
    }
  }, [user]);

  const handleVerify = async () => {
    const trimmed = gstInput.trim().toUpperCase();
    if (!trimmed) {
      toast.error("Please enter a GST number");
      return;
    }
    if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/.test(trimmed)) {
      toast.error("Invalid GSTIN format (e.g. 29AAMCP9070G1ZV)");
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/kyc/verify-gst`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ gstNumber: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      const details = data.data.gstDetails;
      setGstData(details);
      setGstNumber(trimmed);
      setIsVerified(true);
      dispatch(addUser({ ...user, gstNumber: trimmed, gstVerified: true, gstDetails: details }));
      toast.success("GST verified and saved successfully");
    } catch (err) {
      toast.error(err.message || "GST verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleReVerify = () => {
    setIsVerified(false);
    setGstData(null);
    setGstNumber("");
    setGstInput("");
  };

  const fullAddress = gstData?.address ? buildFullAddress(gstData.address) : null;

  if (!isVerified) {
    return (
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <Hash size={11} strokeWidth={2} />
            GST Number (GSTIN)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={gstInput}
              onChange={(e) => setGstInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              placeholder="e.g. 29AAMCP9070G1ZV"
              maxLength={15}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono tracking-widest bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 placeholder:font-sans placeholder:tracking-normal"
            />
            <button
              onClick={handleVerify}
              disabled={verifying || !gstInput.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {verifying ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Verifying…
                </>
              ) : (
                <>
                  <Search size={14} />
                  Verify GST
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400">
            Enter your 15-character GSTIN. Verified live via Sandbox.co.in.
          </p>
        </div>
        <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <Info size={14} className="text-gray-400 shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-xs text-gray-500 leading-relaxed">
            Only <strong>Active</strong> GSTINs are accepted. Your GSTIN will be securely
            saved. GST verification is required before you can place bids.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} className="text-gray-700" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">GSTIN Verified</p>
            <p className="text-xs font-mono text-gray-400 mt-0.5 tracking-widest">
              {gstNumber}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
            <ShieldCheck size={11} strokeWidth={2} />
            Active
          </span>
          <button
            onClick={handleReVerify}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-2.5 py-1 rounded-full transition cursor-pointer"
          >
            <RefreshCw size={10} strokeWidth={2} />
            Re-verify
          </button>
        </div>
      </div>

      {gstData && (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-1">
          <DetailRow icon={Building2} label="Legal Name" value={gstData.legalName} />
          <DetailRow icon={Building2} label="Trade Name" value={gstData.tradeName} />
          <DetailRow icon={FileText} label="Business Type" value={gstData.gstType} />
          <DetailRow icon={MapPin} label="State / Jurisdiction" value={gstData.state} />
          {fullAddress && <DetailRow icon={MapPin} label="Registered Address" value={fullAddress} />}
          {!fullAddress && gstData.address?.state && (
            <DetailRow icon={MapPin} label="State" value={gstData.address.state} />
          )}
          {gstData.address?.pincode && (
            <DetailRow icon={Hash} label="PIN Code" value={gstData.address.pincode} />
          )}
          <DetailRow icon={Calendar} label="Registration Date" value={gstData.registrationDate} />
          {gstData.lastVerifiedAt && (
            <DetailRow
              icon={ShieldCheck}
              label="Last Verified"
              value={new Date(gstData.lastVerifiedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          )}
        </div>
      )}

      <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <AlertTriangle size={14} className="text-gray-400 shrink-0 mt-0.5" strokeWidth={1.75} />
        <p className="text-xs text-gray-500 leading-relaxed">
          Your GSTIN is verified. Use <strong>Re-verify</strong> only if you need to update
          with a different GSTIN.
        </p>
      </div>
    </div>
  );
}

function InternationalDocSection({ user, dispatch }) {
  const [uploading, setUploading] = useState(false);
  const [docData, setDocData] = useState(null);
  const [hasDoc, setHasDoc] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (user?.legalDocument?.url) {
      setHasDoc(true);
      setDocData(user.legalDocument);
    }
  }, [user]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, JPG, or PNG files are allowed.");
      e.target.value = null;
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Maximum size is 10MB.");
      e.target.value = null;
      return;
    }

    const formData = new FormData();
    formData.append("legalDocument", file);

    setUploading(true);
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/kyc/upload-legal-document`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      const doc = data.data.legalDocument;
      setDocData(doc);
      setHasDoc(true);
      dispatch(addUser({ ...user, legalDocument: doc }));
      toast.success("Legal document uploaded successfully");
    } catch (err) {
      toast.error(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = null;
    }
  };

  const handleReUpload = () => {
    setHasDoc(false);
    setDocData(null);
    setTimeout(() => fileRef.current?.click(), 100);
  };

  if (!hasDoc) {
    return (
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <FileText size={11} strokeWidth={2} />
            Legal Company Document
          </label>
          <p className="text-xs text-gray-400">
            Upload an Import/Export Certificate, Company Registration Certificate, Trade
            License, or any official legal company document.
          </p>

          <div
            onClick={() => !uploading && fileRef.current?.click()}
            className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition ${
              uploading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? (
              <>
                <Loader2 size={24} className="text-gray-400 animate-spin mb-2" />
                <p className="text-sm font-semibold text-gray-600">Uploading…</p>
                <p className="text-xs text-gray-400 mt-1">Please wait</p>
              </>
            ) : (
              <>
                <Upload size={24} className="text-gray-400 mb-2" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-gray-700">Click to upload document</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG — max 10MB</p>
              </>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <Info size={14} className="text-gray-400 shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-xs text-gray-500 leading-relaxed">
            For international companies, upload a valid legal company document to verify
            your identity. This is required before placing bids. Accepted formats: PDF, JPG, PNG.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} className="text-gray-700" strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Document Uploaded</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">
              {docData?.originalName || "Legal Document"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
            <Globe size={11} strokeWidth={2} />
            International
          </span>
          <button
            onClick={handleReUpload}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 px-2.5 py-1 rounded-full transition cursor-pointer"
          >
            <RotateCcw size={10} strokeWidth={2} />
            Replace
          </button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-1">
        <DetailRow
          icon={FileText}
          label="Document Name"
          value={docData?.originalName || "Legal Document"}
        />
        {docData?.uploadedAt && (
          <DetailRow
            icon={Calendar}
            label="Uploaded On"
            value={new Date(docData.uploadedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        )}
        {docData?.url && (
          <div className="flex items-start gap-3 py-3">
            <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <ExternalLink size={13} className="text-gray-500" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest leading-none mb-0.5">
                View Document
              </p>
              <a
                href={docData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-900 hover:underline"
              >
                Open uploaded document ↗
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <AlertTriangle size={14} className="text-gray-400 shrink-0 mt-0.5" strokeWidth={1.75} />
        <p className="text-xs text-gray-500 leading-relaxed">
          Your legal document is on file. Use <strong>Replace</strong> to update with a newer
          document. You can now place bids on inspection requests.
        </p>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default function CompanyGSTSection({ user }) {
  const dispatch = useDispatch();
  const isIndian = user?.countryCode === "+91" || !user?.countryCode;

  return (
    <div>
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800">
          {isIndian ? "GST Details" : "Legal Document Verification"}
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          {isIndian
            ? "Verify your GSTIN to build trust with customers and start placing bids"
            : "Upload a legal company document to verify your identity and start placing bids"}
        </p>
      </div>

      <div className="px-6 py-5">
        {isIndian ? (
          <IndianGSTSection user={user} dispatch={dispatch} />
        ) : (
          <InternationalDocSection user={user} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
}