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
        onSuccess: () => navigate("/login", { replace: true }),
        onError: (err) => setError(err?.message || "Invalid or expired code."),
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
            <h1 className="text-xl font-bold text-gray-900 mb-1">Verify your email</h1>
            <p className="text-sm text-gray-500">
              We sent a 6-digit code to <strong>{email}</strong>. It expires in 10 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-3.5 py-2.5">
                <FaExclamationTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

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
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm tracking-[0.4em] text-gray-700 placeholder:text-gray-400 placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-amber-500 hover:bg-amber-200 disabled:bg-indigo-300 text-white text-sm font-semibold py-2.5 rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
            >
              {isPending ? "Verifying..." : "Verify and create account"}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            <Link to="/register" className="inline-flex items-center gap-1.5 font-medium text-amber-600 hover:text-amber-600 transition">
              <FaArrowLeft className="w-3.5 h-3.5" />
              Back to sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
