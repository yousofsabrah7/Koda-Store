import { StarIcon } from "./Icons";

const RATING_OPTIONS = [4, 3, 2, 1];

export default function FilterSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  priceRange,
  priceBounds,
  onPriceChange,
  minRating,
  onRatingChange,
  onClearAll,
  hasActiveFilters,
}) {
  const handleMinPrice = (e) => {
    const value = Number(e.target.value);
    onPriceChange({ ...priceRange, min: Math.min(value, priceRange.max) });
  };

  const handleMaxPrice = (e) => {
    const value = Number(e.target.value);
    onPriceChange({ ...priceRange, max: Math.max(value, priceRange.min) });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Category
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onToggleCategory(category)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
              />
              <span className="text-sm text-gray-700 capitalize group-hover:text-gray-900 transition">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <label className="text-[11px] text-gray-400 block mb-1">Min</label>
            <input
              type="number"
              min={priceBounds.min}
              max={priceRange.max}
              value={priceRange.min}
              onChange={handleMinPrice}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <span className="text-gray-300 mt-4">—</span>
          <div className="flex-1">
            <label className="text-[11px] text-gray-400 block mb-1">Max</label>
            <input
              type="number"
              min={priceRange.min}
              max={priceBounds.max}
              value={priceRange.max}
              onChange={handleMaxPrice}
              className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={priceRange.max}
          onChange={handleMaxPrice}
          className="w-full accent-indigo-600 cursor-pointer"
        />
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => onRatingChange(0)}
              className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition">
              Any rating
            </span>
          </label>
          {RATING_OPTIONS.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => onRatingChange(rating)}
                className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-400 cursor-pointer"
              />
              <span className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= rating} className="w-3.5 h-3.5" />
                ))}
                <span className="text-xs text-gray-500 ml-1">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
