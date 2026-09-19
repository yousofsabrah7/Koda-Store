import { HeartIcon, StarIcon, CartIcon } from "./Icons";
import { useState ,  useEffect } from "react";
import { useWishlist , useAddToWishlist , useRemoveFromWishlist } from "../../services/apiHooks/wishlistHook";
import { useAddToCart } from "../../services/apiHooks/cartHooks";

export default function ProductCard({ product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const currentPrice = hasDiscount ? product.discountPrice : product.price;
  const oldPrice = hasDiscount ? product.price : null;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;


  const isOutOfStock = product.stock === 0 || !product.stock;

  const {data: wishlistData} = useWishlist();
  const {mutate: addToWishlist} = useAddToWishlist();
  const {mutate: removeFromWishlist} = useRemoveFromWishlist();

  const wishlistItems = wishlistData?.wishlist?.products || [];


  // const isItemInWishlist = wishlistItems.some(
  //   (item)=>(item._id || item) === (product.id || product.id)
  // );
  const productId = product._id || product.id;
  const isItemInWishlist = wishlistItems.some((item)=>{
    const itemId = item?._id || item;
    return String(itemId) === String(productId)
  });

  const [optimisticLiked , setOptimisticLiked] = useState(isItemInWishlist);

  useEffect(() => {
    setOptimisticLiked(isItemInWishlist);
  }, [isItemInWishlist] );

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    const nextLiked = !optimisticLiked;
    setOptimisticLiked(nextLiked);

    if(!nextLiked){
      removeFromWishlist(product._id)
    }else{
      addToWishlist(product._id)
    }


  }

  const { mutate: addToCart , isPending } = useAddToCart();

  const handleAddToCart = (e) =>{
    e.stopPropagation();
    if(isOutOfStock) return ;
    addToCart({ productId: product._id, quantity: 1})
  }




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
            className={`p-1.5 rounded-full transition ${
              isOutOfStock ? "opacity-30 cursor-not-allowed text-gray-300"
              : optimisticLiked ? "bg-rose-50 cursor-pointer" : "hover:bg-rose-50 cursor-pointer"
            }`}
            title={isOutOfStock? "Out of Stock":"Wishlist"}
          >
            <HeartIcon className="w-4 h-4" filled={!isOutOfStock &&optimisticLiked} />
          </button>
        </div>



         {/* image */}
        <div
          className="relative h-44 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 mb-3 cursor-pointer"
          title="Click to view details"
        >
          <img
            src={product.images?.[0]?.url || "https://placehold.co/300x300"}
            alt={product.name}
            className={`h-full w-full object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105 ${ isOutOfStock ? "opacity-40 grayscale" : ""}`}
            loading="lazy"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <span className="bg-rose-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">Out of Stock</span>
            </div>
          )}

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
        disabled ={isOutOfStock}
        onClick={handleAddToCart}
        className={`w-full   py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition duration-150 ${
          isOutOfStock ? "cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200" : "cursor-pointer bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white"
        }`}
      >
        <CartIcon className="w-4 h-4" />
        <span>{isOutOfStock ? "Out of Stock": "Add to Cart"}</span>
      </button>
    </div>
  );
}
