import { HeartIcon, StarIcon, CartIcon } from "./Icons";
import { useState ,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist , useAddToWishlist , useRemoveFromWishlist } from "../../services/apiHooks/wishlistHook";
import { useAddToCart , useCart} from "../../services/apiHooks/cartHooks";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
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

  const {data: cartData , isLoading: isCartLoading } = useCart();
  const { mutate: addToCart , isPending: isAddingToCart  } = useAddToCart();


  const cartItems = cartData?.items || cartData?.cart?.items || [];
  const itemInCart = cartItems.find((item)=> {
    const itemId = item.product?._id || item.product || item.productId;
    return String(itemId) === String(product._id)
  });

  const quantityInCart  = itemInCart?.quantity || 0;
  const MAX_LIMIT_PER_USER = 5 ;
  const maxAvailable  = Math.min(product.stock || MAX_LIMIT_PER_USER, MAX_LIMIT_PER_USER);
  const isMaxReached = quantityInCart >= maxAvailable;

  const handleAddToCart = (e) =>{
    e.stopPropagation();
    if(isOutOfStock || isAddingToCart || isMaxReached || isCartLoading) return ; 
    addToCart({ productId: product._id, quantity: 1})
  }


  const handleViewDetails = ()=>{
    navigate(`/shop/${product._id}`)
  }




  return (
    <div className="bg-surface-card rounded-2xl border  border-border-subtle p-4 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group">
      <div>
        {/* Head of card */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium bg-accent-light text-accent px-2 py-0.5 rounded-full capitalize">
              {product.category}
            </span>

            {hasDiscount && (
              <span className="text-[11px] font-bold bg-accent-light text-accent px-1.5 py-0.5 rounded-full">
                -{discountPercent}%
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleLikeToggle}
            className={`p-1.5 rounded-full transition ${
              isOutOfStock ? "opacity-30 cursor-not-allowed text-gray-300"
              : optimisticLiked ? "bg-accent-light cursor-pointer" : "hover:bg-accent-light cursor-pointer"
            }`}
            title={isOutOfStock? "Out of Stock":"Wishlist"}
          >
            <HeartIcon className="w-4 h-4" filled={!isOutOfStock &&optimisticLiked} />
          </button>
        </div>



         {/* image */}
        <div
        onClick={handleViewDetails}
          className="relative h-44 w-full flex items-center justify-center overflow-hidden rounded-xl bg-surface-elevated mb-3 cursor-pointer"
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
        onClick={handleViewDetails}
          className="text-sm font-semibold text-text-primary line-clamp-1 mb-1.5 cursor-pointer hover:text-accent transition"
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
          <span className="text-xs text-text-muted">({product.numReviews || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-bold text-accent">
            EGP {currentPrice.toLocaleString()}
          </span>
          {oldPrice && (
            <span className="text-xs text-text-muted line-through">
              EGP {oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        disabled ={isOutOfStock || isAddingToCart || isMaxReached || isCartLoading}
        onClick={handleAddToCart}
        className={`w-full   py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition duration-150 ${
          isOutOfStock || isMaxReached ? "cursor-not-allowed bg-surface-elevated text-text-muted border border-border-subtle" 
          : isAddingToCart?
           "cursor-wait bg-accent-hover text-white opacity-80"
          :"cursor-pointer bg-accent hover:bg-accent-hover text-white shadow-xs active:scale-[0.98]"
        }`}
      >
        {isAddingToCart ?(
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Adding...</span>
          </>
        ) : isOutOfStock ? (
          <span>Out of Stock</span>
        ) : isMaxReached ? (
          <span>Max Limit in Cart 5</span>
        ) : (
          <>
            <CartIcon className="w-4 h-4"/>
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
}
