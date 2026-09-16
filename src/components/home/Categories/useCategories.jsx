import { useMemo } from "react";
import { useProducts } from "../../../services/apiHooks/productsHook";
import {
  Smartphone,
  Laptop,
  Watch,
  Package,
  CircuitBoard,
} from "lucide-react";

const categoryIcons = {
  phones: Smartphone,
  electronics: CircuitBoard ,
  laptops: Laptop,
  watches: Watch,
};

export const useCategories = () => {
  const { data, isLoading, error } = useProducts(1, 1000, "", {});

  const categories = useMemo(() => {
    const products = data?.products || [];

    const countsMap = products.reduce((acc, product) => {
      const category = product.category || "uncategorized";

      acc[category] = (acc[category] || 0) + 1;

      return acc;
    }, {});

    return Object.entries(countsMap)
      .map(([category, count]) => ({
        category,
        count,
        icon: categoryIcons[category.toLowerCase()] || Package,
      }))
      .sort((a, b) => b.count - a.count);
  }, [data]);

  return { data: categories, isLoading, error };
};