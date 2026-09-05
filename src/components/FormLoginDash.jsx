import { LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/hooksApi";
import { useState } from "react";
function FormLogin() {
  // State
  const [email1, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { mutate, isPending } = useLogin();
  // Navigate
  const navigate = useNavigate();
  // tes vlidation input
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email1.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email1)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password1) {
      newErrors.password = "Password is required";
    } else if (password1.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Submit data
  const handelSubmit = (e) => {
    e.preventDefault();
    const email = email1.trim();
    const password = password1.trim();
    console.log("handelubmit", email, password);
    if (!validate()) return;
    mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-4   h-full px-10 ">
      <div className="flex justify-center flex-col items-center gap-3">
        <img
          src="https://koda-store-dashboard.vercel.app/assets/KodaLogo2-D3eRgjLV.png"
          width={200}
          className=""
        />
        <h1 className="text-3xl font-bold text-text-primary">Welcome Back</h1>
        <p className="text-text-secondary">Sign in to your admin dashboard</p>
      </div>
      <form className="flex flex-col " onSubmit={handelSubmit}>
        <div className="flex flex-col gap-5 items-center lg:items-start">
          <div className="flex flex-col gap-1 w-100 lg:w-full relative justify-center ">
            <Mail
              width={22}
              height={20}
              className="absolute top-11 left-3 text-text-muted"
            />
            <label className="text-text-secondary">Email Address</label>
            <input
              value={email1}
              type="text"
              className="px-10 w-auto p-3 bg-surface-base! text-text-primary border rounded-2xl focus:outline-none focus:border-accent"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email ? (
            <span className="text-red-400/90 text-md">{errors.email}</span>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2 relative w-100 lg:w-full">
            <LockKeyhole
              width={27}
              height={20}
              className="absolute top-12 left-2 text-text-muted "
            />
            <label className="text-text-secondary">Password</label>

            <input
              value={password1}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="px-10 p-3 bg-surface-base! text-text-primary border rounded-2xl focus:outline-none focus:border-accent"
              placeholder="Enter your Password"
            />
            <span className="text-red-400/90 text-md">
              {errors.password ? errors.password : ""}
            </span>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-100 lg:w-full bg-accent hover:bg-accent-hover disabled:opacity-70 disabled:cursor-not-allowed p-3 rounded-lg text-text-primary font-semibold text-md cursor-pointer flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="flex w-100 lg:w-full  gap-3 text-sm text-white/60">
            <div className="flex-1 border-b min-w-0 items-start  border-border-subtle" />
            <p className="shrink-0">OR</p>
            <div className="flex-1 min-w-0   border-b-2  border-border-subtle" />
          </div>
          <div className="w-100 lg:w-full">
            <button
              className="flex w-full
            gap-2 border justify-center items-center cursor-pointer bg-surface-card border-border-subtle p-3 rounded-lg text-text-primary hover:bg-surface-elevated transition font-bold"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="google"
                class="h-5 w-5"
              ></img>
              Continuo with Google
            </button>
          </div>
          <p className="text-center w-full text-text-secondary">
            Secure Admin Access
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
