// import { useState, useEffect } from "react";
// import {
//   Building2, CreditCard, Globe2, MapPin, AlertTriangle,
//   CheckCircle2, Loader2, ShieldCheck, RefreshCw, Eye, EyeOff
// } from "lucide-react";
// import { toast } from "react-toastify";
// import { BASE_URL } from "../../../../../utils/constants";
 
// const ACCOUNT_TYPES = [ 
//   { value: "savings", label: "Savings" },
//   { value: "current", label: "Current" },
//   { value: "nro", label: "NRO (Non-Resident Ordinary)" },
//   { value: "nre", label: "NRE (Non-Resident External)" },
//   { value: "other", label: "Other" }
// ];

// const CURRENCIES = ["USD", "EUR", "GBP", "AED", "SGD", "AUD", "CAD", "JPY", "CNY", "OTHER"];

// const Field = ({ label, icon: Icon, required, error, hint, children }) => (
//   <div className="space-y-1.5">
//     <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
//       {Icon && <Icon size={13} className="text-gray-400" />}
//       {label}
//       {required && <span className="text-red-500">*</span>}
//     </label>
//     {children}
//     {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
//     {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
//   </div>
// );

// export default function CompanyBankDetailsForm() {
//   const [isIndian, setIsIndian] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saved, setSaved] = useState(false);
//   const [showAccountNum, setShowAccountNum] = useState(false);
//   const [showConfirmNum, setShowConfirmNum] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [form, setForm] = useState({
//     accountHolderName: "",
//     accountNumber: "",
//     confirmAccountNumber: "",
//     bankName: "",
//     branchName: "",
//     accountType: "",
//     ifscCode: "",
//     swiftCode: "",
//     ibanNumber: "",
//     bankCountry: "",
//     bankCurrency: ""
//   });

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/inspectionCompany/bank-details`, { credentials: "include" });
//         const data = await res.json();
//         if (data.success && data.data?.accountHolderName) {
//           const d = data.data;
//           setIsIndian(d.isIndian ?? true);
//           setForm({
//             accountHolderName: d.accountHolderName || "",
//             accountNumber: d.accountNumber || "",
//             confirmAccountNumber: d.confirmAccountNumber || "",
//             bankName: d.bankName || "",
//             branchName: d.branchName || "",
//             accountType: d.accountType || "",
//             ifscCode: d.ifscCode || "",
//             swiftCode: d.swiftCode || "",
//             ibanNumber: d.ibanNumber || "",
//             bankCountry: d.bankCountry || "",
//             bankCurrency: d.bankCurrency || ""
//           });
//           setSaved(true);
//         }
//       } catch (_) {}
//       finally { setLoading(false); }
//     })();
//   }, []);

//   const validate = () => {
//     const e = {};
//     if (!form.accountHolderName.trim()) e.accountHolderName = "Account holder name is required";
//     if (!form.accountNumber.trim()) e.accountNumber = "Account number is required";
//     if (!form.confirmAccountNumber.trim()) e.confirmAccountNumber = "Please confirm your account number";
//     if (form.accountNumber && form.confirmAccountNumber && form.accountNumber !== form.confirmAccountNumber) {
//       e.confirmAccountNumber = "Account numbers do not match";
//     }
//     if (!form.bankName.trim()) e.bankName = "Bank name is required";
//     if (isIndian && !form.ifscCode.trim()) e.ifscCode = "IFSC code is required";
//     if (isIndian && form.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase())) {
//       e.ifscCode = "Invalid IFSC code format (e.g. SBIN0001234)";
//     }
//     if (!isIndian && !form.swiftCode.trim()) e.swiftCode = "SWIFT/BIC code is required";
//     if (!isIndian && !form.bankCountry.trim()) e.bankCountry = "Bank country is required";
//     if (!isIndian && !form.bankCurrency) e.bankCurrency = "Currency is required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const set = (field, value) => {
//     setForm((p) => ({ ...p, [field]: value }));
//     if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) { toast.error("Please fix the errors before saving"); return; }
//     setSaving(true);
//     try {
//       const res = await fetch(`${BASE_URL}/inspectionCompany/bank-details`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ ...form, isIndian, ifscCode: isIndian ? form.ifscCode.toUpperCase() : "" })
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       toast.success("Bank details saved successfully");
//       setSaved(true);
//     } catch (err) {
//       toast.error(err.message || "Failed to save bank details");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-8 flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-6">
//       <div className="flex items-start justify-between flex-wrap gap-4">
//         <div>
//           <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//             <CreditCard size={20} className="text-gray-700" />
//             Bank Account Details
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Add your bank account to receive inspection earnings from Qualty.ai
//           </p>
//         </div>
//         {saved && (
//           <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
//             <ShieldCheck size={15} />
//             Details Saved
//           </div>
//         )}
//       </div>

//       <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
//         <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
//         <div>
//           <p className="text-sm font-bold text-amber-800">Important — Please double-check all details</p>
//           <p className="text-xs text-amber-700 mt-1">
//             Incorrect bank details can result in failed or delayed payouts. Verify your account number, IFSC/SWIFT code twice before saving. Qualty.ai is not responsible for payments sent to incorrect bank details.
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 p-1 bg-gray-100 rounded-xl w-fit">
//         <button
//           type="button"
//           onClick={() => { setIsIndian(true); setErrors({}); }}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
//             isIndian ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
//           }`}
//         >
//           <MapPin size={14} />
//           Indian Bank
//         </button>
//         <button
//           type="button"
//           onClick={() => { setIsIndian(false); setErrors({}); }}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
//             !isIndian ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
//           }`}
//         >
//           <Globe2 size={14} />
//           International Bank
//         </button>
//       </div>

