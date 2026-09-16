import React from "react";
import CategoriesCard from "../../Card/categoriesCard";
import { useCategories } from "./useCategories";

function Categories() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error loading categories</p>;

  return (
    <div className="mt-4">
      <h2 className="text-center font-bold text-3xl text-text-primary">Shop by Category</h2>
      <p className="text-center tezt-md text-text-muted">Browse our wide range of categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-7">
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
