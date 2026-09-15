import React from "react";
import CategoriesCard from "../../Card/categoriesCard";
import { useCategories } from "./useCategories";

function Categories() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading categories</p>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoriesCard
            key={cat.category}
            category={{
              name: cat.category,
              slug: cat.category,
              count: cat.count,
              icon: cat.icon,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;