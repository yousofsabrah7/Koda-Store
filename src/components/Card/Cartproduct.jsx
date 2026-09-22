import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "../../services/apiHooks/wishlistHook";

import { useAddToCart } from "../../services/apiHooks/cartHooks";

function Cartproduct({ product }) {
  const [addedWishlist, setAddedWishlist] = useState(false);

  // =========================
  // Wishlist
  // =========================

  const { data: wishlistData } = useWishlist();

  const { mutateAsync: addToWishlist, isPending: isAddingWishlist } =
    useAddToWishlist();

  const { mutateAsync: removeFromWishlist, isPending: isRemovingWishlist } =
    useRemoveFromWishlist();

  const isWishlistPending = isAddingWishlist || isRemovingWishlist;

  // =========================
  // Cart
  // =========================

  const { mutateAsync: addToCart, isPending: isAddingToCart } = useAddToCart();

  // =========================
  // Check Wishlist
  // =========================

  useEffect(() => {
    const products = wishlistData?.wishlist?.products ?? [];

    const isInWishlist = products.some((item) => item?.id === product?.id);

    setAddedWishlist(isInWishlist);
  }, [wishlistData, product?.id]);

  // =========================
  // Add Wishlist
  // =========================

  const handleAddWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?.id || isWishlistPending) {
      return;
    }

    try {
      const response = await addToWishlist(product.id);

      if (response?.success) {
        setAddedWishlist(true);
      }
    } catch (error) {
      console.error("Failed to add product to wishlist:", error);
    }
  };

  // =========================
  // Remove Wishlist
  // =========================

  const handleRemoveWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?.id || isWishlistPending) {
      return;
    }

    try {
      const response = await removeFromWishlist(product.id);

      if (response?.success) {
        setAddedWishlist(false);
      }
    } catch (error) {
      console.error("Failed to remove product from wishlist:", error);
    }
  };

  // =========================
  // Toggle Wishlist
  // =========================

  const handleWishlistToggle = (e) => {
    if (addedWishlist) {
      handleRemoveWishlist(e);
    } else {
      handleAddWishlist(e);
    }
  };

  // =========================
  // Add To Cart
  // =========================

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?.id || isAddingToCart) {
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        quantity: 1,
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
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
    <Link
      to={`/shop/${product.id}`}
      className="
        group
        flex w-full
        flex-col
        overflow-hidden
        rounded-3xl
        border border-border-subtle
        bg-surface-card
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* =========================
          Product Image
      ========================= */}

      <div
        className="
          relative
          h-[220px]
          w-full
          overflow-hidden
          bg-surface-elevated
          p-9
          sm:h-[260px]
        "
      >
        {/* Category */}

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

        {/* Discount */}

        {Number(product.discountPercentage) > 0 && (
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
          src={product.image}
          alt={product.shortDescription || "Product"}
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
            addedWishlist ? "Remove from wishlist" : "Add to wishlist"
          }
          disabled={isWishlistPending}
          onClick={handleWishlistToggle}
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            cursor-pointer
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
            hover:scale-105
            hover:bg-accent-light
            disabled:cursor-wait
            disabled:opacity-60
          "
        >
          <FaHeart
            className={addedWishlist ? "text-red-500" : "text-text-muted"}
            size={16}
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
          className="
            min-h-[40px]
            text-sm
            font-bold
            leading-5
            text-text-primary
            transition-colors
            group-hover:text-accent
          "
        >
          {product.shortDescription?.slice(0, 50)}
          {product.shortDescription?.length > 50 ? "..." : ""}
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
            EGP {product.priceAfterDiscount}
          </span>

          {product.priceBeforeDiscount && (
            <span
              className="
                text-sm
                font-medium
                text-text-muted
                line-through
              "
            >
              EGP {product.priceBeforeDiscount}
            </span>
          )}
        </div>

        {/* Add To Cart */}

        <div className="mt-auto flex justify-center pt-1">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="
              flex
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-accent
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              shadow-accent/20
              transition-all
              duration-200
              hover:bg-accent-hover
              hover:shadow-md
              hover:shadow-accent/25
              disabled:cursor-wait
              disabled:opacity-60
            "
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

                <span>Add to cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Cartproduct;
