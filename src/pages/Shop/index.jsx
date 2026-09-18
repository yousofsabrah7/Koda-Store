import { useState, useMemo, useEffect } from "react";
import { mockProducts } from "../../components/data/mockProducts";
import ProductGrid from "../Shop/ProductGrid";
import SearchBar from "../Shop/SearchBar";
import FilterSidebar from "../Shop/FilterSidebar";
import ActiveFilterChips from "../Shop/ActiveFilterChips";

const ITEMS_PER_PAGE = 12;

function getEffectivePrice(product) {
  return product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
}

export default function ShopPage() {
  const categories = useMemo(
    () => [...new Set(mockProducts.map((p) => p.category))],
    []
  );

  const priceBounds = useMemo(() => {
    const prices = mockProducts.map(getEffectivePrice);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(priceBounds);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  ////
   useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategories, priceRange, minRating, sortBy]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = mockProducts.filter((product) => {
      const price = getEffectivePrice(product);

      const matchesSearch =
        query === "" || product.name.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice = price >= priceRange.min && price <= priceRange.max;

      const matchesRating = (product.averageRating || 0) >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort(
          (a, b) => getEffectivePrice(a) - getEffectivePrice(b)
        );
        break;
      case "price-desc":
        result = [...result].sort(
          (a, b) => getEffectivePrice(b) - getEffectivePrice(a)
        );
        break;
      case "rating":
        result = [...result].sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, minRating, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange(priceBounds);
    setMinRating(0);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    minRating > 0 ||
    priceRange.min !== priceBounds.min ||
    priceRange.max !== priceBounds.max;

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      {/* //////////////////// */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Shop</h1>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

       {/* ///////////////////// */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

      {/* //////////////  */}
        <ActiveFilterChips
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          selectedCategories={selectedCategories}
          onRemoveCategory={toggleCategory}
          minRating={minRating}
          onClearRating={() => setMinRating(0)}
          priceRange={priceRange}
          priceBounds={priceBounds}
          onClearPrice={() => setPriceRange(priceBounds)}
          hasActiveFilters={hasActiveFilters}
          onClearAll={clearAllFilters}
        />

        <div className="flex gap-8 mt-4">
         {/* /////////////// */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              priceRange={priceRange}
              priceBounds={priceBounds}
              onPriceChange={setPriceRange}
              minRating={minRating}
              onRatingChange={setMinRating}
              onClearAll={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </aside>

         {/* ////// */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white p-5 overflow-y-auto shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
                    aria-label="Close filters"
                  >
                    ✕
                  </button>
                </div>
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onToggleCategory={toggleCategory}
                  priceRange={priceRange}
                  priceBounds={priceBounds}
                  onPriceChange={setPriceRange}
                  minRating={minRating}
                  onRatingChange={setMinRating}
                  onClearAll={clearAllFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
            </div>
          )}
{/* 
         ////////// */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={displayedProducts}
              hasMore={hasMore}
              onLoadMore={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
