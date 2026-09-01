import React, { useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLoginUser } from '../server/hooksApi';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { loginUser } = useLoginUser();
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
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.token);
      navigate('/store'); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center ">
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

      {/* Welcome & Sign in */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="font-normal text-gray-500 ">Sign in to your account</p>
      </div>

      {/* Form Login */}
      <div className="mt-6 w-full md:w-110 px-6 md:px-0 flex justify-center ">
        <form 
          onSubmit={handleSubmit}
          className="h-auto w-full md:w-110 border border-gray-300 rounded-lg p-6 flex flex-col gap-4"
        >
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="absolute top-9 left-3 text-gray-400 "
            />
            <label className="text-gray-400 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to={"/forgot-password"}
              className="text-[#4F46E5] font-normal text-md "
            >
              Forgot password?
            </Link>
          </div>

          {/* Button Login */}
          <div>
            <button 
              type="submit"
              className="bg-[#4F46E5]/90 hover:bg-[#4F46E5] w-full p-3 rounded-lg text-white font-semibold text-md cursor-pointer"
            >
              Sign In
            </button>
          </div>

          {/* Footer Login & Sign Up */}
          <div className="flex justify-center gap-1 items-center">
            <p className="text-gray-500 font-normal">Don't have an account?</p>
            <Link to={"/register"} className="text-[#4F46E5] font-normal">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
