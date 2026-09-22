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
  `w-full pl-10 ${rightPad} py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
    hasError
      ? "border-red-300 focus:ring-red-100"
      : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
  }`;

const submitClass =
  "w-full bg-amber-500 hover:bg-amber-200 disabled:bg-indigo-300 text-white text-sm font-semibold py-2.5 rounded-xl transition cursor-pointer disabled:cursor-not-allowed";

export default function ForgetPassword() {
  const navigate = useNavigate();

  // "email" -> ask for the email, "reset" -> ask for the OTP + new password
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { mutate: sendOtp, isPending: isSending } = useSendForgotPasswordOTP();
  const { mutate: resetPassword, isPending: isResetting } =
    useVerifyForgotPasswordOTP();

  const clearError = (field) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSendCode = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrors({ email: "Email is required." });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setErrors({ email: "Enter a valid email address." });
      return;
    }

    sendOtp(
      { email: email.trim() },
      {
        onSuccess: () => {
          setErrors({});
          setStep("reset");
        },
        onError: (err) =>
          setErrors({ email: err?.message || "Could not send the code." }),
      },
    );
  };

  const handleResend = () => {
    sendOtp({ email: email.trim() });
  };

  const handleReset = (e) => {
    e.preventDefault();

    const next = {};
    if (otp.length !== 6) next.otp = "Enter the 6-digit code we emailed you.";
    if (!newPassword) {
      next.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      next.newPassword = "Password must be at least 8 characters.";
    }
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    resetPassword(
      { email: email.trim(), otp, newPassword },
      {
        onSuccess: () => navigate("/login", { replace: true }),
        onError: (err) =>
          setErrors({ otp: err?.message || "Invalid or expired code." }),
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
            Koda<span className="text-amber-500">Store</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {step === "email" ? (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900 mb-1">Reset your password</h1>
                <p className="text-sm text-gray-500">Enter your email and we'll send you a 6-digit code</p>
              </div>

              <form onSubmit={handleSendCode} noValidate className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                  <div className="relative">
                    <FaEnvelope className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearError("email");
                      }}
                      autoComplete="email"
                      className={inputClass(errors.email)}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                </div>

                <button type="submit" disabled={isSending} className={submitClass}>
                  {isSending ? "Sending code..." : "Send code"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900 mb-1">Set a new password</h1>
                <p className="text-sm text-gray-500">
                  We sent a code to <strong>{email}</strong>. It expires in 10 minutes.
                </p>
              </div>

              <form onSubmit={handleReset} noValidate className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Verification code</label>
                  <div className="relative">
                    <FaKey className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                        clearError("otp");
                      }}
                      className={inputClass(errors.otp)}
                    />
                  </div>
                  {errors.otp && <p className="text-xs text-red-500 mt-1.5">{errors.otp}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">New password</label>
                  <div className="relative">
                    <FaLock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        clearError("newPassword");
                      }}
                      autoComplete="new-password"
                      className={inputClass(errors.newPassword, "pr-10")}
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
                  {errors.newPassword && <p className="text-xs text-red-500 mt-1.5">{errors.newPassword}</p>}
                </div>

                <button type="submit" disabled={isResetting} className={submitClass}>
                  {isResetting ? "Updating password..." : "Update password"}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isSending}
                    className="font-medium text-amber-600 hover:text-amber-600 disabled:opacity-50 cursor-pointer"
                  >
                    {isSending ? "Sending..." : "Resend code"}
                  </button>
                </div>
              </form>
            </>
          )}

          <p className="text-sm text-gray-500 text-center mt-6">
            <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-amber-600 hover:text-amber-600 transition">
              <FaArrowLeft className="w-3.5 h-3.5" />
              Back to log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
