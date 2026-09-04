import React, { useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../services/hooksApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { mutateAsync, isPending, isError, error, data, isSuccess } =
    useLogin();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await mutateAsync({
        email,
        password,
      });
      if (response?.user?.role === "admin") {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      {/* Logo & Title */}
      <div className="flex gap-2 items-center -translate-x-2">
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
          className="text-accent w-7 h-7"
          aria-hidden="true"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
        </svg>
        <h1 className="font-bold text-accent text-2xl font-display">
          Koda Store
        </h1>
      </div>

      {/* Welcome & Sign in */}
      <div className="flex flex-col items-center justify-center">
        <p
          className={`text-sm transition duration-300 ease-linear ${isError ? "text-red-400" : isSuccess ? (data.user.role === "admin" ? "text-emerald-500" : "text-red-400") : "text-text-muted"}`}
        >
          {isError
            ? error.message
            : isSuccess
              ? data.user.role === "admin"
                ? "Login successfully"
                : "User not has access to dashboard"
              : "Sign in to your account"}
        </p>
      </div>

      {/* Form Login */}
      <div className="mt-6 w-full md:w-110 px-6 md:px-0 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="h-auto w-full md:w-110 border border-border-subtle bg-surface-card rounded-2xl p-6 flex flex-col gap-4 shadow-xs"
        >
          {/* Input Email */}
          <div className="flex flex-col gap-1 relative justify-center">
            <Mail
              width={17}
              height={15}
              className="absolute top-9 left-3 text-text-muted"
            />
            <label className="text-text-muted text-sm font-medium">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`text-sm text-text-primary bg-surface-elevated/50 border px-10 py-2 rounded-xl outline-none transition ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-border-subtle focus:border-accent"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-0.5">
                {errors.email}
              </span>
            )}
          </div>

          {/* Input Password */}
          <div className="flex flex-col gap-1 relative">
            <LockKeyhole
              width={16}
              height={16}
              className="absolute top-9 left-3 text-text-muted"
            />
            <label className="text-text-muted text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••••"
              className={`text-sm border px-10 py-2 rounded-xl text-text-primary bg-surface-elevated/50 outline-none transition ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-border-subtle focus:border-accent"
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-0.5">
                {errors.password}
              </span>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to={"/forgot-password"}
              className="text-accent hover:underline font-normal text-sm"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button Login */}
          <div>
            <button
              disabled={isPending}
              type="submit"
              className="bg-accent flex items-center justify-center hover:bg-accent-hover w-full p-3 rounded-xl text-white font-semibold text-md cursor-pointer transition shadow-sm disabled:cursor-not-allowed disabled:bg-accent/50"
            >
              {isPending ? (
                <span
                  className={`size-6 block  rounded-full border-4 border-white border-r-transparent ${isPending ? "animate-spin" : ""}`}
                ></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
