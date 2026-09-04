import React from "react";

const Header = ({ title, desc, subtitle, search, addBtn }) => {
  return (
    <div className="border border-border-subtle bg-surface-card text-text-primary p-5 sm:p-6 lg:p-8 flex rounded-3xl shadow-xs justify-between">
      <div className="flex flex-col gap-3">
        <p className="text-accent text-xs tracking-[0.35em] uppercase font-mono font-semibold">
          {title}
        </p>

        <h1 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
          {desc}
        </h1>

        <p className="text-text-secondary text-sm">{subtitle}</p>
      </div>
      <div>
        <div>{search}</div>
        <div>{addBtn}</div>
      </div>
    </div>
  );
};

export default Header;
