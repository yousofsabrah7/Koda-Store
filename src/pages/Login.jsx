import { Check } from "lucide-react";
import FormLogin from "../components/FormLoginDash";
function Login() {
  return (
    <div className=" flex justify-center items-center min-h-screen py-10 bg-linear-to-br from-slate-100 via-white to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-black ">
      <div className="md:border w-300 rounded-xl flex ">
        <div className="hidden rounded-l-xl py-25 bg-linear-to-br from-blue-500 to-cyan-500 w-1/2 h-auto md:flex justify-center px-15 gap-8 flex-col">
          <div className="flex gap-3 items-center  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-shopping-bag"
              className="text-white"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h1 className="text-white font-bold text-3xl">Koda Commerce</h1>
          </div>
          <h1 className="text-5xl font-bold text-white">
            Manage Your Store Like a Pro
          </h1>
          <p className="text-white/80">
            Control products, orders, users, carts and analytics from a modern
            dashboard experience.
          </p>
          <ul className="flex flex-col gap-3 *:flex *:gap-2 *:border  *:rounded-lg *:p-3 *:bg-white/20 *:border-white/20">
            <li>
              <Check className="text-white" />
              <p className="text-white">Product Management</p>
            </li>
            <li>
              <Check className="text-white" />
              <p className="text-white">Order Tracking</p>
            </li>
            <li>
              <Check className="text-white" />
              <p className="text-white">Customer Insights</p>
            </li>
          </ul>
        </div>
        <div className="bg-linear-to-b  w-115 mx-auto  from-[#172B4D] to-[#0F4C81] md:w-1/2 py-15 rounded-xl md:rounded-l-none md:rounded-r-xl">
            <FormLogin  />
        </div>
      </div>
    </div>
  );
}

export default Login;