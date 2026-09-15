import React from "react";

function CategoriesCard({ category }) {
  const Icon = category.icon;

  return (
    <a
      href=""
      className="group p-6 bg-white dark:bg-surface-card rounded-xl border border-surface-border dark:border-slate-700 hover:border-brand-500 hover:shadow-md transition-all text-center"
    >
      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon
            size={35}
            className="text-gray-600 group-hover:text-brand-500 transition"
          />
        </div>
      )}

      <span className="font-medium text-black group-hover:text-brand-500 block">
        {category.name}
      </span>

      {typeof category.count === "number" && (
        <span className="text-sm text-gray-500 dark:text-text-muted">
          {category.count}{" "}
          {category.count === 1 ? "product" : "products"}
        </span>
      )}
    </a>
  );
}

export default CategoriesCard;