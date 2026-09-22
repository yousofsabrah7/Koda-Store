import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../../services/apiHooks/cartHooks";

import CartItem from "../../components/cart/cartItem";
import CouponForm from "../../components/cart/couponForm";
import CartSummary from "../../components/cart/cartSummary";
import EmptyCart from "../../components/cart/emptyCart";

const Cart = () => {
  const {
    data: cart,
    isLoading,
    isError,
  } = useCart();

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return (
      <main
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          bg-surface-base
        "
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-accent-light
            "
          >
            <Loader2
              className="
                h-7
                w-7
                animate-spin
                text-accent
              "
            />
          </div>

          <p
            className="
              text-sm
              font-medium
              text-text-muted
            "
          >
            Loading your cart...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // Empty / Invalid Cart
  // =========================

  if (
    isError ||
    !cart ||
    !Array.isArray(cart.items) ||
    cart.items.length === 0
  ) {
    return <EmptyCart />;
  }

  // =========================
  // Cart Items Count
  // =========================

  const cartItemsCount = cart.items.reduce(
    (total, item) =>
      total + Number(item.quantity ?? 1),
    0,
  );

  return (
    <main
      className="
        min-h-screen
        bg-surface-base
        px-4
        py-8
        transition-colors duration-300
        sm:px-6
        lg:px-8
        lg:py-10
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            Page Header
        ========================= */}

        <header className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <ShoppingBag
              className="h-5 w-5 text-accent"
              aria-hidden="true"
            />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                text-accent
              "
            >
              Your Cart
            </span>
          </div>

          <div
            className="
              flex
              flex-col
              justify-between
              gap-3
              sm:flex-row
              sm:items-end
            "
          >
            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-text-primary
                  sm:text-3xl
                "
              >
                Shopping Cart
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-text-secondary
                "
              >
                Review your items before checkout.
              </p>
            </div>

            {/* Items Count */}

            <div
              className="
                flex
                w-fit
                items-center
                gap-1.5
                rounded-full
                bg-accent-light
                px-3
                py-1.5
                text-xs
                font-semibold
                text-accent
              "
            >
              <ShoppingBag
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />

              <span>
                {cartItemsCount}{" "}
                {cartItemsCount === 1
                  ? "item"
                  : "items"}
              </span>
            </div>
          </div>
        </header>

        {/* =========================
            Main Content
        ========================= */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            items-start
            gap-6
            lg:grid-cols-12
            lg:gap-8
          "
        >
          {/* =========================
              Cart Content
          ========================= */}

          <div
            className="
              space-y-6
              lg:col-span-8
            "
          >
            {/* Cart Items */}

            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border-subtle
                bg-surface-card
                shadow-sm
                transition-colors duration-300
              "
            >
              {/* Section Header */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-border-subtle
                  px-5
                  py-4
                  sm:px-6
                "
              >
                <div>
                  <h2
                    className="
                      text-sm
                      font-bold
                      text-text-primary
                    "
                  >
                    Cart Items
                  </h2>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-text-muted
                    "
                  >
                    Your selected products
                  </p>
                </div>

                <ShoppingBag
                  className="
                    h-5
                    w-5
                    text-text-muted
                  "
                  aria-hidden="true"
                />
              </div>

              {/* Items */}

              <div className="divide-y divide-border-subtle px-5 sm:px-6">
                {cart.items.map((item) => (
                  <CartItem
                    key={item._id || item.product}
                    item={item}
                  />
                ))}
              </div>
            </section>

            {/* Coupon */}

            <section>
              <CouponForm
                coupon={cart.coupon}
              />
            </section>

            {/* Continue Shopping */}

            <div className="pt-1">
              <Link
                to="/shop"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  px-2
                  py-2
                  text-sm
                  font-semibold
                  text-text-secondary
                  transition-all
                  hover:bg-accent-light
                  hover:text-accent
                "
              >
                <ArrowLeft
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-200
                    group-hover:-translate-x-1
                  "
                  aria-hidden="true"
                />

                Continue Shopping
              </Link>
            </div>
          </div>

          {/* =========================
              Order Summary
          ========================= */}

          <aside
            className="
              lg:col-span-4
              lg:sticky
              lg:top-24
            "
          >
            <CartSummary
              subtotal={cart.subtotal}
              discountAmount={cart.discountAmount}
              total={cart.total}
            />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;