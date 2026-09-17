import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "../../services/apiHooks/wishlistHook";
import { useAddToCart } from "../../services/apiHooks/cartHooks";
function Cartproduct({ product }) {
  const [addedwishlist, setAddedwishlist] = useState(false);
  const [loadingAddCart, setLoadingAddCart] = useState(false);
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
  var count = product.rating;
  return (
    <div className="flex w-full  flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-sm transition-shadow hover:shadow-md">
      <div className="group relative h-[220px] w-full overflow-hidden sm:h-[260px] p-9 bg-surface-elevated">
        <p className="absolute top-5 left-3 bg-accent text-white py-1 px-3 text-sm rounded-lg z-100">
          {product.category}
        </p>
        <p className="absolute top-[5%] left-[63%] bg-accent-light text-accent-hover  px-3 text-sm rounded-lg z-100">
          -{product.discountPercentage}%
        </p>
        <img
          alt="Updated Name image 1"
          className="h-full w-full object-cover transition duration-300 ease-linear group-hover:scale-105"
          src={product.image}
        />
        <FaHeart
          className={`absolute top-[6%] left-[83%] text-3xl bg-surface-card/80  ${addedwishlist ? "text-red-500" : "text-gray-400/60"} z-100 p-1 cursor-pointer hover:bg-accent-light rounded-full`}
          width={50}
          height={50}
          onClick={() => {
            if (addedwishlist) {
              deletWishlist(product.id);
            } else {
              AddWWichlist(product.id);
            }
          }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-5 py-5 sm:px-6">
        {/* Title */}
        <h3 className="text-md font-bold text-text-primary sm:text-sm">
          {product.shortDescription?.slice(0, 26)}
        </h3>
        {/* Star Rating */}
        <div className="flex gap-3 items-center">
          <div className="flex gap-2">
            {RatingArr.map(() => {
              if (count > 0) {
                count--;
                return <FaStar className="text-accent" />;
              } else {
                return <FaStar className="text-border-strong" />;
              }
            })}
          </div>
          <span className="text-text-muted">({product.reviewsCount})</span>
        </div>
        {/* Price */}
        <div className="flex gap-2 items-center">
          <span className="text-accent-hover font-bold text-lg">
            EGP {product.priceAfterDiscount}
          </span>{" "}
          <span className="font-bold line-through text-text-muted">
            {product.priceBeforeDiscount}
          </span>
        </div>
        {/* Button */}
        <div className="flex flex-wrap justify-center items-center gap-2   ">
          <button
            onClick={() => AddtoCart(product.id)}
            disabled={isPending}
            className={`flex gap-2 items-center cursor-pointer
    bg-accent-hover py-1 rounded-lg px-17
    transition-all hover:*:text-text-primary
    ${isPending ? "opacity-80 cursor-wait" : "hover:bg-accent"}`}
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-white/90">Adding...</span>
              </>
            ) : (
              <>
                <FaShoppingCart className="text-white/90" />
                <span className="text-white/90">Add to cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cartproduct;
