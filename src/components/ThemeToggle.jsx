import { IoMoonOutline,IoSunnyOutline  } from "react-icons/io5";

function ThemeToggle({ isDark, setIsDark }) {
  return (
     <button
      onClick={() => setIsDark(!isDark)}
      className={`flex items-center justify-center cursor-pointer rounded-[15px] border px-4 py-3 text-[20px] transition ${
        isDark
          ? "bg-gray-900 border-gray-700 text-white hover:shadow-[0px_3px_5px_0px_rgb(255,255,255)]"
          : "bg-white border-gray-300 text-black hover:shadow-[0px_3px_5px_0px_rgb(1,1,1)]"
      }`}
    >
      {isDark ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  );
}
export default ThemeToggle;