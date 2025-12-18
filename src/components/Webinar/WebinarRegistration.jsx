import React, { useState } from 'react';
import { Mail, Phone, User, CheckCircle, Globe, TrendingUp, Shield, Users, AlertCircle } from 'lucide-react';
import { BASE_URL } from '../../utils/constants';

export default function WebinarRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive communications';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setServerError("");
    setSuccessMessage("");

    try {
    const res = await fetch(`${BASE_URL}/webinar/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    email: formData.email.trim().toLowerCase(),
    role: formData.role,
    consent: formData.consent,  
  }),
});


      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors && typeof data.errors === 'object') {
          setErrors(data.errors);
        } else {
          setServerError(data.message || "Registration failed. Please try again.");
        }
        setLoading(false);
        return;
      }

      setSuccessMessage(data.message || "Registration successful!");
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        role: '',
        consent: false,
      });
      setErrors({});

    } catch (error) {
      console.error("Error submitting form:", error);
      setServerError("An error occurred while registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
        return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
                    <CheckCircle className="w-16 h-16 text-green-500 relative z-10" />
                </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Registration Confirmed!</h2>
                <p className="text-gray-600 mb-4 text-sm md:text-base">
                Thank you for registering for the Qualty.ai webinar.
                </p>
                <p className="text-gray-600 mb-6 text-sm md:text-base">
                A confirmation email has been sent to <span className="font-semibold text-blue-600">{formData.email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                We'll send you the webinar details and login link shortly. Keep an eye on your inbox!
                </p>
                <button
                onClick={() => {
                    setSubmitted(false);
                    setServerError("");
                    setSuccessMessage("");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
                >
                Register Another Participant
                </button>
            </div>
            </div>
        </div>
        );
  }
return (
  <div className="relative min-h-screen bg-white text-gray-800 overflow-hidden">

 <section
  className="relative min-h-screen bg-center bg-cover flex items-center justify-center"
  style={{
    backgroundImage:
      "url('https://images.hdqwalls.com/wallpapers/cargo-ship-4s.jpg')",
  }}
>
  <div className="absolute inset-0 bg-black/20" />

  <div className="relative z-10 text-center px-6 md:px-24 max-w-4xl">
    <span className="bg-white text-blue-900 px-6 py-2 text-sm tracking-widest uppercase mb-6 rounded inline-block">
      Join Our Webinar
    </span>

    <h1 className="text-[32px] md:text-[48px] font-extrabold tracking-wide text-white leading-tight mb-2">
      Master Global Trade
    </h1>

    <h2 className="text-[24px] md:text-[40px] font-extrabold tracking-wide text-white mb-4">
      Quality Inspections
    </h2>

    <p className="text-gray-200 text-lg mt-4">
      Learn how to reduce trade risks and ensure cargo quality with Qualty.ai
    </p>
  </div>
</section>


    <section
      id="about"
      className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16"
    >
      <div>
        <h2 className="text-3xl font-bold mb-6">About This Webinar</h2>
        <p className="text-gray-700 mb-4">
          Qualty.ai is a one-stop platform for global trade quality inspections, helping exporters and importers ensure cargo quality through trusted inspection partners worldwide.
        </p>
        <p className="text-gray-700">
          Join this webinar to learn how to reduce trade risks and improve shipment reliability.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-6">What You'll Learn</h3>
        <ul className="space-y-4">
          {[
            "Quality inspection best practices for global trade",
            "How to mitigate supply chain risks",
            "Leveraging technology for cargo verification",
            "Real-world case studies from industry experts",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>

       
      </div>
    </section>

        <section
        id="register"
        className="relative z-10 max-w-6xl mx-auto px-6 pb-24 flex justify-center"
        >
        <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl border border-gray-300">
            <h2 className="text-2xl font-bold mb-2 text-center">Register Now</h2>
            <p className="text-gray-500 mb-6 text-center">Join 500+ trade professionals</p>

            {serverError && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <p className="text-sm text-red-300">{serverError}</p>
            </div>
            )}

            {successMessage && (
            <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-green-300">{successMessage}</p>
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
            {[
                { id: "name", type: "text", placeholder: "Full Name", icon: User, error: errors.name },
                { id: "phone", type: "tel", placeholder: "Phone Number", icon: Phone, error: errors.phone },
                { id: "email", type: "email", placeholder: "Email Address", icon: Mail, error: errors.email },
            ].map(({ id, type, placeholder, icon: Icon, error }) => (
                <div key={id} className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    name={id}
                    type={type}
                    value={formData[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={loading}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 transition`}
                />
                {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
                </div>
            ))}

            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full py-4 px-4 rounded-xl border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 transition"
            >
                <option value="">Select your role...</option>
                <option value="exporter">Exporter</option>
                <option value="importer">Importer</option>
                <option value="both">Both Exporter & Importer</option>
                <option value="logistics">Logistics Provider</option>
                <option value="other">Other</option>
            </select>

            <div className="flex gap-3 text-sm text-gray-600 mt-3 items-center">
                <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="accent-black-500 mt-1"
                />
                <label className="text-sm">I agree to receive updates and communications from Qualty.ai.</label>
            </div>
            {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}

        <div className="flex justify-center mt-4">
  <button
    type="submit"
    disabled={loading || !formData.consent}
    className="inline-block py-4 px-6 bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold rounded-md cursor-pointer hover:scale-105 transition duration-200"
  >
    {loading ? "Processing..." : "Register"}
  </button>
</div>

            <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Your data is secure. We respect your privacy.
            </p>
            </form>
        </div>
        </section>

    <footer className="border-t border-gray-300 bg-black py-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
        <div>
          <h4 className="text-white font-semibold mb-2">About Qualty.ai</h4>
          Global quality inspection platform for trade professionals
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Support</h4>
          support@qualty.ai
        </div>
        <div className="md:text-right">
          © 2024 Qualty.ai. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
);}