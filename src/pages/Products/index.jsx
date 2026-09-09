// src/pages/products/index.jsx
import { React, useState } from "react";
import StatCard from "../../components/products/statCard";
import { PackageSearch, Plus, Package, Star, TrendingUp, Boxes, Search, SlidersHorizontal, Tags, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../services/apiHooks/productsHook";
import ProductsCard from "../../components/products/productCart";

const staticConfig = [
  { key: "total", icon: Package, label: "Total" },
  { key: "featured", icon: Star, label: "Featured" },
  { key: "inStock", icon: TrendingUp, label: "In Stock" },
  { key: "outOfStock", icon: Boxes, label: "Out Of Stock" },
];

const index = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const { data: response, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="w-[60px] h-[60px] border-[6px] border-accent border-r-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (isError) {
    return <div className="w-[90%]">Wrong</div>;
  }

  const productList = response?.products || [];

  const stats = {
    total: response?.totalProducts ?? productList.length,
    featured: productList.filter((p) => p.featured).length,
    inStock: productList.filter((p) => p.stock > 0).length,
    outOfStock: productList.filter((p) => p.stock === 0).length,
  };

  return (
    <div>
      <div className="products mt-9 pt-6 flex flex-col gap-10 items-center w-[95%] m-auto">

        <div className="product-top flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 w-[90%] bg-surface-elevated rounded-3xl min-h-[140px] px-5 sm:px-8 py-6 border border-border-subtle">
          <div className="div1 flex flex-row items-center gap-4">
            <div className="flex items-center justify-center bg-accent-light rounded-2xl w-[60px] h-[60px] shrink-0 border border-border-subtle">
              <PackageSearch size={28} strokeWidth={1.75} className="text-accent" />
            </div>
            <div>
              <p className="text-accent text-xs sm:text-sm font-semibold tracking-[3px] uppercase">
                Product Dashboard
              </p>
              <h3 className="text-text-primary text-3xl sm:text-4xl font-extrabold leading-tight">
                Products
              </h3>
            </div>
          </div>

          <button
            className="group flex items-center gap-2 bg-accent hover:bg-accent-hover transition-colors text-white font-semibold rounded-2xl px-6 py-3 w-full sm:w-auto justify-center cursor-pointer"
            onClick={() => navigate("/product/new")}
          >
            <Plus
              size={22}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-[90%]">
          {staticConfig.map((item) => (
            <StatCard
              key={item.key}
              icon={item.icon}
              value={stats[item.key]}
              label={item.label}
            />
          ))}
        </div>

        <div className="w-[90%] bg-surface-card rounded-3xl border border-border-subtle p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center flex-1 gap-3 border border-border-subtle rounded-2xl px-4 py-3">
              <Search size={20} className="text-text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none text-text-primary placeholder:text-text-muted bg-transparent"
              />
            </div>

            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium transition-colors shrink-0 cursor-pointer ${
                showFilters
                  ? "bg-accent text-white"
                  : "bg-accent-light text-accent hover:bg-accent/20"
              }`}
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <button className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover transition-colors text-white font-semibold rounded-2xl px-6 py-3 shrink-0 cursor-pointer">
              <Search size={18} />
              Search
            </button>
          </div>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              showFilters ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-border-subtle pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    <Tags size={16} />
                    Category
                  </label>
                  <select
                    defaultValue="all"
                    className="w-full border border-accent rounded-2xl px-4 py-3 outline-none bg-surface-card text-text-primary focus:ring-2 focus:ring-accent-light"
                  >
                    <option value="all">All Categories</option>
                    <option value="electronics">electronics</option>
                    <option value="phones">phones</option>
                    <option value="fashion">fashion</option>
                    <option value="home">home</option>
                    <option value="beauty">beauty</option>
                    <option value="sports">sports</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    <Bookmark size={16} />
                    Subcategory
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. smartphones"
                    className="w-full border border-border-subtle rounded-2xl px-4 py-3 outline-none bg-surface-card text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-accent-light"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-15 w-[90%]">
          <ProductsCard products={productList} />
        </div>
      </div>
    </div>
  );
};

export default index;