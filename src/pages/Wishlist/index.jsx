import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { CartIcon , TrashIcon , HeartIcon } from '../../components/shop/Icons';
import {useWishlist , useRemoveFromWishlist } from "../../services/apiHooks/wishlistHook";
import { Frown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAddToCart } from '../../services/apiHooks/cartHooks';
import { addToCart } from '../../services/api/cartApi';

export default function WishlistPage (){

  const {data , isLoading } = useWishlist();
  const {mutate: removeFromWishlist } = useRemoveFromWishlist();
  // const wishlistProducts = data?.wishlist?.products || [];

  // const handleRemove  = (productId)=>{
  //   removeFromWishlist (productId)
  // };

  const [removedIds , setRemovedIds] = useState([]);
  const serverProducts = data?.wishlist?.products || [];
  const wishlistProducts = serverProducts.filter(
    (product) => !removedIds.includes(product._id)
  );

  const handleRemove =  (productId) =>{
    setRemovedIds((prev)=>[...prev, productId]);
    removeFromWishlist(productId)
  }


  const {mutate : addToCart } = useAddToCart();

  if (isLoading){
    return (
      <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-44 mb-8 bg-gray-200 rounded-lg animate-pulse"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n)=>(
              <div key={n} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse space-y-3">
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
    
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* عنوان الصفحة زي التصميم */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          My Wishlist
        </h1>
        {/* 2. حالة لو المفضلة فاضية */}
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 shadow-xs max-w-md mx-auto">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon className="w-8 h-8" filled={false} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Explore more and shortlist some items you love!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition shadow-xs cursor-pointer"
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
              return (
                <div
                  key={`${product._id}-${index}`}
                  className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group"
                >
                  <div>
                    
                    <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 mb-3">
                      <img
                        src={product.images?.[0]?.url || "https://placehold.co/300x300"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <h3
                      className="text-sm font-semibold text-gray-800 line-clamp-1 mb-2"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-base font-bold text-indigo-600">
                        EGP {currentPrice?.toLocaleString()}
                      </span>
                      {oldPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          EGP {oldPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={()=> addToCart({ productId: product._id , quantity: 1})}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition duration-150 cursor-pointer shadow-xs"
                    >
                      <CartIcon className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(product._id)}
                      className="p-2.5 bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-500 rounded-xl transition cursor-pointer shrink-0 border border-rose-100"
                      title="Remove from wishlist"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
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