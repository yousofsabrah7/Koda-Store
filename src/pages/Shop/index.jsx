import { useState, useMemo, useEffect } from "react";
import { mockProducts } from "../../components/data/mockProducts";
import { useProducts } from "../../services/apiHooks/productsHook";
import ProductGrid from "../../components/shop/ProductGrid";
import SearchBar from "../../components/shop/SearchBar";
import FilterSidebar from "../../components/shop/FilterSidebar";
import ActiveFilterChips from "../../components/shop/ActiveFilterChips";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../services/apiHooks/cartHooks";
import { useWishlist } from "../../services/apiHooks/wishlistHook";

const ITEMS_PER_PAGE = 12;

function getEffectivePrice(product) {
  return product.discountPrice && product.discountPrice < product.price
    ? product.discountPrice
    : product.price;
}

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const { data, isLoading } = useProducts(1, 50);
  const products = data?.products || [];
  const { isLoading: isCartLoading } = useCart();
  const { isLoading: isWishlistLoading } = useWishlist();

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  );

  const priceBounds = useMemo(() => {
    const prices = products.map(getEffectivePrice);
    return {
      min: prices.length ? Math.floor(Math.min(...prices)) : 0,
      max: prices.length ? Math.ceil(Math.max(...prices)) : 1000,
    };
  }, [products]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(priceBounds);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    }
  }, [categoryFromUrl]);

  ////
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategories, priceRange, minRating, sortBy]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = products.filter((product) => {
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
          (a, b) => getEffectivePrice(a) - getEffectivePrice(b),
        );
        break;
      case "price-desc":
        result = [...result].sort(
          (a, b) => getEffectivePrice(b) - getEffectivePrice(a),
        );
        break;
      case "rating":
        result = [...result].sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
        );
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategories,
    priceRange,
    minRating,
    sortBy,
  ]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
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

  if (isLoading || isCartLoading || isWishlistLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="relative mb-4 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center animate-pulse">
            <span className="text-2xl">🛒</span>
          </div>
          <div className="absolute -inset-2 border-2 border-accent/20 border-t-accent rounded-2xl animate-spin"></div>
        </div>
        <h2 className="text-base font-bold text-text-primary mb-1">
          Loading Products...
        </h2>
        <p className="text-xs text-text-muted">
          Fetching our latest products for you
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* //////////////////// */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">Shop</h1>
          <p className="text-sm text-text-muted">
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
              className="lg:hidden px-4 py-2.5 bg-surface-card border border-border-subtle rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-elevated transition cursor-pointer"
            >
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-surface-card border border-border-strong rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-elevated transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-100"
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
              <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface-card p-5 overflow-y-auto shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-text-primary">
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
              onLoadMore={() =>
                setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
