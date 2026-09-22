import React from "react";
import { useNavigate } from "react-router-dom";

function CategoriesCard({ category }) {
  const Icon = category.icon;
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() =>
        navigate(`/shop?category=${category.name.toLowerCase()}`)
      }
      className="group w-full p-6 bg-surface-card rounded-xl border border-border-subtle hover:border-accent hover:shadow-md transition-all text-center cursor-pointer"
    >
      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon
            size={35}
            className="text-text-secondary group-hover:text-accent transition"
          />
        </div>
      )}

      <span className="font-medium text-text-primary group-hover:text-accent block">
        {category.name}
      </span>

      {typeof category.count === "number" && (
        <span className="text-sm text-text-muted">
          {category.count} {category.count === 1 ? "product" : "products"}
        </span>
      )}
    </button>
  );
}

export default CategoriesCard;