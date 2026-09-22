import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import { useLogin } from "../../services/apiHooks/authHook";

function validate({ email, password }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: isSubmitting } = useLogin();

  const redirectTo = location.state?.from?.pathname || "/";

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setFormError("");

    login(
      { email: formData.email.trim(), password: formData.password },
      {
        onSuccess: () => navigate(redirectTo, { replace: true }),
        onError: (err) => setFormError(err?.message || "Incorrect email or password."),
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
            Koda<span className="text-amber-600">Store</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-sm text-gray-500">Log in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {formError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-3.5 py-2.5">
                <FaExclamationTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
              <div className="relative">
                <FaEnvelope className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                      : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange("password")}
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                      : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1.5">{errors.password}</p>}
              <div className="flex justify-end mt-1.5">
                <Link to="/forget-password" className="text-xs font-medium text-amber-600 hover:text-amber-200 transition">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-200 disabled:bg-indigo-300 text-white text-sm font-semibold py-2.5 rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-amber-600 hover:text-amber-600 transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}