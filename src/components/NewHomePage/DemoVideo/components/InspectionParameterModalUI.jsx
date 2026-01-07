import React from "react";

export default function InspectionParametersModalUI() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-auto max-h-[86vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Physical Inspection Parameters</h3>
          <button className="px-3 py-1 rounded bg-gray-200 cursor-pointer">Close</button>
        </div>
        <div className="p-4 space-y-6">
          <div>
            <div className="text-sm text-gray-600 mb-3">
              Select applicable general parameters and add per-parameter notes (optional).
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              <div>
                <label className="flex items-start gap-3 mb-2">
                  <input type="checkbox" className="mr-2 accent-blue-500" />
                  <div>
                    <div className="font-medium">Weight / Mass</div>
                    <div className="text-sm text-gray-500">Verifies declared net & gross weight.</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 mb-2">
                  <input type="checkbox" className="mr-2 accent-blue-500" />
                  <div>
                    <div className="font-medium">Appearance / Color</div>
                    <div className="text-sm text-gray-500">Visual inspection for uniformity and defects.</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 mb-2">
                  <input type="checkbox" className="mr-2 accent-blue-500" />
                  <div>
                    <div className="font-medium">Texture / Feel</div>
                    <div className="text-sm text-gray-500">Indicates product consistency or processing quality.</div>
                  </div>
                </label>
              </div>
              <div>
                <label className="flex items-start gap-3 mb-2">
                  <input type="checkbox" className="mr-2 accent-blue-500" />
                  <div>
                    <div className="font-medium">Odor / Smell</div>
                    <div className="text-sm text-gray-500">Determines contamination or spoilage.</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 mb-2">
                  <input type="checkbox" className="mr-2 accent-blue-500" />
                  <div>
                    <div className="font-medium">Temperature Stability</div>
                    <div className="text-sm text-gray-500">Checks resistance to heat/cold during transit.</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 mb-2">
                  <input type="checkbox" className="mr-2 accent-blue-500" />
                  <div>
                    <div className="font-medium">Packaging Integrity</div>
                    <div className="text-sm text-gray-500">Ensures packing meets transport and export norms.</div>
                  </div>
                </label>
              </div>
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
                  disabled
                  placeholder="New requirement"
                  className="p-2 border rounded flex-1 md:flex-initial w-full"
                />
                <button disabled className="px-3 py-1 rounded bg-blue-600 text-white cursor-not-allowed">
                  Add
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-500">No additional requirements added</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}