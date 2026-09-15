import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Viewproducts from "./viewproducts";
function FeatureProducts() {
  return (
      <div className="">
        {/* Title & Link view */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl text-text-primary">Featured Products</h2>
            <p className="text-lg text-text-muted">Handpicked just for you</p>
          </div>
          <div>
            <Link to={"/shop"} className="flex gap-2 text-accent-hover items-center font-medium">
               <p>View All</p>
                <FaArrowRightLong className="hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
        {/* Products */}
        <div>
            <Viewproducts   />
        </div>
      </div>
  );
}

export default FeatureProducts;