//       <div className="grid md:grid-cols-2 gap-5">
//         <div className="md:col-span-2">
//           <Field label="Account Holder Name" icon={Building2} required error={errors.accountHolderName}>
//             <input
//               value={form.accountHolderName}
//               onChange={(e) => set("accountHolderName", e.target.value)}
//               placeholder="As it appears on your bank account"
//               className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.accountHolderName ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//             />
//           </Field>
//         </div>

//         <Field label="Account Number" icon={CreditCard} required error={errors.accountNumber}
//           hint="Enter your complete bank account number">
//           <div className="relative">
//             <input
//               type={showAccountNum ? "text" : "password"}
//               value={form.accountNumber}
//               onChange={(e) => set("accountNumber", e.target.value)}
//               placeholder="Your bank account number"
//               className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.accountNumber ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//             />
//             <button type="button" onClick={() => setShowAccountNum(!showAccountNum)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer">
//               {showAccountNum ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           </div>
//         </Field>

//         <Field label="Confirm Account Number" icon={CreditCard} required error={errors.confirmAccountNumber}
//           hint="Re-enter to confirm — must match exactly">
//           <div className="relative">
//             <input
//               type={showConfirmNum ? "text" : "password"}
//               value={form.confirmAccountNumber}
//               onChange={(e) => set("confirmAccountNumber", e.target.value)}
//               placeholder="Re-enter account number"
//               className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.confirmAccountNumber ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//             />
//             <button type="button" onClick={() => setShowConfirmNum(!showConfirmNum)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer">
//               {showConfirmNum ? <EyeOff size={16} /> : <Eye size={16} />}
//             </button>
//           </div>
//         </Field>

//         <Field label="Bank Name" icon={Building2} required error={errors.bankName}>
//           <input
//             value={form.bankName}
//             onChange={(e) => set("bankName", e.target.value)}
//             placeholder="e.g. State Bank of India"
//             className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.bankName ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//           />
//         </Field>

//         <Field label="Branch Name" error={errors.branchName}>
//           <input
//             value={form.branchName}
//             onChange={(e) => set("branchName", e.target.value)}
//             placeholder="e.g. Mumbai – Fort Branch"
//             className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
//           />
//         </Field>

//         <Field label="Account Type">
//           <select
//             value={form.accountType}
//             onChange={(e) => set("accountType", e.target.value)}
//             className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
//           >
//             <option value="">Select account type</option>
//             {ACCOUNT_TYPES.map((t) => (
//               <option key={t.value} value={t.value}>{t.label}</option>
//             ))}
//           </select>
//         </Field>

//         {isIndian ? (
//           <Field label="IFSC Code" required error={errors.ifscCode}
//             hint="11-character code printed on your cheque book (e.g. SBIN0001234)">
//             <input
//               value={form.ifscCode}
//               onChange={(e) => set("ifscCode", e.target.value.toUpperCase())}
//               placeholder="e.g. SBIN0001234"
//               maxLength={11}
//               className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.ifscCode ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//             />
//           </Field>
//         ) : (
//           <>
//             <Field label="SWIFT / BIC Code" required error={errors.swiftCode}
//               hint="8 or 11 character international bank identifier">
//               <input
//                 value={form.swiftCode}
//                 onChange={(e) => set("swiftCode", e.target.value.toUpperCase())}
//                 placeholder="e.g. BOFAUS3NXXX"
//                 className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.swiftCode ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//               />
//             </Field>

