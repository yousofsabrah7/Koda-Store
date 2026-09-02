import React from "react";
import DashBoard from "./DashBoard";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const index = () => {
  return (
    <div className="min-h-screen">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
        <aside className="hidden md:block border-r bg-white">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        <main>
          <Navbar />

          <section className="mt-15">
            <DashBoard />
          </section>
        </main>
      </div>
    </div>
  );
};

export default index;
