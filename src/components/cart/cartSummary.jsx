import React from "react";
import { Link } from "react-router-dom";

const CartSummary = ({ subtotal = 0, discountAmount = 0, total = 0 }) => {
  const tax = total * 0.14;
  const finalTotal = total + tax;

  return (
    <aside
      className="
        h-full
        rounded-2xl
        border border-border-subtle
        bg-surface-card
        p-6
        shadow-sm
        transition-colors duration-300
      "
    >
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-lg font-bold text-text-primary">Order Summary</h2>

        <p className="mt-1 text-xs text-text-muted">
          Review your order details
        </p>
      </div>

      {/* Summary */}

      <div className="space-y-4 text-sm">
        {/* Subtotal */}

        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Subtotal</span>

          <span className="font-semibold text-text-primary">
            EGP {subtotal.toLocaleString()}
          </span>
        </div>

        {/* Discount */}

        {discountAmount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Discount</span>

            <span className="font-semibold text-accent">
              -EGP {discountAmount.toLocaleString()}
            </span>
          </div>
        )}

        {/* Shipping */}

        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Shipping</span>

          <span className="font-semibold text-accent">Free</span>
        </div>

        {/* Tax */}

        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Tax (14%)</span>

          <span className="font-semibold text-text-primary">
            EGP {Math.round(tax).toLocaleString()}
          </span>
        </div>

        {/* Divider */}

        <div className="my-5 border-t border-border-subtle" />

        {/* Total */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            bg-accent-light
            px-4
            py-3
          "
        >
          <span className="text-sm font-bold text-text-primary">Total</span>

          <span className="text-lg font-bold text-accent">
            EGP {Math.round(finalTotal).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-6 space-y-3">
        {/* Checkout */}

        <Link
          to="/checkout"
          className="
            block
            w-full
            rounded-xl
            bg-accent
            px-4
            py-3.5
            text-center
            text-sm
            font-semibold
            text-white
            shadow-sm
            shadow-accent/20
            transition-all duration-200
            hover:bg-accent-hover
            hover:shadow-md
            hover:shadow-accent/25
          "
        >
          Proceed to Checkout
        </Link>

        {/* Continue Shopping */}

        <Link
          to="/shop"
          className="
            block
            w-full
            rounded-lg
            py-2
            text-center
            text-sm
            font-semibold
            text-text-secondary
            transition-colors
            hover:bg-accent-light
            hover:text-accent
          "
        >
          Continue Shopping
        </Link>
      </div>
    </aside>
  );
};

export default CartSummary;
