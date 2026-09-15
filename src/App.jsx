import React, { useState } from "react";
import { mockProducts } from "./components/data/mockProducts";
import Shop from "./components/pages/ShopPage"
const ItemsPerPage = 12;

const App = () => {
  const [visibleCount, setVisibleCount] = useState(ItemsPerPage);
  const displayedProducts = mockProducts.slice(0, visibleCount);
  const hasMore = visibleCount < mockProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ItemsPerPage);
  };

  return (
    <Shop /> 
    // <div className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-7xl mx-auto">
    //     <ProductGrid
    //       products={displayedProducts}
    //       hasMore={hasMore}
    //       onLoadMore={handleLoadMore}
    //     />
    //   </div>
    // </div>
  );
};

export default App;