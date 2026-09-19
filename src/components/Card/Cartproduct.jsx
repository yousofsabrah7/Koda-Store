import React, { useState } from "react";
import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "../../services/apiHooks/wishlistHook";

import { useAddToCart } from "../../services/apiHooks/cartHooks";

function Cartproduct({ product }) {
  const [addedwishlist, setAddedwishlist] = useState(false);

  const { mutateAsync: muteAdd } = useAddToWishlist();
  const { mutateAsync: muteDelete } = useRemoveFromWishlist();
  const { mutate, isPending } = useAddToCart();

  const AddWWichlist = async (productId) => {
    const res = await muteAdd(productId);

    if (res.success) {
      setAddedwishlist(true);
    }
  };

  const deletWishlist = async (productId) => {
    const res = await muteDelete(productId);

    if (res.success) {
      setAddedwishlist(false);
    }
  };

  const AddtoCart = async (productId) => {
    await mutate({
      productId: productId,
      quantity: 1,
    });
  };

  const RatingArr = [1, 2, 3, 4, 5];
  let count = product.rating;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await AddtoCart(product.id);
  };

  return (
    <Link
      to={`/shop/${product.id}`}
      className="flex w-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="group relative h-[220px] w-full overflow-hidden sm:h-[260px] p-9 bg-surface-elevated">

        <p className="absolute top-5 left-3 bg-accent text-white py-1 px-3 text-sm rounded-lg z-100">
          {product.category}
        </p>

        <p className="absolute top-[5%] left-[63%] bg-accent-light text-accent-hover px-3 text-sm rounded-lg z-100">
          -{product.discountPercentage}%
        </p>

        <img
          alt="Updated Name image 1"
          className="h-full w-full object-cover transition duration-300 ease-linear group-hover:scale-105"
          src={product.image}
        />

        <FaHeart
          className={`absolute top-[6%] left-[83%] text-3xl bg-surface-card/80 ${
            addedwishlist
              ? "text-red-500"
              : "text-gray-400/60"
          } z-100 p-1 cursor-pointer hover:bg-accent-light rounded-full`}
          width={50}
          height={50}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (addedwishlist) {
              deletWishlist(product.id);
            } else {
              AddWWichlist(product.id);
            }
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 py-5 sm:px-6">

        <h3 className="text-md font-bold text-text-primary sm:text-sm">
          {product.shortDescription?.slice(0, 26)}
        </h3>

        <div className="flex gap-3 items-center">

          <div className="flex gap-2">
            {RatingArr.map((_, i) => {
              if (count > 0) {
                count--;

                return (
                  <FaStar
                    key={i}
                    className="text-accent"
                  />
                );
              } else {
                return (
                  <FaStar
                    key={i}
                    className="text-border-strong"
                  />
                );
              }
            })}
          </div>

          <span className="text-text-muted">
            ({product.reviewsCount})
          </span>

        </div>

        <div className="flex gap-2 items-center">

          <span className="text-accent-hover font-bold text-lg">
            EGP {product.priceAfterDiscount}
          </span>

          <span className="font-bold line-through text-text-muted">
            {product.priceBeforeDiscount}
          </span>

        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">

          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className={`flex gap-2 items-center cursor-pointer
              bg-accent-hover py-1 rounded-lg px-17
              transition-all hover:*:text-text-primary
              ${
                isPending
                  ? "opacity-80 cursor-wait"
                  : "hover:bg-accent"
              }`}
          >

            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                <span className="text-white/90">
                  Adding...
                </span>
              </>
            ) : (
              <>
                <FaShoppingCart className="text-white/90" />

                <span className="text-white/90">
                  Add to cart
                </span>
              </>
            )}

          </button>

        </div>

      </div>
    </Link>
  );
}

export default Cartproduct;