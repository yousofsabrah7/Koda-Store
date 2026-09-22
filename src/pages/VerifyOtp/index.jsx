import { useState } from "react";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { FaKey, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

import { useVerifyRegisterOTP } from "../../services/apiHooks/authHook";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const { mutate: verifyOtp, isPending } = useVerifyRegisterOTP();

  // Opened directly (or after a refresh) — there is no email to verify.
  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Enter the 6-digit code we emailed you.");
      return;
    }

    verifyOtp(
      { email, otp },
      {
        // Account is created on success — send them to log in.
        onSuccess: () => navigate("/", { replace: true }),
        onError: (err) => setError(err?.message || "Invalid or expired code."),
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

        {/* Card */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-xl font-bold text-text-primary">
              Verify your email
            </h1>

            <p className="text-sm text-text-secondary">
              We sent a 6-digit code to{" "}
              <strong className="font-semibold text-text-primary">
                {email}
              </strong>
              . It expires in 10 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Error */}
            {error && (
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

                <span>{error}</span>
              </div>
            )}

            {/* OTP */}
            <div>
              <label
                htmlFor="otp"
                className="mb-1.5 block text-sm font-medium text-text-secondary"
              >
                Verification code
              </label>

              <div className="relative">
                <FaKey
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-text-muted
                  "
                />

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="123456"
                  value={otp}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl
                    border border-border-subtle
                    bg-surface-card
                    py-2.5 pl-10 pr-3.5
                    text-sm
                    tracking-[0.4em]
                    text-text-primary
                    placeholder:text-text-muted
                    placeholder:tracking-normal
                    transition
                    focus:border-accent
                    focus:outline-none
                    focus:ring-2
                    focus:ring-accent-light
                  "
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
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
              {isPending ? "Verifying..." : "Verify and create account"}
            </button>
          </form>

          {/* Back */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            <Link
              to="/register"
              className="
                inline-flex items-center gap-1.5
                font-medium
                text-accent
                transition
                hover:text-accent-hover
              "
            >
              <FaArrowLeft className="h-3.5 w-3.5" />
              Back to sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
