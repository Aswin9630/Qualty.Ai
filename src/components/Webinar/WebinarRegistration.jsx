import React, { useState } from 'react';
import { Mail, Phone, User, CheckCircle } from 'lucide-react';
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

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2)
      newErrors.name = 'Name must be at least 2 characters';

    if (!formData.phone.trim())
      newErrors.phone = 'Phone number is required';
    else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.phone))
      newErrors.phone = 'Please enter a valid phone number';

    if (!formData.email.trim())
      newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';

    if (!formData.role) newErrors.role = 'Please select your role';
    if (!formData.consent)
      newErrors.consent = 'You must agree to receive communications';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
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
        setServerError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setSuccessMessage(data.message || "Registration successful!");
      setFormData({ name: '', phone: '', email: '', role: '', consent: false });
      setErrors({});
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Registration Confirmed</h2>
          <p className="text-gray-600 mb-6">
            A confirmation email has been sent.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-2xl mx-auto px-6 py-24">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border">
          <h2 className="text-2xl font-bold text-center mb-6">Register Now</h2>

          {serverError && (
            <p className="text-red-500 text-sm mb-4">{serverError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "name", type: "text", placeholder: "Full Name", icon: User },
              { id: "phone", type: "tel", placeholder: "Phone Number", icon: Phone },
              { id: "email", type: "email", placeholder: "Email Address", icon: Mail },
            ].map(({ id, type, placeholder, icon: Icon }) => (
              <div key={id} className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  disabled={loading}
                  className="w-full pl-12 py-4 border rounded-xl"
                />
                {errors[id] && (
                  <p className="text-xs text-red-500 mt-1">{errors[id]}</p>
                )}
              </div>
            ))}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full py-4 px-4 border rounded-xl"
            >
              <option value="">Select your role...</option>
              <option value="exporter">Exporter</option>
              <option value="importer">Importer</option>
              <option value="both">Both</option>
              <option value="logistics">Logistics</option>
            </select>

            <div className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="accent-blue-700"
              />
              <label>I agree to receive updates and communications from Qualty.ai.</label>
            </div>
            {errors.consent && (
              <p className="text-xs text-red-500">{errors.consent}</p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading || !formData.consent}
                className={`py-4 px-6 font-semibold rounded-md transition duration-200
                  ${
                    loading || !formData.consent
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-gradient-to-r from-blue-800 to-blue-600 text-white hover:scale-105 cursor-pointer"
                  }`}
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              🔒 Your data is secure.
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
  );
}
