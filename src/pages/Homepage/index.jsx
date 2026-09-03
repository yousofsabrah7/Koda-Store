import React from "react";
import DashBoard from "./DashBoard";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useState } from "react";
/* This is the exact rule mentioned earlier as "lifting state up" — 
you lift it up only as far as needed to reach every component that requires it,
 then pass it back down via props to whoever's in between. */
const index = ({ isDark, setIsDark }) => {
    const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      className={`${isDark ? "dark" : ""} bg-surface-base text-text-primary min-h-screen transition-colors`}
    >
        
            <Sidebar isDark={isDark} 
             showSidebar={showSidebar}/>

        <main>
          <Navbar showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
             isDark={isDark} setIsDark={setIsDark}/>

          <section className="pt-3 mt-15 ml-71 max-[1050px]:ml-0">
            <DashBoard isDark={isDark} />
          </section>
        </main>
    </div>
  );
};

export default index;