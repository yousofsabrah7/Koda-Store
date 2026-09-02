import React from "react";
import DashBoard from "./DashBoard";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

/* This is the exact rule mentioned earlier as "lifting state up" — 
you lift it up only as far as needed to reach every component that requires it,
 then pass it back down via props to whoever's in between. */
const index = ({ isDark, setIsDark }) => {
  return (
    <div className={isDark ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className={`hidden md:block border-r ${isDark ? "bg-gray-900" : "bg-white"}`}>
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar isDark={isDark} />
          </div>
        </aside>

        <main>
          <Navbar isDark={isDark} setIsDark={setIsDark} />

          <section className="mt-15">
            <DashBoard isDark={isDark} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default index;
