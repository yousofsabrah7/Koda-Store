// src/pages/Products/viewProduct.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Tag, LayoutGrid } from "lucide-react";
import { useProduct } from "../../services/apiHooks/productsHook";
import Loading from "../../utils/Loading";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function ViewProduct() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProduct(id);
  const product = data?.product;

  if (isLoading) {
    return <Loading page="product" message="Loading product details" />;
  }

  if (isError || !product) {
    return <div className="p-6 text-text-primary">Product not found</div>;
  }

  const {
    name,
    shortDescription,
    price,
    discount,
    stock,
    sku,
    images = [],
    tags = [],
    category,
    subcategory,
    brand,
  } = product;

  const breadcrumb = [category, subcategory, brand].filter(Boolean);

  return (
    <div>
      <div className="w-[95%] m-auto pt-8">
        <div className="div1 flex flex-col items-center gap-4 bg-surface-card rounded-[25px] p-8 border border-border-subtle">
          <button
            className="flex flex-row cursor-pointer self-start"
            onClick={() => {
              navigate("/products");
            }}
          >
            <IoIosArrowRoundBack size={30} className="mr-2" />
            Back
          </button>
          <div className="flex flex-row w-full">
            <div className="flex items-center justify-center bg-accent-light rounded-2xl size-15 shrink-0 border border-border-subtle ">
              <FaRegEye size={28} className="text-accent" />
            </div>
            <div className="ml-4">
              <h5 className="text-text-primary text-xl md:text-3xl font-extrabold">
                {name}
              </h5>
              <p className="text-accent text-xs font-semibold tracking-[1px]">
                Product details overview
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 m-auto">
        <div className="flex flex-col gap-4">

        <div className="w-full h-[280px] sm:h-[380px] lg:h-[440px] rounded-3xl overflow-hidden bg-surface-card border border-border-subtle">
            <Swiper
              modules={[Navigation, Thumbs]}
              navigation
              loop={images.length > 1}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed
                    ? thumbsSwiper
                    : null,
              }}
              className="w-full h-full"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img.url}
                    alt={`${name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            className="w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img.url}
                  alt={`${name} ${index + 1}`}
                  className="h-20 w-full rounded-xl border border-border-subtle object-cover cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
        
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-surface-card border border-border-subtle rounded-3xl p-5 sm:p-6">
            <h5 className="text-accent text-xs font-semibold tracking-wide">
              Overview
            </h5>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">
              {name}
            </h1>
            <p className="text-text-secondary text-sm sm:text-base mt-3 leading-relaxed">
              {shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">Price</p>
              <p className="text-text-primary text-xl sm:text-2xl font-bold mt-1">
                ${price}
              </p>
            </div>
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">Discount</p>
              <p className="text-text-primary text-xl sm:text-2xl font-bold mt-1">
                ${discount}
              </p>
            </div>
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">Stock</p>
              <p className="text-text-primary text-xl sm:text-2xl font-bold mt-1">
                {stock}
              </p>
            </div>
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <p className="text-text-muted text-xs font-semibold">SKU</p>
              <p className="text-text-primary text-lg sm:text-xl font-bold mt-1 truncate">
                {sku}
              </p>
            </div>
          </div>

          {tags.length > 0 && (
            <div className="bg-surface-card border border-border-subtle rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-text-primary font-semibold text-sm">
                <Tag size={16} />
                Tags
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-surface-elevated text-text-secondary text-xs sm:text-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5 border border-border-subtle"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {breadcrumb.length > 0 && (
            <div className="bg-surface-elevated border border-border-subtle rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 text-text-primary font-semibold text-sm">
                <LayoutGrid size={16} />
                Category Info
              </div>
              <p className="text-text-secondary text-sm mt-2">
                {breadcrumb.join(" • ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;