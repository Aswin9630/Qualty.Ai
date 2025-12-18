import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Phone, Building, User } from "lucide-react";
import { BASE_URL, countryCodes } from "../utils/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    company: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(formData.phone.replace(/[\s\-()]/g, ""))) newErrors.phone = "Please enter a valid phone number (7-15 digits)";

    if (!formData.company.trim()) newErrors.company = "Company name is required";
    else if (formData.company.trim().length < 2) newErrors.company = "Company name must be at least 2 characters";

    if (!formData.role) newErrors.role = "Please select your role";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${BASE_URL}/contact/sendEnquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: `${formData.countryCode} ${formData.phone.trim()}`,
          company: formData.company.trim(),
          role: formData.role,
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          countryCode: "+1",
          phone: "",
          company: "",
          role: "",
          message: "",
        });
        setErrors({});
        setTimeout(() => {
          setSubmitted(false);
          setStatus("");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-600 text-sm md:text-base">You can reach us anytime</p>
        </div>

        {submitted && status === "success" ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 text-sm">Your enquiry has been sent successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="John Doe"
                  className={`w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-full text-gray-600 border focus:ring-2 focus:ring-black ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="your@email.com"
                  className={`w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 text-gray-600 rounded-full border focus:ring-2 focus:ring-black ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Company *</label>
              <div className="relative">
                <Building className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Your company"
                  className={`w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 text-gray-600 rounded-full border focus:ring-2 focus:ring-black ${
                    errors.company ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.company && <p className="text-red-500 text-xs mt-2">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone *</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-20 md:w-24 px-2 py-2 md:py-3 rounded-full text-gray-600 border border-gray-300 focus:ring-2 focus:ring-black text-sm"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Phone number"
                  className={`flex-1 px-3 md:px-4 py-2 md:py-3 rounded-full text-gray-600 border focus:ring-2 focus:ring-black ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-2 md:py-3 rounded-full border text-gray-600 focus:ring-2 focus:ring-black ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select your role...</option>
                <option value="importer">Importer</option>
                <option value="exporter">Exporter</option>
                <option value="both">Both Importer & Exporter</option>
                <option value="other">Other</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-2">{errors.role}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                rows={3}
                placeholder="Tell us how we can help you..."
                className="w-full px-3 md:px-4 py-2 md:py-3 text-gray-600 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            {status === "error" && (
              <div className="md:col-span-2 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-700">Failed to send enquiry. Please try again.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full py-2 md:py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
