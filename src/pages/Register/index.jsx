import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaEye, FaEyeSlash, FaExclamationTriangle } from "react-icons/fa";
import { useSendRegisterOTP } from "../../services/apiHooks/authHook";

function validate({ username, email, phone, password, confirmPassword, agreedToTerms }) {
  const errors = {};

  if (!username.trim()) {
    errors.username = "Username is required.";
  } else if (username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters.";
  }

  if (!phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9]{8,15}$/.test(phone.replace(/[\s-]/g, ""))) {
    errors.phone = "Enter a valid phone number, e.g. +201234567890.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!agreedToTerms) {
    errors.agreedToTerms = "You must agree to the terms to continue.";
  }

  return errors;
}

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const { mutate: sendOtp, isPending: isSubmitting } = useSendRegisterOTP();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
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

    const payload = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phone.replace(/[\s-]/g, ""),
    };

    sendOtp(payload, {
      // The OTP was emailed; the next screen asks for it.
      onSuccess: () =>
        navigate("/verify-otp", { state: { email: payload.email } }),
      onError: (err) =>
        setFormError(err?.message || "Could not create your account."),
    });
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
            <h1 className="text-xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-sm text-gray-500">Sign up to start shopping with Koda Store</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {formError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-3.5 py-2.5">
                <FaExclamationTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Username</label>
              <div className="relative">
                <FaUser className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="john_doe"
                  value={formData.username}
                  onChange={handleChange("username")}
                  autoComplete="username"
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.username ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
                  }`}
                />
              </div>
              {errors.username && <p className="text-xs text-red-500 mt-1.5">{errors.username}</p>}
            </div>

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
                    errors.email ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone</label>
              <div className="relative">
                <FaPhone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="+201234567890"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  autoComplete="tel"
                  className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.phone ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange("password")}
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.password ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
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
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Confirm password</label>
              <div className="relative">
                <FaLock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1.5">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={handleChange("agreedToTerms")}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-amber-600 focus:ring-indigo-400 cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-amber-600 font-medium">Terms of Service</span>{" "}
                  and{" "}
                  <span className="text-amber-600 font-medium">Privacy Policy</span>
                </span>
              </label>
              {errors.agreedToTerms && <p className="text-xs text-red-500 mt-1.5">{errors.agreedToTerms}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-200 disabled:bg-indigo-300 text-white text-sm font-semibold py-2.5 rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending code..." : "Create account"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-amber-600 hover:text-amber-200 transition">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
