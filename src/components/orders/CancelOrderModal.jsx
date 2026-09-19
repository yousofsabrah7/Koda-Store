import React from "react";
import { VscError } from "react-icons/vsc";

function CancelOrderModal({ isOpen, onKeepOrder, onCancelOrder , pending }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-2xl">
        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <VscError className="text-3xl text-red-500" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-primary">
            Cancel Order?
          </h2>

          <p className="mt-3 text-md leading-6 text-text-secondary">
            Are you sure you want to cancel this order?
           
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={onKeepOrder}
            className="flex-1 rounded-xl border border-border-strong bg-surface-elevated px-4 py-3 font-medium text-text-primary transition-colors hover:bg-surface-base"
          >
            Keep Order
          </button>

          <button
            onClick={onCancelOrder}
            className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition-colors hover:bg-red-600"
          >
           {pending ? "loading ..." : "Cancel Order"} 
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelOrderModal;