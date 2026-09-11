import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ isDark, setIsDark }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`
        min-h-screen
        bg-surface-base
        text-text-primary
        transition-colors
        duration-300
        ${isDark ? "dark" : ""}
      `}
    >
      <Sidebar
        isDark={isDark}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <main>
        <Navbar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isDark={isDark}
          setIsDark={setIsDark}
        />

        <section className="mt-20 lg:ml-71">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
