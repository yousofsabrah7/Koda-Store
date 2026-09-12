import React from "react";
import { ArrowLeft, PackageCheck } from "lucide-react";

function ProductHeader({ onBack }) {
  return (
    <div className="mb-7 flex w-full flex-col gap-5 overflow-hidden rounded-3xl border border-border-subtle bg-surface-card p-5 shadow-sm sm:p-6 lg:p-7">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-elevated px-3.5 py-2 text-xs font-semibold text-text-secondary transition-all hover:border-border-strong hover:bg-surface-card hover:text-text-primary active:scale-[0.98]"
        >
          <ArrowLeft size={15} />
          Back to products
        </button>
      </div>

      {/* Main Header Content */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Icon + Title + Description */}
        <div className="flex items-start gap-4">
          {/* Product Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/20 bg-accent-light text-accent">
            <PackageCheck size={22} />
          </div>

          <div className="min-w-0">
            <div className="mb-1 text-[10px] font-bold tracking-[0.12em] text-accent">
              CREATE PRODUCT
            </div>

            <h1 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl lg:text-[28px]">
              Launch a polished product entry
            </h1>

            <p className="mt-1.5 max-w-2xl text-xs leading-5 text-text-muted sm:text-sm">
              Add products with validation, image previews, multi-upload
              support, and smooth UX.
            </p>
          </div>
        </div>

        {/* READY Card */}
        <div className="w-full rounded-2xl border border-border-subtle bg-surface-elevated/60 px-4 py-3.5 lg:w-auto lg:min-w-[220px] lg:max-w-[260px]">
          <div className="mb-1 text-[10px] font-bold tracking-[0.12em] text-accent">
            READY
          </div>

          <p className="text-xs leading-5 text-text-secondary">
            Create, validate, and save with one click.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductHeader;
