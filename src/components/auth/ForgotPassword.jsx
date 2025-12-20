// import { useState } from "react";
// import { toast } from "react-toastify";
// import { BASE_URL } from "../../utils/constants";

// export default function ForgotPassword() {
//   const [formData, setFormData] = useState({ email: "", role: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Password reset email sent!");
//       } else {
//         toast.error(data.message || "Failed to send reset email");
//       }
//     } catch (err) {
//       toast.error("Error sending reset email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <form onSubmit={handleSubmit} className="max-w-md w-full p-8 border rounded-lg shadow space-y-4">
//         <h2 className="text-xl font-bold">Forgot Password</h2>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         >
//           <option value="">-- Select Role --</option>
//           <option value="customer">Customer</option>
//           <option value="inspector">Inspector</option>
//           <option value="inspection_company">Inspection Company</option>
//         </select>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-black text-white py-2 rounded cursor-pointer"
//         >
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { Mail, Lock, ArrowRight, Check } from "lucide-react";
import { BASE_URL } from "../../utils/constants";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ email: "", role: "" });
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("Error sending reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h2>
            <p className="text-slate-600 mb-6">
              We've sent a password reset link to <span className="font-semibold text-slate-900">{formData.email || "your email"}</span>
            </p>
            <p className="text-sm text-slate-500 mb-8">
              The link will expire in 24 hours. If you don't see it, check your spam folder.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-600">Enter your email and role to receive a password reset link</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Your Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white text-slate-900"
              >
                <option value="">-- Select Role --</option>
                <option value="customer">Customer</option>
                <option value="inspector">Inspector</option>
                <option value="inspection_company">Inspection Company</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-500">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <a
            href="/login"
            className="block text-center text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            Back to Login
          </a>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          We'll send you an email with instructions to reset your password
        </p>
      </div>
    </div>
  );
}