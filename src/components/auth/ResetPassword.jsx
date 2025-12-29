import React, { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Check, X } from "lucide-react";
import { BASE_URL } from "../../utils/constants";

export default function ResetPassword({ token = "sample-token", role = "customer", onSuccess = () => {} }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordRequirements).every(req => req);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!password) {
      setError("Enter a new password");
      return;
    }
    
    if (!isPasswordStrong) {
      setError("Password does not meet all requirements");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, password }),
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Password Reset Successful</h2>
            <p className="text-slate-600 mb-6">
              Your password has been reset successfully. Redirecting to login...
            </p>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-3 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h1>
          <p className="text-slate-600">Create a strong password for your account</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Role Badge */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Account Role</p>
            <p className="text-sm font-semibold text-slate-900 capitalize">
              {role ? role.replace(/_/g, " ") : "Not specified"}
            </p>
          </div>

          <div className="space-y-5">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                  className="w-full pl-10 pr-12 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-3">Password Requirements</p>
                
                <div className="space-y-2">
                  {/* Minimum Length */}
                  <div className="flex items-center gap-2">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.minLength ? "bg-emerald-100" : "bg-red-50"}`}>
                      {passwordRequirements.minLength ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                    <span className={`text-xs ${passwordRequirements.minLength ? "text-emerald-700 font-medium" : "text-slate-600"}`}>
                      Minimum 8 characters
                    </span>
                  </div>

                  {/* Uppercase Letter */}
                  <div className="flex items-center gap-2">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.hasUpperCase ? "bg-emerald-100" : "bg-red-50"}`}>
                      {passwordRequirements.hasUpperCase ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                    <span className={`text-xs ${passwordRequirements.hasUpperCase ? "text-emerald-700 font-medium" : "text-slate-600"}`}>
                      One uppercase letter (A-Z)
                    </span>
                  </div>

                  {/* Lowercase Letter */}
                  <div className="flex items-center gap-2">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.hasLowerCase ? "bg-emerald-100" : "bg-red-50"}`}>
                      {passwordRequirements.hasLowerCase ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                    <span className={`text-xs ${passwordRequirements.hasLowerCase ? "text-emerald-700 font-medium" : "text-slate-600"}`}>
                      One lowercase letter (a-z)
                    </span>
                  </div>

                  {/* Number */}
                  <div className="flex items-center gap-2">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.hasNumber ? "bg-emerald-100" : "bg-red-50"}`}>
                      {passwordRequirements.hasNumber ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                    <span className={`text-xs ${passwordRequirements.hasNumber ? "text-emerald-700 font-medium" : "text-slate-600"}`}>
                      One number (0-9)
                    </span>
                  </div>

                  {/* Special Character */}
                  <div className="flex items-center gap-2">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${passwordRequirements.hasSpecialChar ? "bg-emerald-100" : "bg-red-50"}`}>
                      {passwordRequirements.hasSpecialChar ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                    <span className={`text-xs ${passwordRequirements.hasSpecialChar ? "text-emerald-700 font-medium" : "text-slate-600"}`}>
                      One special character (!@#$%^&*)
                    </span>
                  </div>
                </div>

                {/* Strength Meter */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-700">Strength</p>
                    <p className="text-xs font-semibold">
                      {!isPasswordStrong ? (
                        <span className="text-red-600">Weak</span>
                      ) : (
                        <span className="text-emerald-600">Strong</span>
                      )}
                    </p>
                  </div>
                  <div className="h-2 bg-slate-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isPasswordStrong ? "w-full bg-emerald-500" : "w-1/3 bg-red-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !password || !isPasswordStrong}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Reset Password
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-500">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Back to Login Link */}
          <a
            href="/login"
            className="block text-center text-slate-700 hover:text-slate-900 font-medium transition-colors"
          >
            Back to Login
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Use a strong password with a mix of characters for better security
        </p>
      </div>
    </div>
  );
}