import { LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center ">
      {/* Logo & Tilte */}
      <div className="flex gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="text-[#4F46E5] w-7 h-7"
          aria-hidden="true"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
        </svg>
        <h1 className="font-bold text-[#4F46E5] text-2xl">Koda Store</h1>
      </div>
      {/* Welcom & Sign in */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">Welcome back</h1>
        <p className="font-normal text-gray-500 ">Sign in to your account</p>
      </div>
      {/* Form Login */}
      <div className="mt-6 w-full md:w-110 px-6   md:px-0 flex justify-center ">
        <form className="h-auto w-full  md:w-110 border border-gray-300 rounded-lg  p-6 flex flex-col gap-4">
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
              placeholder="you@example.com"
              className="text-sm text-gray-700 border px-10 py-2 rounded-lg border-gray-300 focus:border-[#4F46E5] focus:border-2 outline-none"
            />
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
              placeholder="•••••••••••"
              className="text-sm border px-10 py-2 rounded-lg border-gray-300 text-gray-700 focus:border-[#4F46E5] focus:border-2 outline-none"
            />
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
            <button className="bg-[#4F46E5]/90  hover:bg-[#4F46E5] w-full p-3 rounded-lg text-white font-semibold text-md">
              Sign In
            </button>
          </div>
          {/* Footer Login & Sign Up */}
          <div className="flex justify-center gap-1 items-center">
            <p className="text-gray-500 font-normal">Don't have an account?</p>
            <Link to={"register"} className="text-[#4F46E5] font-normal">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
