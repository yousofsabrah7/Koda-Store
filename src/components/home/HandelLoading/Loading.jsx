import React from "react";

function Loading() {
  return (
    <div className="absolute top-7 inset-0 z-20 flex items-center justify-center rounded-2xl bg-surface-base/70 ">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border-subtle bg-surface-card/90 px-8 py-6 shadow-lg">
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-accent-light" />
          <div className="relative h-10 w-10 animate-spin rounded-full border-[3px] border-border-subtle border-t-accent" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-text-primary">
            Loading products
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
