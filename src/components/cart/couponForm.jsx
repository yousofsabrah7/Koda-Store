import React, { useState } from "react";
import {
  useApplyCoupon,
  useRemoveCoupon,
} from "../../services/apiHooks/cartHooks";

import { Loader2, Tag, X } from "lucide-react";

const CouponForm = ({ coupon }) => {
  const [code, setCode] = useState("");

  const { mutate: applyCoupon, isPending: isApplying } = useApplyCoupon();

  const { mutate: removeCoupon, isPending: isRemoving } = useRemoveCoupon();

  const handleApply = (e) => {
    e.preventDefault();

    if (!code.trim()) return;

    applyCoupon(
      {
        code: code.trim(),
      },
      {
        onSuccess: () => setCode(""),
      },
    );
  };

  return (
    <div
      className="
        rounded-2xl
        border border-border-subtle
        bg-surface-card
        p-6
        shadow-sm
        transition-colors duration-300
      "
    >
      {/* Header */}

      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          text-text-primary
        "
      >
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-accent-light
          "
        >
          <Tag
            className="
              h-4
              w-4
              -rotate-90
              text-accent
            "
          />
        </div>

        <span
          className="
            text-sm
            font-semibold
            text-text-primary
          "
        >
          Coupon Code
        </span>
      </div>

      {/* Applied Coupon */}

      {coupon ? (
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            border-accent/20
            bg-accent-light
            px-4
            py-3
          "
        >
          <div className="min-w-0">
            <p
              className="
                truncate
                text-sm
                font-semibold
                text-accent
              "
            >
              Coupon "{coupon}" applied
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-text-secondary
              "
            >
              Your discount has been applied.
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeCoupon()}
            disabled={isRemoving}
            aria-label="Remove coupon"
            className="
              flex
              h-8
              w-8
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              text-text-muted
              transition-all
              hover:bg-surface-card
              hover:text-accent
              disabled:cursor-wait
              disabled:opacity-50
            "
          >
            {isRemoving ? (
              <Loader2
                className="
                  h-4
                  w-4
                  animate-spin
                  text-accent
                "
              />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : (
        /* Coupon Form */

        <form
          onSubmit={handleApply}
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          <div className="relative flex-1">
            <Tag
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-text-muted
              "
            />

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter coupon code"
              disabled={isApplying}
              className="
                w-full
                rounded-xl
                border
                border-border-subtle
                bg-surface-elevated
                py-2.5
                pl-10
                pr-4
                text-sm
                text-text-primary
                outline-none
                transition-all
                placeholder:text-text-muted
                focus:border-accent
                focus:ring-2
                focus:ring-accent/15
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>

          <button
            type="submit"
            disabled={isApplying || !code.trim()}
            className="
              flex
              min-w-[90px]
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-accent
              px-5
              py-2.5
              text-sm
              font-semibold
              text-accent
              transition-all
              duration-200
              hover:bg-accent
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
              disabled:hover:bg-transparent
              disabled:hover:text-accent
            "
          >
            {isApplying && (
              <Loader2
                className="
                  h-4
                  w-4
                  animate-spin
                "
              />
            )}

            <span>{isApplying ? "Applying..." : "Apply"}</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default CouponForm;
