import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
} from "react-icons/fa";
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending: isSubmitting } = useLogin();

  const redirectTo = location.state?.from?.pathname || "/";

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
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

    login(
      {
        email: formData.email.trim(),
        password: formData.password,
      },
      {
        onSuccess: () => navigate(redirectTo, { replace: true }),
        onError: (err) =>
          setFormError(err?.message || "Incorrect email or password."),
      },
    );
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
            E-Hub
            <span className="text-accent">Store</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-xl font-bold text-text-primary">
              Welcome back
            </h1>

            <p className="text-sm text-text-secondary">
              Log in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-text-secondary"
              >
                Email
              </label>

              <div className="relative">
                <FaEnvelope
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  id="email"
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
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-text-secondary"
              >
                Password
              </label>

              <div className="relative">
                <FaLock
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange("password")}
                  autoComplete="current-password"
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
                  onClick={() => setShowPassword((prev) => !prev)}
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
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}

              {/* Forgot Password */}
              <div className="mt-1.5 flex justify-end">
                <Link
                  to="/forget-password"
                  className="
                    text-xs font-medium
                    text-accent
                    transition
                    hover:text-accent-hover
                  "
                >
                  Forgot password?
                </Link>
              </div>
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
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="
                font-medium
                text-accent
                transition
                hover:text-accent-hover
              "
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
