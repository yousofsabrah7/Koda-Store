import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "../../services/apiHooks/wishlistHook";

import { useAddToCart } from "../../services/apiHooks/cartHooks";

function Cartproduct({ product }) {
  const navigate = useNavigate();

  // =========================
  // Product ID
  // =========================

  const productId = product?._id || product?.id;

  // =========================
  // Wishlist
  // =========================

  const { data: wishlistData, isLoading: isWishlistLoading } = useWishlist();

  const { mutateAsync: addToWishlist, isPending: isAddingWishlist } =
    useAddToWishlist();

  const { mutateAsync: removeFromWishlist, isPending: isRemovingWishlist } =
    useRemoveFromWishlist();

  const isWishlistPending = isAddingWishlist || isRemovingWishlist;

  // =========================
  // Wishlist Products
  // =========================

  const wishlistProducts = wishlistData?.wishlist?.products ?? [];

  const isInWishlist = wishlistProducts.some((item) => {
    const itemId =
      item?._id ||
      item?.id ||
      item?.product?._id ||
      item?.product?.id ||
      item?.product ||
      item;

    return String(itemId) === String(productId);
  });

  // =========================
  // Wishlist State
  // =========================

  const [addedWishlist, setAddedWishlist] = useState(null);

  useEffect(() => {
    if (!isWishlistLoading) {
      setAddedWishlist(isInWishlist);
    }
  }, [isInWishlist, isWishlistLoading]);

  const wishlistActive = addedWishlist === null ? isInWishlist : addedWishlist;

  // =========================
  // Cart
  // =========================

  const { mutateAsync: addToCart, isPending: isAddingToCart } = useAddToCart();

  // =========================
  // Wishlist Toggle
  // =========================

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productId || isWishlistPending || isWishlistLoading) {
      return;
    }

    const nextState = !wishlistActive;

    // Optimistic UI
    setAddedWishlist(nextState);

    try {
      if (nextState) {
        await addToWishlist(productId);
      } else {
        await removeFromWishlist(productId);
      }
    } catch (error) {
      // Rollback
      setAddedWishlist(!nextState);

      console.error(
        nextState
          ? "Failed to add product to wishlist:"
          : "Failed to remove product from wishlist:",
        error,
      );
    }
  };

  // =========================
  // Add To Cart
  // =========================

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productId || isAddingToCart) {
      return;
    }

    try {
      await addToCart({
        productId,
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  // =========================
  // Product Details
  // =========================

  const handleViewDetails = () => {
    if (!productId) {
      return;
    }

    navigate(`/shop/${productId}`);
  };

  // =========================
  // Rating
  // =========================

  const rating = Math.min(Math.max(Number(product?.rating) || 0, 0), 5);

  const reviewsCount = Number(product?.reviewsCount) || 0;

  // =========================
  // Render
  // =========================

  return (
    <div
      className="
        group
        flex
        w-full
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-border-subtle
        bg-surface-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* =========================
          Product Image
      ========================= */}

      <div
        onClick={handleViewDetails}
        className="
          relative
          h-[220px]
          w-full
          cursor-pointer
          overflow-hidden
          bg-surface-elevated
          p-9
          sm:h-[260px]
        "
      >
        {/* Category */}

        {product?.category && (
          <span
            className="
              absolute
              left-3
              top-5
              z-10
              rounded-lg
              bg-accent
              px-3
              py-1
              text-xs
              font-semibold
              text-white
              shadow-sm
            "
          >
            {product.category}
          </span>
        )}

        {/* Discount */}

        {Number(product?.discountPercentage) > 0 && (
          <span
            className="
              absolute
              right-14
              top-5
              z-10
              rounded-lg
              bg-accent-light
              px-3
              py-1
              text-xs
              font-bold
              text-accent
            "
          >
            -{product.discountPercentage}%
          </span>
        )}

        {/* Image */}

        <img
          src={
            product?.image ||
            product?.images?.[0]?.url ||
            "https://placehold.co/300x300"
          }
          alt={product?.shortDescription || product?.name || "Product"}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
        />

        {/* Wishlist */}

        <button
          type="button"
          aria-label={
            wishlistActive ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={wishlistActive}
          disabled={!productId || isWishlistPending || isWishlistLoading}
          onClick={handleWishlistToggle}
          className={`
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-border-subtle
            bg-surface-card/90
            shadow-sm
            backdrop-blur-sm
            transition-all
            duration-200
            disabled:cursor-wait
            disabled:opacity-60

            ${
              wishlistActive
                ? "bg-accent-light"
                : "hover:scale-105 hover:bg-accent-light"
            }
          `}
        >
          <FaHeart
            size={16}
            className={wishlistActive ? "text-accent" : "text-text-muted"}
          />
        </button>
      </div>

      {/* =========================
          Product Info
      ========================= */}

      <div
        className="
          flex
          flex-1
          flex-col
          gap-4
          px-5
          py-5
          sm:px-6
        "
      >
        {/* Product Name */}

        <h3
          onClick={handleViewDetails}
          className="
            min-h-[40px]
            cursor-pointer
            text-sm
            font-bold
            leading-5
            text-text-primary
            transition-colors
            group-hover:text-accent
          "
        >
          {product?.shortDescription?.slice(0, 50)}

          {product?.shortDescription?.length > 50 ? "..." : ""}
        </h3>

        {/* Rating */}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={13}
                className={
                  star <= rating ? "text-accent" : "text-border-strong"
                }
              />
            ))}
          </div>

          <span className="text-xs text-text-muted">({reviewsCount})</span>
        </div>

        {/* Price */}

        <div className="flex items-center gap-2">
          <span
            className="
              text-lg
              font-bold
              text-accent
            "
          >
            EGP {Number(product?.priceAfterDiscount).toLocaleString()}
          </span>

          {product?.priceBeforeDiscount && (
            <span
              className="
                text-sm
                font-medium
                text-text-muted
                line-through
              "
            >
              EGP {Number(product.priceBeforeDiscount).toLocaleString()}
            </span>
          )}
        </div>

        {/* Add To Cart */}

        <div className="mt-auto flex justify-center pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!productId || isAddingToCart}
            className={`
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              font-semibold
              transition-all
              duration-200

              ${
                isAddingToCart
                  ? `
                      cursor-wait
                      bg-accent-hover
                      text-white
                      opacity-80
                    `
                  : `
                      cursor-pointer
                      bg-accent
                      text-white
                      shadow-sm
                      shadow-accent/20
                      hover:bg-accent-hover
                      hover:shadow-md
                      hover:shadow-accent/25
                      active:scale-[0.98]
                    `
              }
            `}
          >
            {isAddingToCart ? (
              <>
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                <span>Adding...</span>
              </>
            ) : (
              <>
                <FaShoppingCart size={14} />

                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cartproduct;
