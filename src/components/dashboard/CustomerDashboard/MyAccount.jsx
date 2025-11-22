import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, FileText, X as XIcon } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const cloudinaryRawForPdf = (u) => {
  if (!u || typeof u !== "string") return u;
  try {
    if (u.includes("res.cloudinary.com") && /\.pdf($|\?)/i.test(u)) {
      if (u.includes("/image/upload/")) return u.replace("/image/upload/", "/raw/upload/");
      if (u.includes("/upload/")) return u.replace("/upload/", "/raw/upload/");
    }
  } catch (e) {}
  return u;
};

const MyAccount = () => {
  const [tradeLicenseFile, setTradeLicenseFile] = useState(null);
  const [importExportFile, setImportExportFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [localPreviewTrade, setLocalPreviewTrade] = useState(null);
  const [localPreviewImport, setLocalPreviewImport] = useState(null);
  const [viewerUrl, setViewerUrl] = useState(null);
  const [viewerTitle, setViewerTitle] = useState(null);

  const user = useSelector((store) => store?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (localPreviewTrade) URL.revokeObjectURL(localPreviewTrade);
      if (localPreviewImport) URL.revokeObjectURL(localPreviewImport);
    };
  }, [localPreviewTrade, localPreviewImport]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const { name, email, mobileNumber, address, profilePhoto, documents } = user || {};

  const handleUpload = async () => {
    if (!tradeLicenseFile && !importExportFile) {
      toast.info("Choose at least one file to upload");
      return;
    }

    const formData = new FormData();
    if (tradeLicenseFile) formData.append("tradeLicense", tradeLicenseFile);
    if (importExportFile) formData.append("importExportCertificate", importExportFile);

    try {
      setUploading(true);
      const res = await fetch(`${BASE_URL}/customer/profile/updateDocuments`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success(data.message || "Documents updated");
        window.location.reload()
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      setTradeLicenseFile(null);
      setImportExportFile(null);
      if (localPreviewTrade) {
        URL.revokeObjectURL(localPreviewTrade);
        setLocalPreviewTrade(null);
      }
      if (localPreviewImport) {
        URL.revokeObjectURL(localPreviewImport);
        setLocalPreviewImport(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 text-black">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-black via-gray-800 to-black text-transparent bg-clip-text">
            My Account
          </h2>
          <p className="text-sm text-gray-500">Manage your profile information</p>
        </div>

        {/* Profile Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center space-y-2">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover border border-black" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300">
                  <User size={32} />
                </div>
              )}
              <p className="text-xs text-gray-500">Profile Photo</p>
            </div>

            <div className="space-y-3">
              <InfoBlock icon={<User size={16} />} label="Name" value={name} />
              <InfoBlock icon={<Mail size={16} />} label="Email" value={email} />
              <InfoBlock icon={<Phone size={16} />} label="Phone" value={mobileNumber} />
              <InfoBlock icon={<MapPin size={16} />} label="Address" value={address} multiline />
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
              fileUrl={documents?.tradeLicense}
              localPreview={localPreviewTrade}
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
              fileUrl={documents?.importExportCertificate}
              localPreview={localPreviewImport}
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
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-1 text-sm bg-black cursor-pointer text-white rounded hover:bg-gray-900 transition disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Certificates"}
            </button>
          </div>
        </div>
      </div>

      {viewerUrl && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setViewerUrl(null);
            setViewerTitle(null);
          }}
        >
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
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
              <iframe src={cloudinaryRawForPdf(viewerUrl)} title={viewerTitle || "Document"} className="w-full h-full border-0" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoBlock = ({ icon, label, value, multiline }) => (
  <div className="bg-gray-50 rounded border border-gray-200 px-3 py-2 text-sm">
    <div className="flex items-center gap-2 mb-1 text-gray-600">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <p className={`text-black ml-6 ${multiline ? "whitespace-pre-line leading-snug" : ""}`}>{value || "-"}</p>
  </div>
);

const CertificateBlock = ({ label, fileUrl, onFileChange, localPreview = null, onView }) => {
  const candidate = fileUrl && fileUrl.startsWith("http") ? fileUrl : fileUrl ? `${BASE_URL}/${fileUrl}` : null;
  const finalUrl = cloudinaryRawForPdf(candidate);

  const lower = (finalUrl || "").toLowerCase();
  const isPDF = /\.pdf($|\?)/i.test(lower);
  const isDoc = /\.(docx?|odt|rtf)($|\?)/i.test(lower);
  const isImage = /\.(png|jpeg|webp|gif|svg)($|\?)/i.test(lower);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      <div className="bg-gray-50 border border-gray-200 rounded overflow-hidden h-40 flex items-center justify-center">
        {localPreview ? (
          <img src={localPreview} alt={label} className="max-h-full max-w-full object-contain" />
        ) : finalUrl ? (
          isPDF ? (
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm text-gray-700">PDF document</div>
              <div className="flex gap-2">
                <button
                  onClick={() => onView && onView(finalUrl)}
                  className="px-3 py-1 text-xs bg-black text-white rounded hover:bg-gray-900"
                >
                  View
                </button>
                <a href={finalUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                  Open in New Tab
                </a>
              </div>
            </div>
          ) : isDoc ? (
            <a href={finalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
              Download {label}
            </a>
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

export default MyAccount;
