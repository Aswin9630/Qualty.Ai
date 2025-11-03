import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slice/userSlice";
import { Mail, Lock, User } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await response.json();
      if (!result.success) {
        setError(result.errors?.[0]?.msg || result.message);
      } else {
        dispatch(addUser(result.user));
        setError("");
        toast.success("Login successful!");
        setTimeout(() => {
          if (location.state?.redirectTo) {
            navigate(location.state.redirectTo, {
              state: location.state.payload,
            });
          } else {
            navigate(`/${result.user.role}/dashboard`);
          }
        }, 500);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  return (

    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-center px-4 py-35 sm:py-25 lg:py-25 gap-5 w-full max-w-7xl mb-5">
        <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-8 space-y-6 mb-8 lg:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Welcome to Qualty.AI
          </h1>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md">
            “We simplify global inspections by connecting traders with certified
            professionals. Our platform ensures transparency, speed, and trust —
            every step of the way.”
          </p>
          <p className="text-gray-600 text-sm italic">
            “Quality is not just a checkbox — it’s a commitment to excellence.”
          </p>
          <div className="mt-4">
            <span className="inline-block bg-black text-white text-xs font-medium px-3 py-1 rounded-full shadow">
              Global. Verified. Transparent.
            </span>
          </div>
        </div>

        <div className="max-w-md w-full space-y-2">
          {/* Header */}
          <div className="text-center">
            <div className="mb-8">
              <div className="mx-auto h-12 w-12 bg-black rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-black">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-300 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <div className="relative ">
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    >
                      <option value="">-- Select Role --</option>
                      <option value="customer">Customer</option>
                      <option value="inspector">Inspector</option>
                    </select>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={loading}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      disabled={loading}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                  <div className="flex items-center">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full py-3 px-4 bg-black text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-medium cursor-pointer text-black hover:text-gray-800 transition-colors duration-200 underline underline-offset-4"
                disabled={loading}
              >
                Sign up
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
