import React from "react";
import {
  useRemoveCartItem,
  useUpdateItemQuantity,
} from "../../services/apiHooks/cartHooks";
import { Loader2, Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
  const { mutate: updateQuantity, isPending: isUpdating } =
    useUpdateItemQuantity();

  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();

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

  const isDisabled = isUpdating || isRemoving;

  return (
    <div
      className="
        flex
        items-start
        gap-4
        border-b
        border-border-subtle
        py-5
        last:border-b-0
      "
    >
      {/* Product Image */}

      <div
        className="
          flex
          h-16
          w-16
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-xl
          border
          border-border-subtle
          bg-surface-elevated
          sm:h-20
          sm:w-20
        "
      >
        <img
          src={item.image}
          alt={item.name}
          className="
            h-full
            w-full
            object-contain
            p-1
          "
        />
      </div>

      {/* Product Info */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          justify-between
          self-stretch
          gap-2
        "
      >
        {/* Product Name + Remove */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <h3
            title={item.name}
            className="
              min-w-0
              flex-1
              truncate
              text-sm
              font-semibold
              text-text-primary
            "
          >
            {item.name}
          </h3>

          <button
            type="button"
            onClick={handleRemove}
            disabled={isDisabled}
            aria-label="Remove item"
            className="
              flex
              h-7
              w-7
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-lg
              text-text-muted
              transition-all
              duration-200
              hover:bg-accent-light
              hover:text-accent
              disabled:cursor-not-allowed
              disabled:opacity-40
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
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Unit Price */}

        <p
          className="
            text-sm
            font-bold
            text-accent
          "
        >
          EGP {item.price?.toLocaleString()}
        </p>

        {/* Quantity + Total */}

        <div
          className="
            mt-1
            flex
            items-center
            justify-between
            gap-4
          "
        >
          {/* Quantity Controls */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <button
              type="button"
              onClick={handleDecrease}
              disabled={isDisabled || item.quantity <= 1}
              aria-label="Decrease quantity"
              className="
                flex
                h-7
                w-7
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                border
                border-border-subtle
                bg-surface-elevated
                text-sm
                font-semibold
                text-text-secondary
                transition-all
                hover:border-accent
                hover:bg-accent-light
                hover:text-accent
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              −
            </button>

            <div
              className="
                flex
                min-w-[28px]
                items-center
                justify-center
                text-xs
                font-semibold
                tabular-nums
                text-text-primary
              "
            >
              {isUpdating ? (
                <Loader2
                  className="
                    h-3.5
                    w-3.5
                    animate-spin
                    text-accent
                  "
                />
              ) : (
                item.quantity
              )}
            </div>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={isDisabled}
              aria-label="Increase quantity"
              className="
                flex
                h-7
                w-7
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                border
                border-border-subtle
                bg-surface-elevated
                text-sm
                font-semibold
                text-text-secondary
                transition-all
                hover:border-accent
                hover:bg-accent-light
                hover:text-accent
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              +
            </button>
          </div>

          {/* Item Total */}

          <p
            className={`
              text-sm
              font-bold
              text-text-primary
              transition-opacity
              duration-200
              ${isUpdating ? "opacity-30" : "opacity-100"}
            `}
          >
            EGP {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
