import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

import {
  useProduct,
  useProducts,
} from "../../services/apiHooks/productsHook";

import { useAddToCart } from "../../services/apiHooks/cartHooks";

import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "../../services/apiHooks/wishlistHook";

import {
  useAddReview,
  useProductReviews,
} from "../../services/apiHooks/reviewsHook";

import Loading from "../../components/home/HandelLoading/Loading";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // =========================================================
  // PRODUCT
  // =========================================================

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data, isError, isLoading } = useProduct(id);

  const product = data?.product;

  // =========================================================
  // RELATED PRODUCTS
  // =========================================================

  const { data: relatedData, isLoading: relatedLoading } = useProducts(
    1,
    4,
    "",
    {
      category: product?.category,
    },
    !!product,
  );

  // =========================================================
  // CART
  // =========================================================

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  // =========================================================
  // WISHLIST
  // =========================================================

  const { data: wishlistData } = useWishlist();

  const { mutate: addToWishlist, isPending: isAdding } =
    useAddToWishlist();

  const { mutate: removeFromWishlist, isPending: isRemoving } =
    useRemoveFromWishlist();

  // =========================================================
  // REVIEWS
  // =========================================================

  const { data: reviewsData, isLoading: reviewsLoading } =
    useProductReviews(id);

  const { mutate: addReview, isPending: isAddingReview } = useAddReview(id);

  // =========================================================
  // EMBLA
  // =========================================================

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  // =========================================================
  // QUANTITY
  // =========================================================

  const [quantity, setQuantity] = useState(() => {
    const savedQuantity = localStorage.getItem(`quantity.${id}`);
    const parsedQuantity = Number(savedQuantity);

    if (!Number.isFinite(parsedQuantity) || parsedQuantity < 1) {
      return 1;
    }

    return Math.floor(parsedQuantity);
  });

  // =========================================================
  // REVIEW FORM
  // =========================================================

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // =========================================================
  // SAVE QUANTITY
  // =========================================================

  useEffect(() => {
    localStorage.setItem(`quantity.${id}`, quantity);
  }, [id, quantity]);

  // =========================================================
  // SCROLL TOP
  // =========================================================

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // =========================================================
  // EMBLA SELECT
  // =========================================================

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // =========================================================
  // PREVIOUS IMAGE
  // =========================================================

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
  }, [emblaApi]);

  // =========================================================
  // NEXT IMAGE
  // =========================================================

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
  }, [emblaApi]);

  // =========================================================
  // SCROLL TO IMAGE
  // =========================================================

  const scrollToImage = useCallback(
    (index) => {
      if (!emblaApi) return;

      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  // =========================================================
  // DATA
  // =========================================================

  const reviews = reviewsData?.reviews || [];

  const wishlistProducts = wishlistData?.wishlist?.products || [];

  const relatedProducts = (relatedData?.products || []).filter(
    (item) => item._id !== product?._id,
  );

  const isInWishlist = wishlistProducts.some(
    (item) => item._id === product?._id,
  );

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return <Loading />;
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-base px-4">
        <h1 className="text-center text-lg font-semibold text-text-primary">
          There is an error
        </h1>
      </div>
    );
  }

  // =========================================================
  // NO PRODUCT
  // =========================================================

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-base px-4">
        <h1 className="text-center text-lg font-semibold text-text-primary">
          There is no product
        </h1>
      </div>
    );
  }

  // =========================================================
  // PRODUCT IMAGES
  // =========================================================

  const images = Array.isArray(product.images) ? product.images : [];

  // =========================================================
  // PRICE
  // =========================================================

  const hasDiscount =
    Number(product.discountPrice) > 0 &&
    product.discountPrice < product.price;

  const finalPrice = hasDiscount
    ? product.discountPrice
    : product.price;

  const discountPercent =
    hasDiscount && Number(product.price) > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  // =========================================================
  // RATING
  // =========================================================

  const rating = Math.round(product.averageRating || 0);

  // =========================================================
  // SUBMIT REVIEW
  // =========================================================

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (reviewRating === 0) {
      return;
    }

    addReview(
      {
        rating: reviewRating,
        comment: reviewComment.trim(),
      },
      {
        onSuccess: () => {
          setReviewRating(0);
          setReviewComment("");
        },
      },
    );
  };

  // =========================================================
  // RELATED PRODUCT
  // =========================================================

  const handleRelatedProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  // =========================================================
  // QUANTITY HANDLERS
  // =========================================================

  const handleDecreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    );
  };

  const handleIncreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.min(product.stock, currentQuantity + 1),
    );
  };

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = () => {
    if (product.stock <= 0 || isAddingToCart) {
      return;
    }

    addToCart(
      {
        productId: product._id,
        quantity,
      },
      {
        onSuccess: () => {
          setQuantity(1);
        },
      },
    );
  };

  // =========================================================
  // WISHLIST
  // =========================================================

  const handleWishlist = () => {
    if (isAdding || isRemoving) {
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-surface-base text-text-primary transition-colors duration-300">
      {/* =========================================================
          PRODUCT DETAILS
      ========================================================= */}

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        {/* =======================================================
            BREADCRUMB
        ======================================================= */}

        <div className="mb-8 flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              cursor-pointer
              text-text-muted
              transition-colors
              hover:text-accent
            "
          >
            Shop
          </button>

          <span className="text-text-muted">/</span>

          <span className="truncate font-medium text-text-secondary">
            {product.name}
          </span>
        </div>

        {/* =======================================================
            MAIN PRODUCT CARD
        ======================================================= */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-border-subtle
            bg-surface-card
            shadow-sm
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* ===================================================
                LEFT — IMAGE GALLERY
            =================================================== */}

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Main Image */}

              <div className="group relative overflow-hidden rounded-2xl">
                <div
                  ref={emblaRef}
                  className="overflow-hidden rounded-2xl"
                >
                  <div className="flex">
                    {images.length > 0 ? (
                      images.map((img, index) => (
                        <div
                          key={
                            img.public_id ||
                            img._id ||
                            img.url ||
                            `image-${index}`
                          }
                          className="min-w-0 flex-[0_0_100%]"
                        >
                          <div
                            className="
                              flex
                              h-[360px]
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-2xl
                              bg-surface-elevated
                              sm:h-[440px]
                            "
                          >
                            <img
                              src={img.url}
                              alt={`${product.name} ${index + 1}`}
                              className="
                                h-full
                                w-full
                                object-contain
                                p-6
                                transition-transform
                                duration-500
                                group-hover:scale-[1.02]
                              "
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="
                          flex
                          h-[360px]
                          w-full
                          items-center
                          justify-center
                          rounded-2xl
                          bg-surface-elevated
                          text-sm
                          text-text-muted
                          sm:h-[440px]
                        "
                      >
                        No image available
                      </div>
                    )}
                  </div>
                </div>

                {/* Previous */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={scrollPrev}
                    aria-label="Previous image"
                    className="
                      absolute
                      left-4
                      top-1/2
                      flex
                      h-10
                      w-10
                      -translate-y-1/2
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border-subtle
                      bg-surface-card/90
                      text-lg
                      text-text-primary
                      opacity-0
                      shadow-md
                      backdrop-blur-sm
                      transition-all
                      duration-200
                      hover:bg-accent
                      hover:text-white
                      group-hover:opacity-100
                    "
                  >
                    ‹
                  </button>
                )}

                {/* Next */}

                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={scrollNext}
                    aria-label="Next image"
                    className="
                      absolute
                      right-4
                      top-1/2
                      flex
                      h-10
                      w-10
                      -translate-y-1/2
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border-subtle
                      bg-surface-card/90
                      text-lg
                      text-text-primary
                      opacity-0
                      shadow-md
                      backdrop-blur-sm
                      transition-all
                      duration-200
                      hover:bg-accent
                      hover:text-white
                      group-hover:opacity-100
                    "
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Thumbnails */}

              {images.length > 1 && (
                <div className="mt-5 flex items-center gap-3 overflow-x-auto pb-1">
                  {images.map((img, index) => (
                    <button
                      type="button"
                      key={
                        img.public_id ||
                        img._id ||
                        img.url ||
                        `thumbnail-${index}`
                      }
                      onClick={() => scrollToImage(index)}
                      aria-label={`View image ${index + 1}`}
                      className={`
                        h-16
                        w-16
                        shrink-0
                        cursor-pointer
                        overflow-hidden
                        rounded-xl
                        border-2
                        bg-surface-elevated
                        transition-all
                        duration-200
                        sm:h-20
                        sm:w-20
                        ${
                          index === selectedIndex
                            ? "border-accent shadow-sm"
                            : "border-border-subtle hover:border-border-strong"
                        }
                      `}
                    >
                      <img
                        src={img.url}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Counter */}

              {images.length > 1 && (
                <p className="mt-3 text-center text-sm text-text-muted">
                  {selectedIndex + 1} / {images.length}
                </p>
              )}
            </div>

            {/* ===================================================
                RIGHT — PRODUCT INFO
            =================================================== */}

            <div
              className="
                flex
                flex-col
                border-t
                border-border-subtle
                p-6
                sm:p-8
                lg:border-l
                lg:border-t-0
                lg:p-10
              "
            >
              {/* Brand + Category */}

              <div className="mb-5 flex flex-wrap items-center gap-2">
                {product.brand && (
                  <span
                    className="
                      rounded-full
                      bg-accent-light
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-accent
                    "
                  >
                    {product.brand}
                  </span>
                )}

                {product.category && (
                  <span
                    className="
                      rounded-full
                      bg-surface-elevated
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-text-secondary
                    "
                  >
                    {product.category}
                  </span>
                )}
              </div>

              {/* Product Name */}

              <h1
                className="
                  text-2xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-text-primary
                  sm:text-3xl
                "
              >
                {product.name}
              </h1>

              {/* Rating */}

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= rating
                          ? "text-accent"
                          : "text-border-strong"
                      }
                    />
                  ))}
                </div>

                <span className="text-sm text-text-muted">
                  {product.numReviews || 0} reviews
                </span>
              </div>

              <div className="my-6 h-px bg-border-subtle" />

              {/* Price */}

              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    text-accent
                  "
                >
                  EGP {Number(finalPrice || 0).toLocaleString()}
                </span>

                {hasDiscount && (
                  <>
                    <span
                      className="
                        text-base
                        font-medium
                        text-text-muted
                        line-through
                      "
                    >
                      EGP {Number(product.price || 0).toLocaleString()}
                    </span>

                    <span
                      className="
                        rounded-lg
                        bg-accent-light
                        px-2.5
                        py-1
                        text-xs
                        font-bold
                        text-accent
                      "
                    >
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}

              <div className="mt-5">
                {product.stock > 0 ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-accent-light
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      text-accent
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    IN STOCK
                  </span>
                ) : (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-surface-elevated
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      text-text-muted
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-text-muted" />
                    NOT AVAILABLE RIGHT NOW
                  </span>
                )}
              </div>

              {/* Description */}

              <p
                className="
                  mt-6
                  text-sm
                  leading-7
                  text-text-secondary
                "
              >
                {product.shortDescription}
              </p>

              {/* Quantity */}

              <div className="mt-7">
                <p
                  className="
                    mb-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-text-muted
                  "
                >
                  Quantity
                </p>

                <div
                  className="
                    inline-flex
                    items-center
                    overflow-hidden
                    rounded-xl
                    border
                    border-border-subtle
                    bg-surface-elevated
                  "
                >
                  {/* Decrease */}

                  <button
                    type="button"
                    onClick={handleDecreaseQuantity}
                    disabled={product.stock === 0}
                    aria-label="Decrease quantity"
                    className="
                      flex
                      h-10
                      w-10
                      cursor-pointer
                      items-center
                      justify-center
                      text-lg
                      font-medium
                      text-text-secondary
                      transition-colors
                      hover:bg-accent-light
                      hover:text-accent
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    −
                  </button>

                  {/* Quantity Value */}

                  <span
                    className="
                      flex
                      h-10
                      min-w-12
                      items-center
                      justify-center
                      border-x
                      border-border-subtle
                      bg-surface-card
                      text-sm
                      font-bold
                      text-text-primary
                    "
                  >
                    {product.stock === 0 ? 0 : quantity}
                  </span>

                  {/* Increase */}

                  <button
                    type="button"
                    onClick={handleIncreaseQuantity}
                    disabled={
                      product.stock === 0 ||
                      quantity >= product.stock
                    }
                    aria-label="Increase quantity"
                    className="
                      flex
                      h-10
                      w-10
                      cursor-pointer
                      items-center
                      justify-center
                      text-lg
                      font-medium
                      text-text-secondary
                      transition-colors
                      hover:bg-accent-light
                      hover:text-accent
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}

              <div className="mt-7 flex gap-3">
                {/* Add To Cart */}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAddingToCart}
                  className={`
                    flex
                    flex-1
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    ${
                      product.stock === 0
                        ? "cursor-not-allowed bg-border-strong"
                        : "bg-accent hover:bg-accent-hover hover:shadow-md"
                    }
                  `}
                >
                  {product.stock === 0
                    ? "Not Available"
                    : isAddingToCart
                      ? "Adding..."
                      : "Add to Cart"}
                </button>

                {/* Wishlist */}

                <button
                  type="button"
                  onClick={handleWishlist}
                  disabled={isAdding || isRemoving}
                  aria-label={
                    isInWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-border-subtle
                    bg-surface-elevated
                    transition-all
                    duration-200
                    hover:border-accent
                    hover:bg-accent-light
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {isInWishlist ? (
                    <FaHeart className="text-accent" />
                  ) : (
                    <FaRegHeart className="text-text-muted" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            REVIEWS
        ========================================================= */}

        <section className="mt-10">
          {/* Reviews Header */}

          <div className="mb-6">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                text-accent
              "
            >
              Customer Feedback
            </p>

            <div className="mt-1 flex items-center justify-between gap-4">
              <h2
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-text-primary
                "
              >
                Reviews
              </h2>

              <span
                className="
                  rounded-full
                  bg-accent-light
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-accent
                "
              >
                {product.numReviews || 0} reviews
              </span>
            </div>
          </div>

          {/* Write Review */}

          <form
            onSubmit={handleSubmitReview}
            className="
              rounded-2xl
              border
              border-border-subtle
              bg-surface-card
              p-5
              shadow-sm
              sm:p-6
            "
          >
            <h3
              className="
                text-sm
                font-bold
                text-text-primary
              "
            >
              Leave a review
            </h3>

            <p
              className="
                mt-1
                text-xs
                text-text-muted
              "
            >
              Share your experience with this product.
            </p>

            {/* Rating */}

            <div className="mt-5">
              <p
                className="
                  mb-2
                  text-xs
                  font-semibold
                  text-text-secondary
                "
              >
                Your rating
              </p>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    aria-label={`Rate ${star} out of 5`}
                    className="cursor-pointer p-0.5"
                  >
                    <FaStar
                      className={`
                        text-xl
                        transition-colors
                        ${
                          star <= reviewRating
                            ? "text-accent"
                            : "text-border-strong"
                        }
                      `}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}

            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              rows={4}
              className="
                mt-5
                w-full
                resize-none
                rounded-xl
                border
                border-border-subtle
                bg-surface-elevated
                p-4
                text-sm
                text-text-primary
                outline-none
                transition-all
                placeholder:text-text-muted
                focus:border-accent
                focus:ring-2
                focus:ring-accent/15
              "
            />

            {/* Submit */}

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={reviewRating === 0 || isAddingReview}
                className="
                  cursor-pointer
                  rounded-xl
                  bg-accent
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  transition-all
                  hover:bg-accent-hover
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isAddingReview
                  ? "Submitting..."
                  : "Submit Review"}
              </button>
            </div>
          </form>

          {/* Review List */}

          <div className="mt-6">
            {reviewsLoading ? (
              <div
                className="
                  rounded-2xl
                  border
                  border-border-subtle
                  bg-surface-card
                  p-6
                  text-sm
                  text-text-muted
                "
              >
                Loading reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-border-strong
                  bg-surface-card
                  p-8
                  text-center
                "
              >
                <p className="text-sm font-semibold text-text-primary">
                  No reviews yet
                </p>

                <p className="mt-1 text-xs text-text-muted">
                  Be the first to review this product.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="
                      rounded-2xl
                      border
                      border-border-subtle
                      bg-surface-card
                      p-5
                      transition-colors
                      hover:border-border-strong
                    "
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-accent-light
                          text-xs
                          font-bold
                          text-accent
                        "
                      >
                        {(review.user?.username || "A")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      {/* User */}

                      <div>
                        <p
                          className="
                            text-sm
                            font-bold
                            text-text-primary
                          "
                        >
                          {review.user?.username || "Anonymous"}
                        </p>

                        <div className="mt-1 flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              size={12}
                              className={
                                star <= review.rating
                                  ? "text-accent"
                                  : "text-border-strong"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Comment */}

                    <p
                      className="
                        mt-4
                        text-sm
                        leading-6
                        text-text-secondary
                      "
                    >
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            RELATED PRODUCTS
        ========================================================= */}

        <section className="mt-12">
          {/* Header */}

          <div className="mb-6">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                text-accent
              "
            >
              You May Also Like
            </p>

            <h2
              className="
                mt-1
                text-2xl
                font-bold
                tracking-tight
                text-text-primary
              "
            >
              Related Products
            </h2>
          </div>

          {/* Loading */}

          {relatedLoading ? (
            <div
              className="
                rounded-2xl
                border
                border-border-subtle
                bg-surface-card
                p-6
                text-sm
                text-text-muted
              "
            >
              Loading related products...
            </div>
          ) : relatedProducts.length === 0 ? (
            /* Empty */

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-border-strong
                bg-surface-card
                p-8
                text-center
              "
            >
              <p className="text-sm text-text-muted">
                No related products found.
              </p>
            </div>
          ) : (
            /* Products */

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => {
                const itemHasDiscount =
                  Number(item.discountPrice) > 0 &&
                  item.discountPrice < item.price;

                const itemFinalPrice = itemHasDiscount
                  ? item.discountPrice
                  : item.price;

                const itemRating = Math.round(
                  item.averageRating || 0,
                );

                const itemImage = item.images?.[0]?.url;

                return (
                  <div
                    key={item._id}
                    onClick={() =>
                      handleRelatedProductClick(item._id)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleRelatedProductClick(item._id);
                      }
                    }}
                    className="
                      group
                      cursor-pointer
                      overflow-hidden
                      rounded-2xl
                      border
                      border-border-subtle
                      bg-surface-card
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-border-strong
                      hover:shadow-lg
                    "
                  >
                    {/* Image */}

                    <div
                      className="
                        relative
                        h-56
                        overflow-hidden
                        bg-surface-elevated
                      "
                    >
                      {itemImage ? (
                        <img
                          src={itemImage}
                          alt={item.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-text-muted">
                          No image
                        </div>
                      )}

                      {itemHasDiscount && (
                        <span
                          className="
                            absolute
                            left-3
                            top-3
                            rounded-lg
                            bg-accent
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            text-white
                          "
                        >
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Product Info */}

                    <div className="p-4">
                      {item.brand && (
                        <p
                          className="
                            mb-1
                            text-xs
                            font-medium
                            text-text-muted
                          "
                        >
                          {item.brand}
                        </p>
                      )}

                      <h3
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-text-primary
                          transition-colors
                          group-hover:text-accent
                        "
                      >
                        {item.name}
                      </h3>

                      {/* Rating */}

                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              size={11}
                              className={
                                star <= itemRating
                                  ? "text-accent"
                                  : "text-border-strong"
                              }
                            />
                          ))}
                        </div>

                        <span
                          className="
                            text-xs
                            text-text-muted
                          "
                        >
                          ({item.numReviews || 0})
                        </span>
                      </div>

                      {/* Price */}

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className="
                            font-bold
                            text-accent
                          "
                        >
                          EGP{" "}
                          {Number(
                            itemFinalPrice || 0,
                          ).toLocaleString()}
                        </span>

                        {itemHasDiscount && (
                          <span
                            className="
                              text-xs
                              text-text-muted
                              line-through
                            "
                          >
                            EGP{" "}
                            {Number(
                              item.price || 0,
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;