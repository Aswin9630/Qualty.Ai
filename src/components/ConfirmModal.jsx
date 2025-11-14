import React from "react";

export default function ConfirmModal({ open, onClose, onConfirm, title, message }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title || "Confirm action"}</h3>
            <p className="text-sm text-gray-600 mt-1">{message || "Are you sure?"}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded  cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            No
          </button>

          <button
            onClick={() => {
              onConfirm();
            }}
            className="px-4 py-2 rounded cursor-pointer bg-red-600 text-white hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
