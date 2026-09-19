import React from "react";
import { HiTemplate } from "react-icons/hi";

function ItemsOrder({ items }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-elevated/70 px-5 sm:px-7 py-5">
        <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-accent-light text-accent">
          <HiTemplate size={23} />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold">Order Items</h2>

          <p className="text-sm text-text-muted mt-1">
            Products included in your order
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col gap-3">
        {items.map((item) => {
          return (
            <div
              key={item.product}
              className="group flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 rounded-2xl border border-border-subtle bg-surface-base p-4 sm:p-5 hover:border-border-strong hover:shadow-sm transition-all duration-300"
            >
              <div className="flex gap-4 items-center min-w-0">
                <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-surface-elevated border border-border-subtle">
                  <img
                    src={item.image}
                    alt="img"
                    width={70}
                    height={80}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">
                    Product
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                    <span className="text-text-muted">Qty:</span>

                    <span className="font-semibold tabular-nums">
                      {item.quantity}
                    </span>

                    <span className="text-text-muted">×</span>

                    <span className="text-text-muted">EGP</span>

                    <span className="font-medium tabular-nums">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-border-subtle pt-3 sm:border-0 sm:pt-0">
                <span className="text-sm text-text-muted">Subtotal</span>

                <p className="text-lg font-bold text-accent tabular-nums">
                  EGP {Number(item.quantity) * Number(item.price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsOrder;
