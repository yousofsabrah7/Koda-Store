import { Check, BoxIcon, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-surface-base">
      <div className="w-fit">
        {/* Success Card */}
        <div className="bg-surface-card border border-border-subtle rounded-3xl px-6 py-6 sm:px-10 sm:py-8 text-center shadow-[0_20px_60px_rgba(24,23,20,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          {/* Success Icon */}
          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-accent-light">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/90 text-white">
              <Check size={30} strokeWidth={2.5} />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Order Confirmed
            </p>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">
              Order Placed Successfully!
            </h2>

            <p className="mx-auto max-w-md text-sm sm:text-base leading-7 text-text-secondary">
              Thank you for your purchase. Your order has been confirmed and is
              now being prepared.
            </p>
          </div>

          {/* Order ID */}
          <div className="mt-8 rounded-2xl border border-border-subtle bg-surface-elevated px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Order ID
            </p>

            <p className="mt-1 font-mono text-sm sm:text-base font-semibold tracking-wide text-text-primary">
              #{id?.slice(0, 7).toUpperCase() || "--------"}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to={`/orders/${id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface-card px-5 py-3.5 text-sm font-semibold text-text-primary transition-all duration-200 hover:bg-surface-elevated hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent-light"
            >
              <BoxIcon size={18} strokeWidth={2} />
              Track My Order
            </Link>

            <Link
              to={"/shop"}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent-light"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              Continue Shopping
            </Link>
          </div>

          {/* Footer Message */}
          <p className="mt-7 text-xs text-text-muted">
            A confirmation email has been sent with your order details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
