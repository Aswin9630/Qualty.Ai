import React, { useEffect, useState } from "react";

const DEFAULT_PHYSICAL = [
  { key: "weight_mass", label: "Weight / Mass", description: "Verifies declared net & gross weight." },
  { key: "dimensions_size", label: "Dimensions / Size", description: "Checks conformity with specification or packaging norms." },
  { key: "appearance_color", label: "Appearance / Color", description: "Visual inspection for uniformity and defects." },
  { key: "odor_smell", label: "Odor / Smell", description: "Determines contamination or spoilage." },
  { key: "texture_feel", label: "Texture / Feel", description: "Indicates product consistency or processing quality." },
  { key: "density_sg", label: "Density / Specific Gravity", description: "Used to assess purity and grade." },
  { key: "moisture", label: "Moisture Content", description: "Affects shelf life, weight, and stability." },
  { key: "temp_stability", label: "Temperature Stability", description: "Checks resistance to heat/cold during transit." },
  { key: "purity_impurities", label: "Purity / Impurities", description: "Measures presence of unwanted material." },
  { key: "packaging_integrity", label: "Packaging Integrity", description: "Ensures packing meets transport and export norms." },
];

const DEFAULT_CHEMICAL = [
  { key: "ph", label: "pH Value", description: "Measures acidity or alkalinity." },
  { key: "moisture", label: "Moisture Content", description: "Determines water content affecting shelf life and stability." },
  { key: "ash", label: "Ash Content", description: "Shows inorganic impurities or mineral content." },
  { key: "volatile", label: "Volatile Matter", description: "Checks for easily evaporating substances." },
  { key: "purity_assay", label: "Purity / Assay (%)", description: "Confirms concentration of active substance." },
  { key: "composition", label: "Chemical Composition", description: "Determines presence of specific elements." },
  { key: "contaminants", label: "Contaminants / Impurities", description: "Checks for heavy metals, toxins, or residues." },
  { key: "tds", label: "Total Dissolved Solids (TDS)", description: "Indicates dissolved impurities." },
  { key: "conductivity", label: "Conductivity", description: "Measures ionic content." },
  { key: "orp", label: "Oxidation/Reduction Potential (ORP)", description: "Chemical reactivity or stability." },
  { key: "residue", label: "Residue on Ignition / Evaporation", description: "Detects non-volatile impurities." },
];

export default function InspectionParametersModal({
  open,
  onClose,
  type = "physical",
  initialSelected = [],
  initialNotes = {},
  initialExtra = [],
  onSave,
}) {
  const [params, setParams] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [notesByKey, setNotesByKey] = useState({});
  const [extraReqs, setExtraReqs] = useState([]);
  const [newReqText, setNewReqText] = useState("");

  useEffect(() => {
    setParams(type === "chemical" ? DEFAULT_CHEMICAL : DEFAULT_PHYSICAL);
  }, [type]);

  useEffect(() => {
    setSelectedKeys(new Set(initialSelected || []));
    setNotesByKey(initialNotes || {});
    setExtraReqs(initialExtra || []);
  }, [initialSelected, initialNotes, initialExtra, open]);

  useEffect(() => {
    if (!open) setNewReqText("");
  }, [open]);

  if (!open) return null;

  const toggleKey = (key) => {
    const s = new Set(selectedKeys);
    if (s.has(key)) s.delete(key);
    else s.add(key);
    setSelectedKeys(s);
  };

  const setNote = (key, value) => setNotesByKey((p) => ({ ...p, [key]: value }));

  const addExtraReq = () => {
    const t = newReqText.trim();
    if (!t) return;
    setExtraReqs((p) => [...p, t]);
    setNewReqText("");
  };

  const removeExtra = (i) => setExtraReqs((p) => p.filter((_, idx) => idx !== i));

  const handleSave = () => {
    const selected = params
      .filter((p) => selectedKeys.has(p.key))
      .map((p) => ({ ...p, notes: (notesByKey[p.key] || "").trim() }));
    onSave && onSave(selected, extraReqs);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-auto max-h-[86vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            {type === "chemical" ? "Chemical Inspection Parameters" : "Physical Inspection Parameters"}
          </h3>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200 cursor-pointer">Close</button>
            <button onClick={handleSave} className="px-3 py-1 rounded bg-black text-white cursor-pointer">Save</button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <div className="text-sm text-gray-600 mb-3">Select applicable general parameters and add per-parameter notes (optional).</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {params.map((p) => {
                const checked = selectedKeys.has(p.key);
                return (
                  <div key={p.key} className="border rounded p-3 flex flex-col gap-2">
                    <label className="flex items-start gap-3">
                      <input type="checkbox" checked={checked} onChange={() => toggleKey(p.key)} className="mt-1" />
                      <div>
                        <div className="font-medium">{p.label}</div>
                        <div className="text-sm text-gray-500">{p.description}</div>
                      </div>
                    </label>

                    {checked && (
                      <textarea
                        placeholder="Add notes, limits or specifics for this parameter (optional)"
                        value={notesByKey[p.key] || ""}
                        onChange={(e) => setNote(p.key, e.target.value)}
                        className="mt-2 p-2 border rounded w-full min-h-[72px] resize-none"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-3">
              <div>
                <div className="font-semibold">Additional Customer Requirements</div>
                <div className="text-sm text-gray-500">Add any extra checks or requirements the customer needs</div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <input
                  value={newReqText}
                  onChange={(e) => setNewReqText(e.target.value)}
                  placeholder="New requirement"
                  className="p-2 border rounded flex-1 md:flex-initial w-full"
                />
                <button onClick={addExtraReq} className="px-3 py-1 rounded bg-blue-600 text-white cursor-pointer">Add</button>
              </div>
            </div>

            <div className="space-y-2">
              {extraReqs.length === 0 && <div className="text-sm text-gray-500">No additional requirements added</div>}
              {extraReqs.map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-2 border rounded">
                  <div className="text-sm break-words">{r}</div>
                  <div>
                    <button onClick={() => removeExtra(i)} className="text-sm text-red-600 cursor-pointer">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
