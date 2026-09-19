import React, { useEffect, useState } from "react";
import { useProducts } from "../../../services/apiHooks/productsHook"
import Cartproduct from "../../Card/Cartproduct";
import Error from "../HandelError/Error";
import Loading from "../HandelLoading/Loading";
function Viewproducts() {
  const { data: response, isLoading, isError } = useProducts(1, 8);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6 relative">
      {isError ? (
          <Error />
      ) : isLoading ? (
       <Loading />
      ) : (
        response?.products?.map((p) => {
          const product = {
            id: p._id,
            image: p.images[0].url,
            category: p.category,
            shortDescription: p.shortDescription,
            priceBeforeDiscount: p.price,
            priceAfterDiscount: p.discountPrice,
            rating: p.averageRating,
            reviewsCount: p.numReviews,
            discountPercentage: Math.round(
              ((p.price - p.discountPrice) / p.price) * 100,
            ),
          };
          return <Cartproduct key={product.id} product={{ ...product }} />;
        })
      )}
    </div>
  );
}

export default Viewproducts;
