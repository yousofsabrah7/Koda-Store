import React from "react";
import { Link } from "react-router-dom";

const CartSummary = ({
    subtotal = 0,
    discountAmount = 0,
    total = 0,
    }) => {
    const tax = total * 0.14;
    const finalTotal = total + tax;

    return (
        <aside className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h2>
            <div className="space-y-3.5 text-sm">
                {/* subtotal */}
                <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">
                        EGP {subtotal.toLocaleString()}</span>
                </div>

                {/* discount */}
                {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600">
                        <span>Discount</span>
                        <span className="font-semibold">
                            -EGP {discountAmount.toLocaleString()}</span>
                    </div>
                )}

                {/* shipping */}
                <div className="flex justify-between items-center text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                </div>

                {/* tax */}
                <div className="flex justify-between items-center text-gray-600">
                    <span>Tax (14%)</span>
                    <span className="font-semibold text-gray-800">
                        EGP {Math.round(tax).toLocaleString()}</span>
                </div>

                {/* hr */}
                <div className="border-t border-gray-100 my-4"/>

                {/* total */}
                <div className="flex justify-between items-center text-base font-bold text-gray-900 pt-1">
                    <span>Total</span>
                    <span className="text-accent text-lg">
                        EGP {Math.round(finalTotal).toLocaleString()}</span>
                </div>
            </div>
            <div className="mt-6 space-y-3">
                <Link
                    to="/checkout"
                    className="block w-full py-3.5 px-4 bg-accent hover:bg-accent-hover text-white font-semibold text-center rounded-xl shadow-sm transition-colors text-sm"
                >Proceed to Checkout</Link>

                <Link
                    to="/shop"
                    className="block w-full text-center text-sm font-medium text-accent hover:text-accent-hover transition-colors py-1"
                >Continue Shopping</Link>
            </div>
        </aside>
    )
}

export default CartSummary;