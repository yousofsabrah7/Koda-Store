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

    onPriceChange({
      ...priceRange,
      min: Math.min(value, priceRange.max),
    });
  };

  const handleMaxPrice = (e) => {
    const value = Number(e.target.value);

    onPriceChange({
      ...priceRange,
      max: Math.max(value, priceRange.min),
    });
  };

  return (
    <aside
      className="
        w-full
        rounded-2xl
        border border-border-subtle
        bg-surface-card
        p-5
        shadow-sm
        transition-colors duration-300
      "
    >
      {/* =========================
          Header
      ========================= */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-text-primary">Filters</h2>

          <p className="mt-0.5 text-xs text-text-muted">Refine your products</p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="
              cursor-pointer
              rounded-md
              px-2 py-1
              text-xs font-semibold
              text-accent
              transition-colors
              hover:bg-accent-light
              hover:text-accent-hover
            "
          >
            Clear all
          </button>
        )}
      </div>

      {/* =========================
          Category
      ========================= */}

      <div className="border-b border-border-subtle pb-6">
        <h3
          className="
            mb-3
            text-[11px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-text-muted
          "
        >
          Category
        </h3>

        <div className="space-y-2">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);

            return (
              <label
                key={category}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-lg
                  px-2
                  py-1.5
                  transition-colors
                  hover:bg-surface-elevated
                "
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleCategory(category)}
                  className="
                    h-4
                    w-4
                    cursor-pointer
                    rounded
                    border-border-strong
                    accent-accent
                    focus:ring-2
                    focus:ring-accent/20
                  "
                />

                <span
                  className={`
                    text-sm
                    capitalize
                    transition-colors
                    ${
                      isSelected
                        ? "font-semibold text-accent"
                        : "text-text-secondary group-hover:text-text-primary"
                    }
                  `}
                >
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* =========================
          Price Range
      ========================= */}

      <div className="border-b border-border-subtle py-6">
        <h3
          className="
            mb-4
            text-[11px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-text-muted
          "
        >
          Price Range
        </h3>

        {/* Price Inputs */}

        <div className="mb-4 flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <label
              htmlFor="min-price"
              className="
                mb-1.5
                block
                text-[11px]
                font-medium
                text-text-muted
              "
            >
              Min
            </label>

            <div className="relative">
              <span
                className="
                  absolute
                  left-2.5
                  top-1/2
                  -translate-y-1/2
                  text-xs
                  text-text-muted
                "
              >
                $
              </span>

              <input
                id="min-price"
                type="number"
                min={priceBounds.min}
                max={priceRange.max}
                value={priceRange.min}
                onChange={handleMinPrice}
                className="
                  w-full
                  rounded-lg
                  border
                  border-border-subtle
                  bg-surface-elevated
                  py-2
                  pl-6
                  pr-2
                  text-sm
                  font-medium
                  text-text-primary
                  outline-none
                  transition-all
                  placeholder:text-text-muted
                  focus:border-accent
                  focus:ring-2
                  focus:ring-accent/15
                "
              />
            </div>
          </div>

          <span className="mb-2 text-text-muted">—</span>

          <div className="min-w-0 flex-1">
            <label
              htmlFor="max-price"
              className="
                mb-1.5
                block
                text-[11px]
                font-medium
                text-text-muted
              "
            >
              Max
            </label>

            <div className="relative">
              <span
                className="
                  absolute
                  left-2.5
                  top-1/2
                  -translate-y-1/2
                  text-xs
                  text-text-muted
                "
              >
                $
              </span>

              <input
                id="max-price"
                type="number"
                min={priceRange.min}
                max={priceBounds.max}
                value={priceRange.max}
                onChange={handleMaxPrice}
                className="
                  w-full
                  rounded-lg
                  border
                  border-border-subtle
                  bg-surface-elevated
                  py-2
                  pl-6
                  pr-2
                  text-sm
                  font-medium
                  text-text-primary
                  outline-none
                  transition-all
                  focus:border-accent
                  focus:ring-2
                  focus:ring-accent/15
                "
              />
            </div>
          </div>
        </div>

        {/* Range */}

        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={priceRange.max}
          onChange={handleMaxPrice}
          aria-label="Maximum price"
          className="
            h-1.5
            w-full
            cursor-pointer
            appearance-none
            rounded-full
            bg-border-strong
            accent-accent
          "
        />

        <div className="mt-2 flex justify-between text-[10px] font-medium text-text-muted">
          <span>${priceBounds.min}</span>
          <span>${priceBounds.max}</span>
        </div>
      </div>

      {/* =========================
          Rating
      ========================= */}

      <div className="pt-6">
        <h3
          className="
            mb-3
            text-[11px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-text-muted
          "
        >
          Minimum Rating
        </h3>

        <div className="space-y-1">
          {/* Any Rating */}

          <label
            className="
              group
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-lg
              px-2
              py-2
              transition-colors
              hover:bg-surface-elevated
            "
          >
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => onRatingChange(0)}
              className="
                h-4
                w-4
                cursor-pointer
                border-border-strong
                accent-accent
                focus:ring-accent
              "
            />

            <span
              className={`
                text-sm
                transition-colors
                ${
                  minRating === 0
                    ? "font-semibold text-accent"
                    : "text-text-secondary group-hover:text-text-primary"
                }
              `}
            >
              Any rating
            </span>
          </label>

          {/* Rating Options */}

          {RATING_OPTIONS.map((rating) => {
            const isSelected = minRating === rating;

            return (
              <label
                key={rating}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  rounded-lg
                  px-2
                  py-2
                  transition-colors
                  hover:bg-surface-elevated
                "
              >
                <input
                  type="radio"
                  name="rating"
                  checked={isSelected}
                  onChange={() => onRatingChange(rating)}
                  className="
                    h-4
                    w-4
                    cursor-pointer
                    border-border-strong
                    accent-accent
                    focus:ring-accent
                  "
                />

                <span className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      filled={star <= rating}
                      className={`
                        h-3.5
                        w-3.5
                        ${isSelected ? "text-accent" : "text-text-muted"}
                      `}
                    />
                  ))}

                  <span
                    className={`
                      ml-1
                      text-xs
                      ${
                        isSelected
                          ? "font-semibold text-accent"
                          : "text-text-muted"
                      }
                    `}
                  >
                    & up
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
