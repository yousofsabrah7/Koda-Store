import ProductCard from "./ProductCard";

export default function ProductGrid({ products, hasMore, onLoadMore }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
        <p className="text-gray-500 text-sm">No products found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      {/* load more button */}
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="mt-10 px-8 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 active:bg-gray-100 transition shadow-xs cursor-pointer"
        >
          Load More
        </button>
      )}
    </div>
  );
}