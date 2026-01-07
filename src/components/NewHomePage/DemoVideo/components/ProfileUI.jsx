import React, { useState, useEffect, useRef } from "react";
import Joyride, { STATUS } from "react-joyride";
import { User, Mail, Phone, MapPin, FileText, X as XIcon } from "lucide-react";

const MOCK_USER = {
  name: "John Doe",
  email: "example@email.com",
  mobileNumber: "+91 9876543210",
  address: "123 Main Street, City, Country",
  profilePhoto: null,
  documents: {
    tradeLicense: null,
    importExportCertificate: null,
  },
};

// Dummy function for PDF links
const cloudinaryRawForPdf = (u) => u;

const ProfileUI = () => {
  const [tradeLicenseFile, setTradeLicenseFile] = useState(null);
  const [importExportFile, setImportExportFile] = useState(null);
  const [localPreviewTrade, setLocalPreviewTrade] = useState(null);
  const [localPreviewImport, setLocalPreviewImport] = useState(null);
  const [viewerUrl, setViewerUrl] = useState(null);
  const [viewerTitle, setViewerTitle] = useState(null);
  const [runJoyride, setRunJoyride] = useState(true);

  const user = MOCK_USER;

  // Revoke object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (localPreviewTrade) URL.revokeObjectURL(localPreviewTrade);
      if (localPreviewImport) URL.revokeObjectURL(localPreviewImport);
    };
  }, [localPreviewTrade, localPreviewImport]);

  const joyrideSteps = [
    {
      target: ".profile-header",
      content: "Welcome to your Profile! Here you can manage all your personal info.",
      disableBeacon: true,
    },
    {
      target: ".profile-info",
      content: "This section displays your profile photo, name, email, phone, and address.",
    },
    {
      target: ".trade-license",
      content: "Here you can upload or view your Trade License certificate.",
    },
    {
      target: ".import-export",
      content: "This section is for your Import/Export Certificate.",
    },
    {
      target: ".upload-button",
      content: "Once ready, click this button to upload your certificates (frontend-only in this demo).",
    },
  ];

  // Auto-scroll to Joyride step
  const handleJoyrideCallback = (data) => {
    const { status, index, step } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunJoyride(false);
    } else if (step?.target) {
      const el = document.querySelector(step.target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 text-black relative">
      <Joyride
        steps={joyrideSteps}
        run={runJoyride}
        continuous
        showProgress
        showSkipButton
        styles={{ options: { zIndex: 10000 } }}
        callback={handleJoyrideCallback}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center profile-header">
          <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-black via-gray-800 to-black text-transparent bg-clip-text">
            My Account
          </h2>
          <p className="text-sm text-gray-500">Manage your profile information</p>
        </div>

        {/* Profile Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm profile-info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center space-y-2">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border border-black"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300">
                  <User size={32} />
                </div>
              )}
              <p className="text-xs text-gray-500">Profile Photo</p>
            </div>

            <div className="space-y-3">
              <InfoBlock icon={<User size={16} />} label="Name" value={user.name} />
              <InfoBlock icon={<Mail size={16} />} label="Email" value={user.email} />
              <InfoBlock icon={<Phone size={16} />} label="Phone" value={user.mobileNumber} />
              <InfoBlock icon={<MapPin size={16} />} label="Address" value={user.address} multiline />
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} />
            <h3 className="text-lg font-semibold">Certificates</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CertificateBlock
              label="Trade License"
              fileUrl={user.documents.tradeLicense}
              localPreview={localPreviewTrade}
              className="trade-license"
              onFileChange={(file) => {
                if (!file) return;
                setTradeLicenseFile(file);
                if (localPreviewTrade) URL.revokeObjectURL(localPreviewTrade);
                if (file.type && file.type.startsWith("image/")) {
                  setLocalPreviewTrade(URL.createObjectURL(file));
                } else {
                  setLocalPreviewTrade(null);
                }
              }}
              onView={(url) => {
                setViewerUrl(url);
                setViewerTitle("Trade License");
              }}
            />

            <CertificateBlock
              label="Import/Export Certificate"
              fileUrl={user.documents.importExportCertificate}
              localPreview={localPreviewImport}
              className="import-export"
              onFileChange={(file) => {
                if (!file) return;
                setImportExportFile(file);
                if (localPreviewImport) URL.revokeObjectURL(localPreviewImport);
                if (file.type && file.type.startsWith("image/")) {
                  setLocalPreviewImport(URL.createObjectURL(file));
                } else {
                  setLocalPreviewImport(null);
                }
              }}
              onView={(url) => {
                setViewerUrl(url);
                setViewerTitle("Import / Export Certificate");
              }}
            />
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => alert("Mock upload (frontend only)")}
              className="px-4 py-1 text-sm bg-black cursor-pointer text-white rounded hover:bg-gray-900 transition upload-button"
            >
              Upload Certificates
            </button>
          </div>
        </div>
      </div>

      {/* Viewer Modal */}
      {viewerUrl && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setViewerUrl(null);
            setViewerTitle(null);
          }}
        >
          <div
            className="bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setViewerUrl(null);
                setViewerTitle(null);
              }}
              className="absolute right-3 top-3 z-40 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close viewer"
            >
              <XIcon size={16} />
            </button>
            <div className="w-full h-full">
              <iframe
                src={cloudinaryRawForPdf(viewerUrl)}
                title={viewerTitle || "Document"}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------------ Components ------------------
const InfoBlock = ({ icon, label, value, multiline }) => (
  <div className="bg-gray-50 rounded border border-gray-200 px-3 py-2 text-sm">
    <div className="flex items-center gap-2 mb-1 text-gray-600">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <p className={`text-black ml-6 ${multiline ? "whitespace-pre-line leading-snug" : ""}`}>{value || "-"}</p>
  </div>
);

const CertificateBlock = ({ label, fileUrl, onFileChange, localPreview = null, onView, className = "" }) => {
  const finalUrl = fileUrl;
  const isPDF = finalUrl?.toLowerCase().endsWith(".pdf");
  const isImage = finalUrl?.match(/\.(png|jpe?g|webp|gif|svg)$/i);

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="bg-gray-50 border border-gray-200 rounded overflow-hidden h-40 flex items-center justify-center">
        {localPreview ? (
          <img src={localPreview} alt={label} className="max-h-full max-w-full object-contain" />
        ) : finalUrl ? (
          isPDF ? (
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm text-gray-700">PDF document</div>
              <div className="flex gap-2">
                <button onClick={() => onView(finalUrl)} className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-900">
                  View
                </button>
                <a href={finalUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                  Open in New Tab
                </a>
              </div>
            </div>
          ) : isImage ? (
            <img src={finalUrl} alt={label} className="max-h-full max-w-full object-contain" />
          ) : (
            <a href={finalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
              Open {label}
            </a>
          )
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 text-sm px-2">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <FileText size={28} />
            </div>
            <div className="text-xs text-center leading-tight">
              No {label.toLowerCase()} uploaded
              <br />
              Please upload a valid certificate
            </div>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*,application/pdf,.doc,.docx"
        onChange={(e) => onFileChange(e.target.files[0])}
        className="mt-2 text-xs text-gray-600 file:bg-black file:text-white file:px-3 file:py-1 file:rounded file:border-none file:cursor-pointer"
      />
      <p className="text-[11px] text-gray-500 mt-1">Maximum file size: 10 MB</p>
    </div>
  );
};

export default ProfileUI;




