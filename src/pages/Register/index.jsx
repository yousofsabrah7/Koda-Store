
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useSendRegisterOTP } from "../../services/apiHooks/authHook";

function validate({
  username,
  email,
  phone,
  password,
  confirmPassword,
  agreedToTerms,
}) {
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

  const { mutate: sendOtp, isPending: isSubmitting } =
    useSendRegisterOTP();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

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
      onSuccess: () =>
        navigate("/verify-otp", {
          state: {
            email: payload.email,
          },
        }),

      onError: (err) =>
        setFormError(
          err?.message || "Could not create your account."
        ),
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-base px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-text-primary"
          >
            Koda
            <span className="text-accent">Store</span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-8 shadow-sm">

          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-xl font-bold text-text-primary">
              Create your account
            </h1>

            <p className="text-sm text-text-secondary">
              Sign up to start shopping with Koda Store
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* Form Error */}
            {formError && (
              <div
                className="
                  flex items-start gap-2
                  rounded-xl
                  border border-red-200
                  bg-red-50
                  px-3.5 py-2.5
                  text-sm text-red-600
                  dark:border-red-900/40
                  dark:bg-red-950/20
                  dark:text-red-400
                "
              >
                <FaExclamationTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                Username
              </label>

              <div className="relative">
                <FaUser
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4 -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  type="text"
                  placeholder="john_doe"
                  value={formData.username}
                  onChange={handleChange("username")}
                  autoComplete="username"
                  className={`
                    w-full rounded-xl border
                    bg-surface-card
                    py-2.5 pl-10 pr-3.5
                    text-sm text-text-primary
                    placeholder:text-text-muted
                    transition
                    focus:outline-none
                    focus:ring-2
                    ${
                      errors.username
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                        : "border-border-subtle focus:border-accent focus:ring-accent-light"
                    }
                  `}
                />
              </div>

              {errors.username && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                Email
              </label>

              <div className="relative">
                <FaEnvelope
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4 -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                  className={`
                    w-full rounded-xl border
                    bg-surface-card
                    py-2.5 pl-10 pr-3.5
                    text-sm text-text-primary
                    placeholder:text-text-muted
                    transition
                    focus:outline-none
                    focus:ring-2
                    ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                        : "border-border-subtle focus:border-accent focus:ring-accent-light"
                    }
                  `}
                />
              </div>

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                Phone
              </label>

              <div className="relative">
                <FaPhone
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4 -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  type="tel"
                  placeholder="+201234567890"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  autoComplete="tel"
                  className={`
                    w-full rounded-xl border
                    bg-surface-card
                    py-2.5 pl-10 pr-3.5
                    text-sm text-text-primary
                    placeholder:text-text-muted
                    transition
                    focus:outline-none
                    focus:ring-2
                    ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                        : "border-border-subtle focus:border-accent focus:ring-accent-light"
                    }
                  `}
                />
              </div>

              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                Password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4 -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange("password")}
                  autoComplete="new-password"
                  className={`
                    w-full rounded-xl border
                    bg-surface-card
                    py-2.5 pl-10 pr-10
                    text-sm text-text-primary
                    placeholder:text-text-muted
                    transition
                    focus:outline-none
                    focus:ring-2
                    ${
                      errors.password
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                        : "border-border-subtle focus:border-accent focus:ring-accent-light"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute right-3 top-1/2
                    -translate-y-1/2
                    cursor-pointer
                    text-text-muted
                    transition
                    hover:text-text-primary
                  "
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">
                Confirm password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4 -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  autoComplete="new-password"
                  className={`
                    w-full rounded-xl border
                    bg-surface-card
                    py-2.5 pl-10 pr-10
                    text-sm text-text-primary
                    placeholder:text-text-muted
                    transition
                    focus:outline-none
                    focus:ring-2
                    ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                        : "border-border-subtle focus:border-accent focus:ring-accent-light"
                    }
                  `}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="
                    absolute right-3 top-1/2
                    -translate-y-1/2
                    cursor-pointer
                    text-text-muted
                    transition
                    hover:text-text-primary
                  "
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={handleChange("agreedToTerms")}
                  className="
                    mt-0.5 h-4 w-4
                    cursor-pointer
                    rounded
                    border-border-strong
                    accent-[var(--color-accent)]
                    focus:ring-2
                    focus:ring-accent-light
                  "
                />

                <span className="text-sm text-text-secondary">
                  I agree to the{" "}
                  <span className="font-medium text-accent">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-accent">
                    Privacy Policy
                  </span>
                </span>
              </label>

              {errors.agreedToTerms && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.agreedToTerms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full rounded-xl
                bg-accent
                py-2.5
                text-sm font-semibold text-white
                transition
                hover:bg-accent-hover
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-light
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting
                ? "Sending code..."
                : "Create account"}
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="
                font-medium text-accent
                transition
                hover:text-accent-hover
              "
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
