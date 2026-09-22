import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";

import {
  useProduct,
  useProducts,
} from "../../services/apiHooks/productsHook";

import { useAddToCart } from "../../services/apiHooks/cartHooks";

import {
  useWishlist,
  useAddToWishlist,
  useRemoveFromWishlist,
} from "../../services/apiHooks/wishlistHook";

import {
  useProductReviews,
  useAddReview,
} from "../../services/apiHooks/reviewsHook";

import Loading from "../../components/home/HandelLoading/Loading";

import {
  FaStar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  // =========================
  // PRODUCT
  // =========================

  const {
    data,
    isError,
    isLoading,
  } = useProduct(id);

  const product = data?.product;

  // =========================
  // RELATED PRODUCTS
  // =========================

  const {
    data: relatedData,
    isLoading: relatedLoading,
  } = useProducts(
    1,
    4,
    "",
    {
      category: product?.category,
    },
    !!product
  );

  // =========================
  // CART
  // =========================

  const {
    mutate: addToCart,
    isPending: isAddingToCart,
  } = useAddToCart();

  // =========================
  // WISHLIST
  // =========================

  const { data: wishlistData } = useWishlist();

  const {
    mutate: addToWishlist,
    isPending: isAdding,
  } = useAddToWishlist();

  const {
    mutate: removeFromWishlist,
    isPending: isRemoving,
  } = useRemoveFromWishlist();

  // =========================
  // REVIEWS
  // =========================

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
  } = useProductReviews(id);

  const {
    mutate: addReview,
    isPending: isAddingReview,
  } = useAddReview(id);

  // =========================
  // IMAGE GALLERY
  // =========================

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  // =========================
  // QUANTITY
  // =========================

  const [quantity, setQuantity] = useState(() => {
    const savedQuantity = localStorage.getItem(
      `quantity.${id}`
    );

    return savedQuantity
      ? Number(savedQuantity)
      : 1;
  });

  // =========================
  // REVIEW
  // =========================

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // =========================
  // SAVE QUANTITY
  // =========================

  useEffect(() => {
    localStorage.setItem(
      `quantity.${id}`,
      quantity
    );
  }, [id, quantity]);

  // =========================
  // SCROLL TO TOP
  // =========================

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // =========================
  // EMBLA SELECT
  // =========================

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(
      emblaApi.selectedScrollSnap()
    );
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // =========================
  // PREVIOUS IMAGE
  // =========================

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
  }, [emblaApi]);

  // =========================
  // NEXT IMAGE
  // =========================

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
  }, [emblaApi]);

  // =========================
  // SELECT IMAGE
  // =========================

  const scrollToImage = useCallback(
    (index) => {
      if (!emblaApi) return;

      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // =========================
  // DATA
  // =========================

  const reviews =
    reviewsData?.reviews || [];

  const wishlistProducts =
    wishlistData?.wishlist?.products || [];

  // =========================
  // RELATED PRODUCTS
  // =========================

  const relatedProducts = (
    relatedData?.products || []
  ).filter(
    (item) => item._id !== product?._id
  );

  // =========================
  // WISHLIST CHECK
  // =========================

  const isInWishlist =
    wishlistProducts.some(
      (p) => p._id === product?._id
    );

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return <Loading />;
  }

  // =========================
  // ERROR
  // =========================

  if (isError) {
    return (
      <h1 className="text-center py-32">
        There is an error
      </h1>
    );
  }

  // =========================
  // NO PRODUCT
  // =========================

  if (!product) {
    return (
      <h1 className="text-center py-32">
        There is no product
      </h1>
    );
  }

  // =========================
  // PRICE
  // =========================

  const hasDiscount =
    product.discountPrice &&
    product.discountPrice < product.price;

  const finalPrice = hasDiscount
    ? product.discountPrice
    : product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price -
          product.discountPrice) /
          product.price) *
          100
      )
    : 0;

  // =========================
  // RATING
  // =========================

  const rating = Math.round(
    product.averageRating || 0
  );

  // =========================
  // REVIEW SUBMIT
  // =========================

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (reviewRating === 0) return;

    addReview(
      {
        rating: reviewRating,
        comment: reviewComment,
      },
      {
        onSuccess: () => {
          setReviewRating(0);
          setReviewComment("");
        },
      }
    );
  };

  // =========================
  // RELATED PRODUCT CLICK
  // =========================

  const handleRelatedProductClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <div className="min-h-screen bg-surface-base flex flex-col items-center py-32">

      {/* =================================
          PRODUCT DETAILS
      ================================= */}

      <div className="max-w-5xl w-full mx-auto p-6 flex flex-col md:flex-row gap-8">

        {/* =================================
            LEFT COLUMN - IMAGE GALLERY
        ================================= */}

        <div className="flex-[1.5] min-w-0">

          {/* MAIN IMAGE */}

          <div className="relative group">

            <div
              ref={emblaRef}
              className="overflow-hidden rounded-2xl"
            >
              <div className="flex">

                {product.images.map((img) => (
                  <div
                    key={img.public_id}
                    className="flex-[0_0_100%] min-w-0"
                  >
                    <img
                      src={img.url}
                      alt={product.name}
                      className="w-full h-[400px] object-cover rounded-2xl border border-gray-200 bg-gray-50"
                    />
                  </div>
                ))}

              </div>
            </div>

            {/* PREVIOUS BUTTON */}

            {product.images.length > 1 && (
              <button
                type="button"
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md text-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                ‹
              </button>
            )}

            {/* NEXT BUTTON */}

            {product.images.length > 1 && (
              <button
                type="button"
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md text-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                ›
              </button>
            )}

          </div>

          {/* =================================
              THUMBNAILS
          ================================= */}

          <div className="flex justify-center items-center gap-4 mt-5">

            {product.images.map(
              (img, index) => (
                <button
                  type="button"
                  key={img.public_id}
                  onClick={() =>
                    scrollToImage(index)
                  }
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                    index === selectedIndex
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`${product.name} ${
                      index + 1
                    }`}
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            )}

          </div>

          {/* IMAGE COUNTER */}

          {product.images.length > 1 && (
            <p className="text-center text-sm text-gray-500 mt-2">
              {selectedIndex + 1} /{" "}
              {product.images.length}
            </p>
          )}

        </div>

        {/* =================================
            RIGHT COLUMN - PRODUCT INFO
        ================================= */}

        <div className="flex-1">

          {/* BRAND + CATEGORY */}

          <div className="flex gap-2 mb-3">

            {product.brand && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                {product.brand}
              </span>
            )}

            {product.category && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                {product.category}
              </span>
            )}

          </div>

          {/* PRODUCT NAME */}

          <h1 className="text-2xl font-bold">
            {product.name}
          </h1>

          {/* RATING */}

          <div className="flex items-center gap-2 mt-2">

            <div className="flex gap-1">

              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= rating
                        ? "text-orange-500"
                        : "text-gray-300"
                    }
                  />
                )
              )}

            </div>

            <span className="text-sm text-gray-500">
              ({product.numReviews || 0})
            </span>

          </div>

          {/* PRICE */}

          <p className="mt-3 flex items-center gap-2">

            <span className="text-2xl font-bold text-orange-600">
              EGP {finalPrice}
            </span>

            {hasDiscount && (
              <>
                <span
                  className="text-gray-400"
                  style={{
                    textDecoration:
                      "line-through",
                  }}
                >
                  EGP {product.price}
                </span>

                <span className="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-600">
                  -{discountPercent}%
                </span>
              </>
            )}

          </p>

          {/* STOCK */}

          <p
            className={`font-semibold text-sm px-2 py-1 rounded inline-block mt-2 ${
              product.stock > 0
                ? "text-green-600 bg-green-100"
                : "text-red-600 bg-red-100"
            }`}
          >
            {product.stock > 0
              ? "IN STOCK"
              : "NOT AVAILABLE RIGHT NOW"}
          </p>

          {/* QUANTITY */}

          <span className="flex gap-3 items-center rounded-sm p-3">

            <button
              type="button"
              className="cursor-pointer border-2 rounded-sm px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() =>
                setQuantity((q) =>
                  Math.min(
                    product.stock,
                    q + 1
                  )
                )
              }
              disabled={product.stock === 0}
            >
              +
            </button>

            <span className="text-center w-2">
              {product.stock === 0
                ? 0
                : quantity}
            </span>

            <button
              type="button"
              className="cursor-pointer border-2 rounded-sm px-2 py-1 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() =>
                setQuantity((q) =>
                  Math.max(1, q - 1)
                )
              }
              disabled={product.stock === 0}
            >
              -
            </button>

          </span>

          {/* CART + WISHLIST */}

          <div className="flex items-center gap-3 mt-4">

            <button
              onClick={() =>
                addToCart(
                  {
                    productId: product._id,
                    quantity,
                  },
                  {
                    onSuccess: () =>
                      setQuantity(1),
                  }
                )
              }
              disabled={
                product.stock === 0 ||
                isAddingToCart
              }
              className={`flex-1 text-white font-semibold py-3 rounded-lg disabled:cursor-not-allowed ${
                product.stock === 0
                  ? "bg-orange-900"
                  : "bg-orange-500 cursor-pointer hover:bg-orange-900"
              }`}
            >
              {product.stock === 0
                ? "NOT AVAILABLE RIGHT NOW"
                : isAddingToCart
                ? "Adding..."
                : "Add to Cart"}
            </button>

            <button
              onClick={() =>
                isInWishlist
                  ? removeFromWishlist(
                      product._id
                    )
                  : addToWishlist(
                      product._id
                    )
              }
              disabled={
                isAdding || isRemoving
              }
              className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-red-50 cursor-pointer disabled:opacity-50"
            >
              {isInWishlist ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>

          </div>

          {/* DESCRIPTION */}

          <p className="text-sm text-gray-500 mt-4">
            {product.shortDescription}
          </p>

        </div>

      </div>

      {/* =================================
          REVIEWS SECTION
      ================================= */}

      <div className="max-w-5xl w-full mx-auto p-6">

        <h2 className="text-xl font-bold mb-4">
          Reviews (
          {product.numReviews || 0})
        </h2>

        {/* WRITE REVIEW */}

        <form
          onSubmit={handleSubmitReview}
          className="bg-white border border-gray-200 rounded-2xl p-4 mb-6"
        >

          <p className="font-semibold mb-2">
            Leave a review
          </p>

          <div className="flex gap-1 mb-3">

            {[1, 2, 3, 4, 5].map(
              (star) => (
                <FaStar
                  key={star}
                  onClick={() =>
                    setReviewRating(star)
                  }
                  className={`cursor-pointer text-xl ${
                    star <= reviewRating
                      ? "text-orange-500"
                      : "text-gray-300"
                  }`}
                />
              )
            )}

          </div>

          <textarea
            value={reviewComment}
            onChange={(e) =>
              setReviewComment(
                e.target.value
              )
            }
            placeholder="Share your thoughts about this product..."
            className="w-full border border-gray-200 rounded-lg p-3 text-sm mb-3"
            rows={3}
          />

          <button
            type="submit"
            disabled={
              reviewRating === 0 ||
              isAddingReview
            }
            className="bg-orange-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isAddingReview
              ? "Submitting..."
              : "Submit Review"}
          </button>

        </form>

        {/* REVIEW LIST */}

        {reviewsLoading ? (
          <p className="text-gray-500 text-sm">
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No reviews yet — be the first
            to review this product.
          </p>
        ) : (
          <div className="space-y-4">

            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-gray-200 rounded-xl p-4"
              >

                <div className="flex items-center gap-2 mb-1">

                  <div className="flex gap-1">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <FaStar
                          key={star}
                          className={`text-sm ${
                            star <= review.rating
                              ? "text-orange-500"
                              : "text-gray-300"
                          }`}
                        />
                      )
                    )}

                  </div>

                  <span className="text-sm font-semibold">
                    {review.user?.username ||
                      "Anonymous"}
                  </span>

                </div>

                <p className="text-sm text-gray-600">
                  {review.comment}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* =================================
          RELATED PRODUCTS
      ================================= */}

      <div className="max-w-5xl w-full mx-auto p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Related Products
        </h2>

        {relatedLoading ? (
          <p className="text-gray-500">
            Loading related products...
          </p>
        ) : relatedProducts.length === 0 ? (
          <p className="text-gray-500">
            No related products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {relatedProducts.map(
              (item) => {

                const itemHasDiscount =
                  item.discountPrice &&
                  item.discountPrice <
                    item.price;

                const itemFinalPrice =
                  itemHasDiscount
                    ? item.discountPrice
                    : item.price;

                return (
                  <div
                    key={item._id}
                    onClick={() =>
                      handleRelatedProductClick(
                        item._id
                      )
                    }
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition duration-200"
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="w-full h-48 bg-gray-100 overflow-hidden">

                      <img
                        src={
                          item.images?.[0]?.url
                        }
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />

                    </div>

                    {/* PRODUCT INFO */}

                    <div className="p-4">

                      {item.brand && (
                        <p className="text-xs text-gray-500 mb-1">
                          {item.brand}
                        </p>
                      )}

                      <h3 className="font-semibold text-sm truncate">
                        {item.name}
                      </h3>

                      {/* RATING */}

                      <div className="flex items-center gap-1 mt-2">

                        <div className="flex gap-0.5">

                          {[1, 2, 3, 4, 5].map(
                            (star) => (
                              <FaStar
                                key={star}
                                className={`text-xs ${
                                  star <=
                                  Math.round(
                                    item.averageRating ||
                                      0
                                  )
                                    ? "text-orange-500"
                                    : "text-gray-300"
                                }`}
                              />
                            )
                          )}

                        </div>

                        <span className="text-xs text-gray-400">
                          (
                          {item.numReviews ||
                            0}
                          )
                        </span>

                      </div>

                      {/* PRICE */}

                      <div className="flex items-center gap-2 mt-3">

                        <span className="font-bold text-orange-600">
                          EGP{" "}
                          {itemFinalPrice}
                        </span>

                        {itemHasDiscount && (
                          <span
                            className="text-xs text-gray-400"
                            style={{
                              textDecoration:
                                "line-through",
                            }}
                          >
                            EGP {item.price}
                          </span>
                        )}

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default ProductDetails;