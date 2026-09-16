import React from "react";

function Error() {
  return (
    <div className="col-span-full flex min-h-[500px] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-light">
          <span className="text-2xl font-semibold text-accent">∅</span>
        </div>

        <p className="text-sm font-semibold text-text-primary">
          No products found
        </p>

        <p className="text-xs text-text-muted">
          We couldn't find any products matching your search.
        </p>
      </div>
    </div>
  );
}

export default Error;
