import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { PiBellRingingLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import Sidebar from "../sidebar/Sidebar";

function Navbar({ isDark, setIsDark }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* <Sidebar open={open} /> */}

      <div className={`pl-[320px] w-full h-[80px] fixed top-0 z-[5] pt-0 pb-0 pr-[30px] border-b flex justify-between items-center max-[1050px]:pl-[10px] max-[1050px]:z-[7] ${
        isDark ? "bg-gray-900 text-white border-gray-700" : "bg-white text-black border-gray-200"
      }`}>
        <div className="flex items-center gap-[15px]">
          <button
            className={`hidden max-[1050px]:block items-center justify-center rounded-[15px] border px-3 py-[9px] text-[20px] cursor-pointer ml-[10px] hover:shadow-[0px_3px_5px_0px_rgb(233,232,232)] ${
              isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-black"
            }`}
            onClick={() => setOpen(!open)}
          >
            <CiMenuBurger />
          </button>

          <div className="max-[640px]:hidden">
            <h4 className="text-[17px]">Koda Dashboard</h4>
            <h5 className={`text-[11px] mt-1 ${isDark ? "text-gray-400" : "text-[#8ba0a6]"}`}>E-Commerce Admin Panel</h5>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

        <button className={`flex items-center justify-center cursor-pointer rounded-[15px] border px-4 py-3 text-[20px] ${
  isDark
    ? "bg-gray-900 border-gray-700 text-white hover:shadow-[0px_3px_5px_0px_rgb(255,255,255)]"
    : "bg-white border-gray-300 text-black hover:shadow-[0px_3px_5px_0px_rgb(1,1,1)]"
}`}>
  <PiBellRingingLight />
</button>

          <button className={`max-[820px]:hidden rounded-[15px] border px-[60px] py-[30px] ${
            isDark ? "bg-gray-900 border-gray-700 hover:shadow-[0px_3px_5px_0px_rgb(255,255,255)] " : "bg-white border-gray-300 hover:shadow-[0px_3px_5px_0px_rgb(1,1,1)]"
          }`}></button>

          <button className="max-[620px]:px-[10px] max-[620px]:py-[10px] flex items-center justify-center rounded-[15px] border border-gray-300 bg-red-600 px-[22px] py-[10px] text-white mr-5 transition duration-500 hover:bg-[#bc0101]">
            <IoIosLogOut className="text-[20px] text-white mr-1" /> <h4> Logout </h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;