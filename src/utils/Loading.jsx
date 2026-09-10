import { LoaderCircle } from "lucide-react";

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`
        animate-pulse-subtle
        rounded-xl
        bg-surface-elevated
        ${className}
      `}
    />
  );
};

const ProductsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-60 max-w-full" />
        </div>

        <Skeleton className="h-11 w-32" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-11 w-32" />
        <Skeleton className="h-11 w-32" />
        <Skeleton className="h-11 w-32" />
        <Skeleton className="h-11 w-32" />
      </div>

      {/* Products */}
      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-border-subtle
              bg-surface-card
            "
          >
            <Skeleton className="aspect-square w-full rounded-none" />

            <div className="space-y-3 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />

              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-12" />
              </div>

              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-11 w-32" />
        <Skeleton className="h-11 w-36" />
        <Skeleton className="h-11 w-32" />
        <Skeleton className="h-11 w-32" />
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border-subtle bg-surface-card md:block">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 border-b border-border-subtle p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="
              grid
              grid-cols-6
              items-center
              gap-4
              border-b
              border-border-subtle
              p-4
              last:border-b-0
            "
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-3 md:hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              space-y-4
              rounded-2xl
              border
              border-border-subtle
              bg-surface-card
              p-4
            "
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-28" />

            <div className="flex justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WishlistSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>

      {/* Wishlist Cards */}
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl
              border
              border-border-subtle
              bg-surface-card
              p-4
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >
              {Array.from({ length: 4 }).map((_, productIndex) => (
                <div key={productIndex} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>

      {/* Stats */}
      <div
        className="
          grid
          grid-cols-2
          gap-3
          md:grid-cols-2
          lg:grid-cols-4
        "
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl
              border
              border-border-subtle
              bg-surface-card
              p-5
            "
          >
            <Skeleton className="mb-4 size-10 rounded-xl" />
            <Skeleton className="mb-2 h-7 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-72 rounded-2xl border border-border-subtle bg-surface-card p-5">
          <Skeleton className="mb-6 h-5 w-32" />
          <Skeleton className="h-52 w-full" />
        </div>

        <div className="h-72 rounded-2xl border border-border-subtle bg-surface-card p-5">
          <Skeleton className="mb-6 h-5 w-32" />

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DefaultSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-4 w-64 max-w-full" />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl
              border
              border-border-subtle
              bg-surface-card
              p-4
            "
          >
            <Skeleton className="mb-4 aspect-square w-full" />
            <Skeleton className="mb-3 h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Loading = ({ page = "default", message }) => {
  const skeletons = {
    products: ProductsSkeleton,
    orders: OrdersSkeleton,
    wishlist: WishlistSkeleton,
    dashboard: DashboardSkeleton,
  };

  const SkeletonComponent = skeletons[page] || DefaultSkeleton;

  return (
    <section
      className="
        min-h-[50vh]
        w-full
        bg-surface-base
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
      aria-label={`${page} loading`}
      aria-busy="true"
    >
      {/* Loading Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-accent-light">
          <LoaderCircle size={18} className="animate-spin text-accent" />
        </div>

        <p className="text-sm text-text-secondary">
          {message || `Loading ${page}...`}
        </p>
      </div>

      <SkeletonComponent />
    </section>
  );
};

export default Loading;
