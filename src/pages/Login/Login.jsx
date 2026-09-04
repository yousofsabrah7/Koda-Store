import { LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-surface-base text-text-primary">
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
          className="text-accent w-7 h-7"
          aria-hidden="true"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
        </svg>
        <h1 className="font-bold text-accent text-2xl font-display">Koda Store</h1>
      </div>

      {/* Welcome & Sign in */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold font-display text-text-primary">Welcome back</h1>
        <p className="font-normal text-text-secondary">Sign in to your account</p>
      </div>

      {/* Form Login */}
      <div className="mt-6 w-full md:w-110 px-6 md:px-0 flex justify-center">
        <form className="h-auto w-full md:w-110 border border-border-subtle bg-surface-card rounded-2xl p-6 flex flex-col gap-4 shadow-xs">
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
              placeholder="you@example.com"
              className="text-sm text-text-primary bg-surface-elevated/50 border border-border-subtle px-10 py-2 rounded-xl focus:border-accent outline-none transition"
            />
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
              placeholder="•••••••••••"
              className="text-sm border border-border-subtle px-10 py-2 rounded-xl text-text-primary bg-surface-elevated/50 focus:border-accent outline-none transition"
            />
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
            <button className="bg-accent hover:bg-accent-hover w-full p-3 rounded-xl text-white font-semibold text-md cursor-pointer transition shadow-sm">
              Sign In
            </button>
          </div>

          {/* Footer Login & Sign Up */}
          <div className="flex justify-center gap-1 items-center">
            <p className="text-text-muted font-normal text-sm">Don't have an account?</p>
            <Link to={"register"} className="text-accent hover:underline font-normal text-sm">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
