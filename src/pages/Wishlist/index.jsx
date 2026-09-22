import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartIcon , TrashIcon , HeartIcon } from '../../components/shop/Icons';
import {useWishlist , useRemoveFromWishlist } from "../../services/apiHooks/wishlistHook";
import { Frown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAddToCart , useCart } from '../../services/apiHooks/cartHooks';

export default function WishlistPage (){

  const {data , isLoading } = useWishlist();
  const {mutate: removeFromWishlist } = useRemoveFromWishlist();

  const navigate = useNavigate();
  const {data: cartData}= useCart();
  const {mutate: addToCart} = useAddToCart();
  const [addingId, setAddingId] = useState(null);
  const cartItems = cartData?.items ||cartData?.cart?.items || [] ;

  const handleAddToCart = (productId)=>{
    setAddingId(productId);
    addToCart(
      {productId, quantity: 1},
      {onSettled: ()=> setAddingId(null)}
    )
  }
  

  const [removedIds , setRemovedIds] = useState([]);
  const serverProducts = data?.wishlist?.products || [];
  const wishlistProducts = serverProducts.filter(
    (product) => !removedIds.includes(product._id)
  );

  const handleRemove =  (productId) =>{
    setRemovedIds((prev)=>[...prev, productId]);
    removeFromWishlist(productId)
  }


  // const {mutate : addToCart } = useAddToCart();

  if (isLoading){
    return (
      <div className="min-h-screen bg-surface-base py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-44 mb-8 bg-gray-200 rounded-lg animate-pulse"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n)=>(
              <div key={n} className="bg-surface-card rounded-2xl border border-gray-100 p-4 animate-pulse space-y-3">
                <div className="h-48 bg-gray-200 rounded-xl w-full"/>  {/* image */}
                <div className="h-4 bg-gray-200 rounded w-3/4"/> {/* product name */}
                <div className="h-4 bg-gray-200 rounded w-1/2"/> {/* price */}
                <div className="h-10 bg-gray-200 rounded-xl w-full"/> {/* button */}
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }




  return (
    
    <div className="min-h-screen bg-surface-base py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          My Wishlist
        </h1>
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface-card rounded-2xl border border-border-subtle p-8 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 bg-accent-light text-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8" filled={false} />
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-text-muted mb-6">
              Explore more and shortlist some items you love!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition shadow-xs cursor-pointer"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wishlistProducts.map((product , index) => {
              const hasDiscount =
                product.discountPrice && product.discountPrice < product.price;
              const currentPrice = hasDiscount ? product.discountPrice : product.price;
              const oldPrice = hasDiscount ? product.price : null;

              const isOutOfStock = product.stock === 0 || !product.stock;
              const itemInCart = cartItems.find((item)=>{
                const itemId = item.product?._id || item.product || item.productId;
                return String(itemId) === String(product._id)
              });

              const quantityInCart = itemInCart?.quantity || 0;
              const MAX_LIMIT =  4;
              const maxAvailable = Math.min(product.stock || MAX_LIMIT , MAX_LIMIT);
              const isMaxReached = quantityInCart >= maxAvailable;
              const isAdding = addingId === product._id;
              return (
                <div
                  key={`${product._id}-${index}`}
                  className="bg-surface-card rounded-2xl border border-border-subtle p-4 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group"
                >
                  <div>
                    
                    <div 
                      onClick={()=>navigate(`/shop/${product._id}`)}
                      className="h-48 w-full flex items-center justify-center overflow-hidden rounded-xl bg-surface-elevated mb-3 cursor-pointer">
                      <img
                        src={product.images?.[0]?.url || "https://placehold.co/300x300"}
                        alt={product.name}
                        className={`h-full w-full object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105 ${isOutOfStock ? "opacity-40 grayscale" : ""}`}
                        loading="lazy"
                      />
                    </div>
                    <h3
                      onClick={()=>navigate(`/shop/${product._id}`)}
                      className="text-sm font-semibold text-text-primary line-clamp-1 mb-2 cursor-pointer hover:text-accent transition"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-base font-bold text-accent">
                        EGP {currentPrice?.toLocaleString()}
                      </span>
                      {oldPrice && (
                        <span className="text-xs text-text-muted line-through">
                          EGP {oldPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled = {isOutOfStock || isMaxReached || isAdding}
                      onClick={()=> handleAddToCart(product._id)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition duration-150 shadow-xs${
                        isOutOfStock || isMaxReached 
                        ?"cursor-not-allowed bg-surface-elevated text-text-muted border border-border-subtle"
                        : isAdding
                        ? "cursor-wait bg-accent-hover text-white opacity-80"
                        :" cursor-pointer bg-accent hover:bg-accent-hover active:scale-[0.98] text-white"
                      }`}
                    >
                      {isAdding ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding...</span>
                        </>
                      ): isOutOfStock ? (
                        <span>Out of Stock</span>
                      ): isMaxReached ? (
                        <span>Max in Cart 5</span>
                      ):(
                        <>
                          <CartIcon className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}

                    </button>

                    {/* <button
                      type="button"
                      onClick={() => handleRemove(product._id)}
                      className="p-2.5 bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-500 rounded-xl transition cursor-pointer shrink-0 border border-rose-100"
                      title="Remove from wishlist"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
  



}