//             <Field label="IBAN Number" error={errors.ibanNumber}
//               hint="International Bank Account Number (if applicable)">
//               <input
//                 value={form.ibanNumber}
//                 onChange={(e) => set("ibanNumber", e.target.value.toUpperCase())}
//                 placeholder="e.g. GB29NWBK60161331926819"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-black/10 transition"
//               />
//             </Field>

//             <Field label="Bank Country" required error={errors.bankCountry}>
//               <input
//                 value={form.bankCountry}
//                 onChange={(e) => set("bankCountry", e.target.value)}
//                 placeholder="e.g. United States"
//                 className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.bankCountry ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//               />
//             </Field>

//             <Field label="Payout Currency" required error={errors.bankCurrency}>
//               <select
//                 value={form.bankCurrency}
//                 onChange={(e) => set("bankCurrency", e.target.value)}
//                 className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${errors.bankCurrency ? "border-red-300 bg-red-50" : "border-gray-200"}`}
//               >
//                 <option value="">Select currency</option>
//                 {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
//               </select>
//             </Field>
//           </>
//         )}
//       </div>

//       <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
//         <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
//         <p className="text-xs text-blue-800">
//           Your bank details are encrypted and stored securely. They are only used for payout processing after completed inspections.
//           Payouts are processed <strong>within 24 hours</strong> after inspection completion and verification by Qualty.ai.
//         </p>
//       </div>

//       <div className="flex items-center gap-3 pt-2">
//         <button
//           type="submit"
//           disabled={saving}
//           className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
//         >
//           {saving ? (
//             <><Loader2 size={15} className="animate-spin" /> Saving...</>
//           ) : saved ? (
//             <><RefreshCw size={15} /> Update Details</>
//           ) : (
//             <><CheckCircle2 size={15} /> Save Bank Details</>
//           )}
//         </button>
//         {saved && (
//           <p className="text-sm text-green-700 font-semibold flex items-center gap-1.5">
//             <CheckCircle2 size={14} />
//             Bank details saved
//           </p>
//         )}
//       </div>
//     </form>
//   );
// }












import { useState, useEffect } from "react";
import {
  Building2, CreditCard, Globe2, MapPin, AlertTriangle,
  CheckCircle2, Loader2, ShieldCheck, RefreshCw, Eye, EyeOff, Pencil, X
} from "lucide-react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../../utils/constants";

const ACCOUNT_TYPES = [
  { value: "savings", label: "Savings" },
  { value: "current", label: "Current" },
  { value: "nro", label: "NRO (Non-Resident Ordinary)" },
  { value: "nre", label: "NRE (Non-Resident External)" },
  { value: "other", label: "Other" }
];

const CURRENCIES = ["USD", "EUR", "GBP", "AED", "SGD", "AUD", "CAD", "JPY", "CNY", "OTHER"];

const EMPTY_FORM = {
  accountHolderName: "",
  accountNumber: "",
  confirmAccountNumber: "",
  bankName: "",
  branchName: "",
  accountType: "",
  ifscCode: "",
  swiftCode: "",
  ibanNumber: "",
  bankCountry: "",
  bankCurrency: ""
};

