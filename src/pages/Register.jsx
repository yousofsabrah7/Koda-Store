import React, { useState } from "react";
import { LockKeyhole, Mail, User, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSendRegisterOtp, useVerifyRegisterOtp } from "../server/hooksApi.js";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = form, 2 = OTP
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState("");

  const sendOtpMutation = useSendRegisterOtp();
  const verifyOtpMutation = useVerifyRegisterOtp();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    sendOtpMutation.mutate(
      { name: formData.name, email: formData.email, password: formData.password },
      {
        onSuccess: () => {
          setStep(2);
          setErrors({});
        },
      }
    );
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setOtpError("OTP is required");
      return;
    }
    if (otp.trim().length < 4) {
      setOtpError("Please enter a valid OTP");
      return;
    }

    setOtpError("");
    verifyOtpMutation.mutate(
      { email: formData.email, otp: otp.trim() },
      {
        onSuccess: () => {
          setTimeout(() => navigate("/login"), 1500);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen py-8">
      {/* Logo & Title */}
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#4F46E5] w-7 h-7"
          aria-hidden="true"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
        </svg>
        <h1 className="font-bold text-[#4F46E5] text-2xl">Koda Store</h1>
      </div>

      {/* Welcome & Sign up */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">
          {step === 1 ? "Create an account" : "Verify your email"}
        </h1>
        <p className="font-normal text-gray-500">
          {step === 1
            ? "Sign up to get started"
            : `We sent a code to ${formData.email}`}
        </p>
      </div>

      {/* Form */}
      <div className="mt-6 w-full md:w-110 px-6 md:px-0 flex justify-center">
        {step === 1 ? (
          <form
            onSubmit={handleSendOtp}
            className="h-auto w-full md:w-110 border border-gray-300 rounded-lg p-6 flex flex-col gap-4"
          >
            {/* Input Name */}
            <div className="flex flex-col gap-1 relative justify-center">
              <User
                width={17}
                height={17}
                className="absolute top-9 left-3 text-gray-400"
              />
              <label className="text-gray-400 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`text-sm text-gray-700 border px-10 py-2 rounded-lg outline-none ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#4F46E5] focus:border-2"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-0.5">{errors.name}</span>
              )}
            </div>

            {/* Input Email */}
            <div className="flex flex-col gap-1 relative justify-center">
              <Mail
                width={17}
                height={15}
                className="absolute top-9 left-3 text-gray-400"
              />
              <label className="text-gray-400 text-sm font-medium">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`text-sm text-gray-700 border px-10 py-2 rounded-lg outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#4F46E5] focus:border-2"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-0.5">{errors.email}</span>
              )}
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-1 relative">
              <LockKeyhole
                width={16}
                height={16}
                className="absolute top-9 left-3 text-gray-400"
              />
              <label className="text-gray-400 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="•••••••••••"
                className={`text-sm border px-10 py-2 rounded-lg text-gray-700 outline-none ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#4F46E5] focus:border-2"
                }`}
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-0.5">{errors.password}</span>
              )}
            </div>

            {/* Input Confirm Password */}
            <div className="flex flex-col gap-1 relative">
              <LockKeyhole
                width={16}
                height={16}
                className="absolute top-9 left-3 text-gray-400"
              />
              <label className="text-gray-400 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="•••••••••••"
                className={`text-sm border px-10 py-2 rounded-lg text-gray-700 outline-none ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#4F46E5] focus:border-2"
                }`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-0.5">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Button Register */}
            <div>
              <button
                type="submit"
                disabled={sendOtpMutation.isPending}
                className="bg-[#4F46E5]/90 hover:bg-[#4F46E5] w-full p-3 rounded-lg text-white font-semibold text-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sendOtpMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-center gap-1 items-center">
              <p className="text-gray-500 font-normal">Already have an account?</p>
              <Link to={"/login"} className="text-[#4F46E5] font-normal">
                Sign in
              </Link>
            </div>
          </form>
        ) : (
          /* OTP Step */
          <form
            onSubmit={handleVerifyOtp}
            className="h-auto w-full md:w-110 border border-gray-300 rounded-lg p-6 flex flex-col gap-4"
          >
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-gray-500 text-sm hover:text-[#4F46E5] w-fit transition-colors"
            >
              <ArrowLeft width={16} height={16} />
              Back
            </button>

            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm font-medium">
                Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  if (otpError) setOtpError("");
                }}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className={`text-sm text-gray-700 border px-4 py-2 rounded-lg outline-none text-center tracking-widest font-mono text-lg ${
                  otpError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#4F46E5] focus:border-2"
                }`}
              />
              {otpError && (
                <span className="text-red-500 text-xs mt-0.5">{otpError}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={verifyOtpMutation.isPending}
              className="bg-[#4F46E5]/90 hover:bg-[#4F46E5] w-full p-3 rounded-lg text-white font-semibold text-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {verifyOtpMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify & Create Account"
              )}
            </button>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => sendOtpMutation.mutate({
                  name: formData.name,
                  email: formData.email,
                  password: formData.password
                })}
                disabled={sendOtpMutation.isPending}
                className="text-[#4F46E5] text-sm font-normal hover:underline disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;