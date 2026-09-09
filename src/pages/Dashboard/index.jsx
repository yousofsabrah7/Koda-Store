import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

/* This is the exact rule mentioned earlier as "lifting state up" — 
you lift it up only as far as needed to reach every component that requires it,
 then pass it back down via props to whoever's in between. */
const index = ({ isDark, setIsDark }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`${isDark ? "dark" : ""} bg-surface-base text-text-primary min-h-screen transition-colors`}
    >
      <Sidebar isDark={isDark} showSidebar={showSidebar} />

      <main>
        <Navbar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        <section className="pt-3 mt-17 ml-71 max-[1050px]:ml-0">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default index;