const Field = ({ label, icon: Icon, required, error, hint, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
      {Icon && <Icon size={13} className="text-gray-400" />}
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const InfoRow = ({ label, value, mono = false }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
    <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">{label}</p>
    <p className={`text-sm font-semibold text-gray-900 break-all ${mono ? "font-mono" : ""}`}>
      {value || "—"}
    </p>
  </div>
);

const SavedView = ({ details, onEdit }) => {
  const masked = details.accountNumber
    ? "•".repeat(Math.max(0, details.accountNumber.length - 4)) + details.accountNumber.slice(-4)
    : "—";

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CreditCard size={20} className="text-gray-700" />
            Bank Account Details
          </h2>
          <p className="text-sm text-gray-500 mt-1">Your saved payout bank account</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
            <ShieldCheck size={14} />
            Saved
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            <Pencil size={13} />
            Edit Details
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
            details.isIndian
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-purple-50 text-purple-700 border-purple-200"
          }`}
        >
          {details.isIndian ? <MapPin size={11} /> : <Globe2 size={11} />}
          {details.isIndian ? "Indian Bank Account" : "International Bank Account"}
        </span>
        {details.updatedAt && (
          <span className="text-xs text-gray-400">
            Updated {new Date(details.updatedAt).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric"
            })}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InfoRow label="Account Holder" value={details.accountHolderName} />
        <InfoRow label="Account Number" value={masked} mono />
        <InfoRow label="Bank Name" value={details.bankName} />
        <InfoRow label="Branch" value={details.branchName} />
        <InfoRow label="Account Type" value={details.accountType} />
        {details.isIndian
          ? <InfoRow label="IFSC Code" value={details.ifscCode} mono />
          : <InfoRow label="SWIFT / BIC" value={details.swiftCode} mono />
        }
        {!details.isIndian && details.ibanNumber && (
          <InfoRow label="IBAN" value={details.ibanNumber} mono />
        )}
        {!details.isIndian && <InfoRow label="Bank Country" value={details.bankCountry} />}
        {!details.isIndian && <InfoRow label="Currency" value={details.bankCurrency} />}
      </div>

      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
        <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Your bank details are stored securely and used only for payout processing.
          Payouts are processed within <strong>24 hours</strong> after inspection completion
          and verification by Qualty.ai.
        </p>
      </div>
    </div>
  );
};

export default function CompanyBankDetailsForm() {
  const [isIndian, setIsIndian] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedData, setSavedData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showAccountNum, setShowAccountNum] = useState(false);
  const [showConfirmNum, setShowConfirmNum] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspectionCompany/bank-details`, { credentials: "include" });
        const data = await res.json();
        if (data.success && data.data?.accountHolderName) {
          const d = data.data;
          setSavedData(d);
          setIsIndian(d.isIndian ?? true);
          setForm({
            accountHolderName: d.accountHolderName || "",
            accountNumber: d.accountNumber || "",
            confirmAccountNumber: d.confirmAccountNumber || "",
            bankName: d.bankName || "",
            branchName: d.branchName || "",
            accountType: d.accountType || "",
            ifscCode: d.ifscCode || "",
            swiftCode: d.swiftCode || "",
            ibanNumber: d.ibanNumber || "",
            bankCountry: d.bankCountry || "",
            bankCurrency: d.bankCurrency || ""
          });
        }
      } catch (_) {}
      finally { setLoading(false); }
    })();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.accountHolderName.trim()) e.accountHolderName = "Required";
    if (!form.accountNumber.trim()) e.accountNumber = "Required";
    if (!form.confirmAccountNumber.trim()) e.confirmAccountNumber = "Required";
    if (
      form.accountNumber &&
      form.confirmAccountNumber &&
      form.accountNumber !== form.confirmAccountNumber
    ) {
      e.confirmAccountNumber = "Account numbers do not match";
    }
    if (!form.bankName.trim()) e.bankName = "Required";
    if (isIndian && !form.ifscCode.trim()) e.ifscCode = "IFSC code is required";
    if (isIndian && form.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode.toUpperCase())) {
      e.ifscCode = "Invalid IFSC format (e.g. SBIN0001234)";
    }
    if (!isIndian && !form.swiftCode.trim()) e.swiftCode = "SWIFT/BIC code is required";
    if (!isIndian && !form.bankCountry.trim()) e.bankCountry = "Required";
    if (!isIndian && !form.bankCurrency) e.bankCurrency = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (field, val) => {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { toast.error("Please fix errors before saving"); return; }
    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/bank-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          isIndian,
          ifscCode: isIndian ? form.ifscCode.toUpperCase() : ""
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Bank details saved successfully");
      setSavedData(data.data);
      setEditMode(false);
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (savedData && !editMode) {
    return <SavedView details={savedData} onEdit={() => setEditMode(true)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <CreditCard size={20} className="text-gray-700" />
            {editMode ? "Edit Bank Details" : "Bank Account Details"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {editMode
              ? "Update your bank account for payout"
              : "Add your bank account to receive inspection earnings from Qualty.ai"}
          </p>
        </div>
        {editMode && (
          <button
            type="button"
            onClick={() => { setEditMode(false); setErrors({}); }}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            <X size={13} />
            Cancel
          </button>
        )}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800">Please double-check all details before saving</p>
          <p className="text-xs text-amber-700 mt-1">
            Incorrect bank details can cause failed or delayed payouts. Verify your account number
            and IFSC/SWIFT code twice. Qualty.ai is not responsible for payments sent to incorrect bank details.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          type="button"
          onClick={() => { setIsIndian(true); setErrors({}); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
            isIndian ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <MapPin size={13} />
          Indian Bank
        </button>
        <button
          type="button"
          onClick={() => { setIsIndian(false); setErrors({}); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
            !isIndian ? "bg-black text-white shadow-sm" : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Globe2 size={13} />
          International Bank
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <Field label="Account Holder Name" icon={Building2} required error={errors.accountHolderName}>
            <input
              value={form.accountHolderName}
              onChange={(e) => set("accountHolderName", e.target.value)}
              placeholder="As it appears on your bank account"
              className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
                errors.accountHolderName ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            />
          </Field>
        </div>

        <Field
          label="Account Number"
          icon={CreditCard}
          required
          error={errors.accountNumber}
          hint="Enter your complete bank account number"
        >
          <div className="relative">
            <input
              type={showAccountNum ? "text" : "password"}
              value={form.accountNumber}
              onChange={(e) => set("accountNumber", e.target.value)}
              placeholder="Your bank account number"
              className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
                errors.accountNumber ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowAccountNum(!showAccountNum)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              {showAccountNum ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <Field
          label="Confirm Account Number"
          icon={CreditCard}
          required
          error={errors.confirmAccountNumber}
          hint="Re-enter to confirm — must match exactly"
        >
          <div className="relative">
            <input
              type={showConfirmNum ? "text" : "password"}
              value={form.confirmAccountNumber}
              onChange={(e) => set("confirmAccountNumber", e.target.value)}
              placeholder="Re-enter account number"
              className={`w-full border rounded-xl px-4 py-3 pr-11 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
                errors.confirmAccountNumber ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmNum(!showConfirmNum)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              {showConfirmNum ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <Field label="Bank Name" icon={Building2} required error={errors.bankName}>
          <input
            value={form.bankName}
            onChange={(e) => set("bankName", e.target.value)}
            placeholder="e.g. State Bank of India"
            className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
              errors.bankName ? "border-red-300 bg-red-50" : "border-gray-200"
            }`}
          />
        </Field>

        <Field label="Branch Name">
          <input
            value={form.branchName}
            onChange={(e) => set("branchName", e.target.value)}
            placeholder="e.g. Mumbai Fort Branch"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
          />
        </Field>

        <Field label="Account Type">
          <select
            value={form.accountType}
            onChange={(e) => set("accountType", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition"
          >
            <option value="">Select account type</option>
            {ACCOUNT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>

        {isIndian ? (
          <Field
            label="IFSC Code"
            required
            error={errors.ifscCode}
            hint="11-character code printed on your cheque book (e.g. SBIN0001234)"
          >
            <input
              value={form.ifscCode}
              onChange={(e) => set("ifscCode", e.target.value.toUpperCase())}
              placeholder="e.g. SBIN0001234"
              maxLength={11}
              className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
                errors.ifscCode ? "border-red-300 bg-red-50" : "border-gray-200"
              }`}
            />
          </Field>
        ) : (
          <>
            <Field
              label="SWIFT / BIC Code"
              required
              error={errors.swiftCode}
              hint="8 or 11 character international bank identifier"
            >
              <input
                value={form.swiftCode}
                onChange={(e) => set("swiftCode", e.target.value.toUpperCase())}
                placeholder="e.g. BOFAUS3NXXX"
                className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
                  errors.swiftCode ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />
            </Field>
            <Field label="IBAN Number" hint="International Bank Account Number (if applicable)">
              <input
                value={form.ibanNumber}
                onChange={(e) => set("ibanNumber", e.target.value.toUpperCase())}
                placeholder="e.g. GB29NWBK60161331926819"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 font-mono uppercase focus:outline-none focus:ring-2 focus:ring-black/10 transition"
              />
            </Field>
            <Field label="Bank Country" required error={errors.bankCountry}>
              <input
                value={form.bankCountry}
                onChange={(e) => set("bankCountry", e.target.value)}
                placeholder="e.g. United States"
                className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
                  errors.bankCountry ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />
            </Field>
            <Field label="Payout Currency" required error={errors.bankCurrency}>
              <select
                value={form.bankCurrency}
                onChange={(e) => set("bankCurrency", e.target.value)}
                className={`w-full border rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${
                  errors.bankCurrency ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              >
                <option value="">Select currency</option>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
          </>
        )}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
        <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800">
          Your bank details are encrypted and stored securely. They are only used for payout
          processing after completed inspections. Payouts are processed{" "}
          <strong>within 24 hours</strong> after inspection completion and verification by Qualty.ai.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition cursor-pointer"
        >
          {saving ? (
            <><Loader2 size={15} className="animate-spin" />Saving...</>
          ) : editMode ? (
            <><RefreshCw size={15} />Update Details</>
          ) : (
            <><CheckCircle2 size={15} />Save Bank Details</>
          )}
        </button>
      </div>
    </form>
  );
}