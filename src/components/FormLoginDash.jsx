import { LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../server/hooksApi";
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
    <div className="flex flex-col gap-4  w-full h-full px-10 ">
      <div className="flex justify-center flex-col items-center gap-3">
        <img
          src="https://koda-store-dashboard.vercel.app/assets/KodaLogo2-D3eRgjLV.png"
          width={200}
          className=""
        />
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-white/80">Sign in to your admin dashboard</p>
      </div>
      <form className="" onSubmit={handelSubmit} >
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-1 relative justify-center">
            <Mail
              width={22}
              height={20}
              className="absolute top-11 left-3 text-gray-400"
            />
            <label className="text-white/90">Email Address</label>
            <input
              value={email1}
              type="text"
              className="p-3 px-10 text-white/80 border rounded-2xl border-white/80 focus:outline-none"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email ? (
            <span className="text-red-400/90 text-md">{errors.email}</span>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2 relative">
            <LockKeyhole
              width={27}
              height={20}
              className="absolute top-12 left-2 text-gray-400 "
            />
            <label className="text-white/90">Password</label>

            <input
              value={password1}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="px-10 p-3 text-white/80 border rounded-2xl focus:outline-none border-white/80"
              placeholder="Enter your Password"
            />
            <span className="text-red-400/90 text-md">
              {errors.password ? errors.password : ""}
            </span>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-linear-to-br from-blue-500 to-cyan-500 hover:bg-[#4F46E5] disabled:opacity-70 disabled:cursor-not-allowed w-full p-3 rounded-lg text-white font-semibold text-md cursor-pointer flex items-center justify-center gap-2"
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
        </div>
      </form>
      <div className="flex gap-4  *:text-white/60 *:text-sm">

        <p className="hidden md:block">_______________________________________</p>
        <p className="md:hidden">___________________________</p>
        <p>OR</p>
        <p className="md:hidden">_____________________________</p>
        <p className="hidden md:block">_________________________________________</p>
      </div>
      <div>
        <button className="flex gap-2 justify-center items-center cursor-pointer bg-white/90  bg- w-full p-3 rounded-lg text-black font-bold">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google"
            class="h-5 w-5"
          ></img>
          Continuo with Google
        </button>
      </div>
      <p className="text-center text-white/80">Secure Admin Access</p>
    </div>
  );
}

export default FormLogin;
