// src/components/products/productCart.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination  } from "swiper/modules";
import { Star, Eye, Pencil, SlidersHorizontal, Trash2 } from "lucide-react";
import { useDeleteProduct } from "../../services/apiHooks/productsHook";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "../../utils/Loading";

function ProductsCard({ products, isLoading, isError }) {
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure To Delete ? ")) {
      deleteProduct.mutate(id);
    }
  };
  if (isLoading) {
    return <Loading page="products" message={"We are getting our products"} />;
  }

  if (isError) {
    return <div className="w-[90%]">Wrong</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {products.map((product) => {
        const {
          id = product._id,
          images = [],
          featured,
          stock,
          name,
          category,
          subcategory,
          brand,
          shortDescription,
          price,
          discount,
          tags = [],
          onEdit,
          onQuickEdit,
        } = product;

        const breadcrumb = [category, subcategory, brand].filter(Boolean);

        return (
          <div
            key={id}
            className="w-full bg-surface-card rounded-3xl border border-border-subtle overflow-hidden flex flex-col"
          >
            <div className="group relative w-full h-[220px] sm:h-[260px] overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop={images.length > 1}
                className="w-full h-full
                [&_.swiper-button-next]:opacity-0
                [&_.swiper-button-prev]:opacity-0
                [&_.swiper-button-next]:transition-opacity
                [&_.swiper-button-prev]:transition-opacity
                [&_.swiper-button-next]:duration-300
                [&_.swiper-button-prev]:duration-300
                group-hover:[&_.swiper-button-next]:opacity-100
                group-hover:[&_.swiper-button-prev]:opacity-100
                [&_.swiper-button-next]:!w-8
                [&_.swiper-button-next]:!h-8
                [&_.swiper-button-prev]:!w-8
                [&_.swiper-button-prev]:!h-8
                [&_.swiper-button-next]:after:!text-sm
                [&_.swiper-button-prev]:after:!text-sm
              
                [&_.swiper-button-next]:rounded-full
                [&_.swiper-button-prev]:rounded-full
                [&_.swiper-button-next]:text-white
                [&_.swiper-button-prev]:text-white
              "
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img.url}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300 ease-linear"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {featured && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-3 flex items-center gap-1.5 bg-accent text-white font-bold text-xs sm:text-sm rounded-xl px-3 py-1.5 sm:px-4 sm:py-2">
                  <Star size={14} fill="currentColor" className="sm:hidden" />
                  <Star
                    size={16}
                    fill="currentColor"
                    className="hidden sm:block"
                  />
                  Featured
                </div>
              )}

              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 bg-surface-card text-text-primary font-bold text-xs sm:text-sm rounded-full px-4 py-1.5 sm:px-5 sm:py-2 border border-border-subtle">
                {stock} in stock
              </div>
            </div>

            <div className="py-4 px-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-text-primary">
                {name.length > 28 ? name.slice(0, 28) + " ...." : name}
              </h3>

              <p className="text-text-muted text-xs font-semibold uppercase tracking-wide mt-1">
                {breadcrumb.join(" - ")}
              </p>

              <p className="text-text-secondary text-sm mt-3">
                {shortDescription.length > 45
                  ? shortDescription.slice(0, 45) + " ...."
                  : shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                  ${price}
                </span>
                {discount > 0 && (
                  <span className="text-emerald-500 font-semibold text-sm">
                    −${discount} off
                  </span>
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-surface-elevated text-text-secondary text-xs rounded-full px-3 py-1 sm:px-4 sm:py-1.5 border border-border-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-6">
                <div className="border-t border-border-subtle mb-4" />

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => {
                      navigate(`/products/view/${id}`)
                    }}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 bg-surface-elevated text-text-secondary hover:bg-border-subtle hover:text-text-primary transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={onEdit}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 bg-accent-light text-accent hover:bg-accent/20 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                  <button
                    onClick={onQuickEdit}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <SlidersHorizontal size={16} />
                    Quick Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsCard;
