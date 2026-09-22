import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaKey,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

import {
  useSendForgotPasswordOTP,
  useVerifyForgotPasswordOTP,
} from "../../services/apiHooks/authHook";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass = (hasError, rightPad = "pr-3.5") =>
  `
    w-full
    rounded-xl
    border
    bg-surface-card
    py-2.5
    pl-10
    ${rightPad}
    text-sm
    text-text-primary
    placeholder:text-text-muted
    transition
    focus:outline-none
    focus:ring-2
    ${
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
        : "border-border-subtle focus:border-accent focus:ring-accent-light"
    }
  `;

const submitClass = `
  w-full
  rounded-xl
  bg-accent
  py-2.5
  text-sm
  font-semibold
  text-white
  transition
  hover:bg-accent-hover
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-accent-light
  disabled:cursor-not-allowed
  disabled:opacity-60
`;

export default function ForgetPassword() {
  const navigate = useNavigate();

  // "email" -> ask for the email
  // "reset" -> ask for the OTP + new password
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    mutate: sendOtp,
    isPending: isSending,
  } = useSendForgotPasswordOTP();

  const {
    mutate: resetPassword,
    isPending: isResetting,
  } = useVerifyForgotPasswordOTP();

  const clearError = (field) =>
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

  const handleSendCode = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrors({
        email: "Email is required.",
      });
      return;
    }

    if (!EMAIL_RE.test(email)) {
      setErrors({
        email: "Enter a valid email address.",
      });
      return;
    }

    sendOtp(
      {
        email: email.trim(),
      },
      {
        onSuccess: () => {
          setErrors({});
          setStep("reset");
        },

        onError: (err) =>
          setErrors({
            email:
              err?.message ||
              "Could not send the code.",
          }),
      }
    );
  };

  const handleResend = () => {
    sendOtp({
      email: email.trim(),
    });
  };

  const handleReset = (e) => {
    e.preventDefault();

    const next = {};

    if (otp.length !== 6) {
      next.otp =
        "Enter the 6-digit code we emailed you.";
    }

    if (!newPassword) {
      next.newPassword =
        "New password is required.";
    } else if (newPassword.length < 8) {
      next.newPassword =
        "Password must be at least 8 characters.";
    }

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    resetPassword(
      {
        email: email.trim(),
        otp,
        newPassword,
      },
      {
        onSuccess: () =>
          navigate("/login", {
            replace: true,
          }),

        onError: (err) =>
          setErrors({
            otp:
              err?.message ||
              "Invalid or expired code.",
          }),
      }
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
            Koda
            <span className="text-accent">
              Store
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-8 shadow-sm">

          {step === "email" ? (
            <>
              {/* Email Step */}
              <div className="mb-6 text-center">
                <h1 className="mb-1 text-xl font-bold text-text-primary">
                  Reset your password
                </h1>

                <p className="text-sm text-text-secondary">
                  Enter your email and we&apos;ll send
                  you a 6-digit code
                </p>
              </div>

              <form
                onSubmit={handleSendCode}
                noValidate
                className="space-y-4"
              >
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
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearError("email");
                      }}
                      autoComplete="email"
                      className={inputClass(
                        errors.email
                      )}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={submitClass}
                >
                  {isSending
                    ? "Sending code..."
                    : "Send code"}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Reset Step */}
              <div className="mb-6 text-center">
                <h1 className="mb-1 text-xl font-bold text-text-primary">
                  Set a new password
                </h1>

                <p className="text-sm text-text-secondary">
                  We sent a code to{" "}
                  <strong className="font-semibold text-text-primary">
                    {email}
                  </strong>
                  . It expires in 10 minutes.
                </p>
              </div>

              <form
                onSubmit={handleReset}
                noValidate
                className="space-y-4"
              >
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
                      onChange={(e) => {
                        setOtp(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 6)
                        );

                        clearError("otp");
                      }}
                      className={inputClass(
                        errors.otp
                      )}
                    />
                  </div>

                  {errors.otp && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.otp}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-1.5 block text-sm font-medium text-text-secondary"
                  >
                    New password
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
                      id="new-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="At least 8 characters"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(
                          e.target.value
                        );

                        clearError("newPassword");
                      }}
                      autoComplete="new-password"
                      className={inputClass(
                        errors.newPassword,
                        "pr-10"
                      )}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
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

                  {errors.newPassword && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isResetting}
                  className={submitClass}
                >
                  {isResetting
                    ? "Updating password..."
                    : "Update password"}
                </button>

                {/* Actions */}
                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="
                      cursor-pointer
                      text-text-secondary
                      transition
                      hover:text-text-primary
                    "
                  >
                    Change email
                  </button>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isSending}
                    className="
                      cursor-pointer
                      font-medium
                      text-accent
                      transition
                      hover:text-accent-hover
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {isSending
                      ? "Sending..."
                      : "Resend code"}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Back to Login */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            <Link
              to="/login"
              className="
                inline-flex items-center gap-1.5
                font-medium
                text-accent
                transition
                hover:text-accent-hover
              "
            >
              <FaArrowLeft className="h-3.5 w-3.5" />
              Back to log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
