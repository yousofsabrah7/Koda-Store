import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { PiBellRingingLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

function Navbar({ isDark, setIsDark , showSidebar, setShowSidebar}) {

  return (
    <div>
      {/* <Sidebar open={open} /> */}

      <div
        className="pl-[320px] w-full h-[80px] fixed top-0 z-[5] pt-0 pb-0 pr-[30px] border-b border-border-subtle bg-surface-card/90 text-text-primary backdrop-blur-md flex justify-between items-center max-[1050px]:pl-[10px] max-[1050px]:z-[7] transition-colors"
      >
        <div className="flex items-center gap-[15px]">
          <button
            className="hidden max-[1050px]:block items-center justify-center rounded-[15px] border border-border-subtle bg-surface-elevated text-text-primary hover:border-border-strong px-3 py-[9px] text-[20px] cursor-pointer ml-[10px] transition"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <CiMenuBurger />
          </button>

          <div className="max-[640px]:hidden">
            <h4 className="text-[17px] font-display font-semibold text-text-primary">Koda Dashboard</h4>
            <h5 className="text-[11px] mt-1 font-mono text-text-muted">
              E-Commerce Admin Panel
            </h5>
          </div>
        </div>

        <div className="flex items-center gap-[10px]">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

          <button
            className="flex items-center justify-center cursor-pointer rounded-[15px] border border-border-subtle bg-surface-elevated text-text-primary hover:border-border-strong px-4 py-3 text-[20px] transition"
          >
            <PiBellRingingLight />
          </button>

          <button className="max-[620px]:px-[10px] max-[620px]:py-[10px] flex items-center justify-center rounded-[15px] border border-rose-500/20 bg-rose-600 px-[22px] py-[10px] text-white  transition duration-500 hover:bg-rose-700 cursor-pointer group overflow-hidden">
            <IoIosLogOut className="text-[20px] text-white mr-1" />{" "}
            <h4 className="w-0 invisible group-hover:w-13 group-hover:visible duration-300 ease-linear"> Logout </h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;