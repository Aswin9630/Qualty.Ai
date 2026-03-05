import { useState } from "react";
import { Loader2, Check, X, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { addUser } from "../../../redux/slice/userSlice";


const FIELDS = [
  { key: "companyName",  label: "Company Name",  editable: true,  type: "text" },
  { key: "mobileNumber", label: "Mobile Number", editable: true,  type: "tel"  },
  { key: "companyEmail", label: "Email",          editable: false              },
  {
    key: "createdAt",
    label: "Member Since",
    editable: false,
    format: (v) =>
      v
        ? new Date(v).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric",
          })
        : "—",
  },
];

export default function CompanyProfileSection({ user }) {
  const dispatch = useDispatch();
  const [editing, setEditing]   = useState(null); 
  const [inputVal, setInputVal] = useState("");
  const [saving, setSaving]     = useState(false);

  const startEdit = (field) => {
    setEditing(field.key);
    setInputVal(user[field.key] || "");
  };

  const cancelEdit = () => {
    setEditing(null);
    setInputVal("");
  };

  const saveEdit = async (fieldKey) => {
    const trimmed = inputVal.trim();

    if (!trimmed) {
      toast.error("This field cannot be empty");
      return;
    }
    if (
      fieldKey === "mobileNumber" &&
      !/^\d{6,15}$/.test(trimmed)
    ) {
      toast.error("Enter a valid mobile number (digits only, 6–15 chars)");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${BASE_URL}/inspectionCompany/profile/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ [fieldKey]: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      dispatch(addUser({ ...user, ...data.company }));
      toast.success("Saved successfully");
      setEditing(null);
    } catch (err) {
      toast.error(err.message || "Could not save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800">Your Account Details</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {FIELDS.map((field) => {
          const isEditing = editing === field.key;
          const displayVal = field.format
            ? field.format(user[field.key])
            : user[field.key] || "—";

          return (
            <div
              key={field.key}
              className="flex items-start justify-between gap-4 px-6 py-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400 mb-0.5">{field.label}</p>

                {isEditing ? (
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <input
                      autoFocus
                      type={field.type || "text"}
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")  saveEdit(field.key);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 w-full max-w-xs"
                    />
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => saveEdit(field.key)}
                        disabled={saving}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-700 disabled:opacity-50 px-3 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        {saving
                          ? <Loader2 size={12} className="animate-spin" />
                          : <Check size={12} />}
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={saving}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 px-3 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        <X size={12} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-gray-900 break-all">
                    {displayVal}
                  </p>
                )}
              </div>

              {field.editable && !isEditing && (
                <button
                  onClick={() => startEdit(field)}
                  className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer mt-0.5 transition"
                >
                  Edit
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}