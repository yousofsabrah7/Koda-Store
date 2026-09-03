import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

function ThemeToggle({ isDark, setIsDark }) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="flex items-center justify-center cursor-pointer rounded-[15px] border border-border-subtle bg-surface-elevated text-text-primary hover:border-border-strong px-4 py-3 text-[20px] transition"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <IoSunnyOutline className="text-amber-400" /> : <IoMoonOutline />}
    </button>
  );
}

export default ThemeToggle;
