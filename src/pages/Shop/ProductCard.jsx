import { HeartIcon, StarIcon, CartIcon } from "./Icons";
import { useState } from "react";

export default function ProductCard({ product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const currentPrice = hasDiscount ? product.discountPrice : product.price;
  const oldPrice = hasDiscount ? product.price : null;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = (e) => {
    setIsLiked(!isLiked);
  };



  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group">
      <div>
        {/* Head of card */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium bg-blue-50 text-indigo-600 px-2 py-0.5 rounded-full capitalize">
              {product.category}
            </span>

            {hasDiscount && (
              <span className="text-[11px] font-bold bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded-full">
                -{discountPercent}%
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleLikeToggle}
            className={`p-1.5 rounded-full transition cursor-pointer ${
              isLiked ? "bg-rose-50" : "hover:bg-rose-50"
            }`}
            title="Wishlist"
          >
            <HeartIcon className="w-4 h-4" filled={isLiked} />
          </button>
        </div>

         {/* image */}
        <div
          className="h-44 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 mb-3 cursor-pointer"
          title="Click to view details"
        >
          <img
            src={product.images?.[0]?.url || "https://placehold.co/300x300"}
            alt={product.name}
            className="h-full w-full object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {/* Product name */}
        <h3
          className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1.5 cursor-pointer hover:text-indigo-600 transition"
          title={product.name}
        >
          {product.name}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                filled={star <= Math.round(product.averageRating || 0)}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.numReviews || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-indigo-600">
            EGP {currentPrice.toLocaleString()}
          </span>
          {oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              EGP {oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition duration-150 cursor-pointer shadow-xs"
      >
        <CartIcon className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}
