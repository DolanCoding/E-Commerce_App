import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
  faSpinner,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { login, clearError } from "../store/authSlice";
import { validateEmail, validatePassword } from "../utils/helpers";
import type { RootState, AppDispatch } from "../store/store";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    try {
      const result = await dispatch(login({ email, password }));
      if (login.fulfilled.match(result)) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card-elevated">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your ShopHub account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-800 rounded-lg text-sm font-medium">
              <div className="flex gap-2 justify-between items-center">
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faX} className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
                <button
                  onClick={() => dispatch(clearError())}
                  className="text-red-600 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                Email Address
              </label>
              <div className="flex items-center gap-3 group">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300 flex-shrink-0"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300"
                >
                  Forgot?
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <FontAwesomeIcon
                  icon={faLock}
                  className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300 flex-shrink-0"
                />
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all duration-300 font-medium hover:border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg-premium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-medium">New to ShopHub?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="block w-full px-6 py-3 border-2 border-blue-600 text-blue-600 text-center font-bold rounded-lg hover:bg-blue-50 transition"
          >
            Create Account
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 text-sm mt-6">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};
