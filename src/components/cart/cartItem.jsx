import React from "react";
import { useRemoveCartItem, useUpdateItemQuantity } from "../../services/apiHooks/cartHooks";
import { Loader2, Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
    const { mutate: updateQuantity, isPending: isUpdating } = useUpdateItemQuantity()
    
    const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem()
    
    const handleIncrease = () => {
        updateQuantity({
            productId: item.product,
            quantity: item.quantity + 1,
        });
    };
    const handleDecrease = () => {
        if (item.quantity <= 1) return;

        updateQuantity({
            productId: item.product,
            quantity: item.quantity - 1,
        });   
    };
    const handleRemove = () => {
        removeItem(item.product);
    };

    return (
        <div className="flex gap-4 py-4 border-b border-gray-100 last:border-b-0 items-start">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
                <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between self-stretch py-0.5">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
                        {item.name}</h3>

                    <button
                        onClick={handleRemove}
                        disabled={isRemoving || isUpdating}
                        aria-label="Remove item"
                        className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40 shrink-0"
                    >
                        {isRemoving ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                    </button>
                </div>

                <p className="text-sm font-bold text-indigo-600">
                    EGP {item.price?.toLocaleString()}</p>
                
                <div className="flex justify-between items-center mt-1">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDecrease}
                            disabled={isUpdating || isRemoving || item.quantity <= 1}
                            className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors text-xs font-medium"
                        >
                            -
                        </button>
                        <span className="text-xs font-semibold text-gray-700 min-w-[12px] text-center">
                            {isUpdating ? (
                                <Loader2 className="w-3 h-3 animate-spin mx-auto text-indigo-600" />
                            ) : item.quantity}
                            </span>
                        <button
                            onClick={handleIncrease}
                            disabled={isUpdating || isRemoving}
                            className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition-colors text-xs font-medium"
                        >
                            +
                        </button>
                    </div>
                    <p className={`text-sm font-semibold text-gray-900 transition-opacity duration-200 ${isUpdating ? "opacity-30" : "opacity-100"}`}>
                        EGP {(item.price * item.quantity).toLocaleString()}
                        </p>
                </div>

                
            </div>
        </div>
    )

}

export default CartItem;