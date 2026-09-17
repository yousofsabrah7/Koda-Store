import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

function validate({ email }) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate({ email });
    if (validationErrors.email) {
      setError(validationErrors.email);
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setIsSent(true);
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
          {isSent ? (
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900 mb-4">Check your email</h1>
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600 mb-6">
                If an account exists for <strong>{email}</strong>, we've sent a link to reset your password. Check your inbox (and spam folder).
              </p>
              <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-200 transition">
                <FaArrowLeft className="w-4 h-4" />
                Back to log in
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h1 className="text-xl font-bold text-gray-900 mb-1">Reset your password</h1>
                <p className="text-sm text-gray-500">Enter your email and we'll send you a reset link</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                  <div className="relative">
                    <FaEnvelope className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={`w-full pl-10 pr-3.5 py-2.5 bg-white border rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition ${
                        error ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-300"
                      }`}
                    />
                  </div>
                  {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-200 disabled:bg-indigo-300 text-white text-sm font-semibold py-2.5 rounded-xl transition cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending link..." : "Send reset link"}
                </button>
              </form>

              <p className="text-sm text-gray-500 text-center mt-6">
                <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-amber-600 hover:text-amber-600 transition">
                  <FaArrowLeft className="w-3.5 h-3.5" />
                  Back to log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}