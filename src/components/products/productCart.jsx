import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { Star, Eye, Pencil, SlidersHorizontal, Trash2 } from "lucide-react";

import { useDeleteProduct } from "../../services/apiHooks/productsHook";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Loading from "../../utils/Loading";
import ErrorState from "../UI/Error";

function ProductsCard({ products, isLoading, isError, onEdit, onQuickEdit }) {
  const deleteProduct = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure To Delete?")) {
      deleteProduct.mutate(id);
    }
  };

  if (isLoading) {
    return <Loading page="products" message="We are getting our products" />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!products?.length) {
    return (
      <div className="flex min-h-[250px] items-center justify-center rounded-3xl border border-border-subtle bg-surface-card">
        <p className="text-sm font-medium text-text-muted">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const {
          _id,
          images = [],
          featured,
          stock,
          name = "",
          category,
          subcategory,
          brand,
          shortDescription = "",
          price,
          discount,
          tags = [],
        } = product;

        const id = _id;

        const breadcrumb = [category, subcategory, brand].filter(Boolean);

        return (
          <div
            key={id}
            className="flex w-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface-card shadow-sm transition-shadow hover:shadow-md"
          >
            {/* ================= IMAGE ================= */}
            <div className="group relative h-[220px] w-full overflow-hidden sm:h-[260px]">
              {images.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={images.length > 1}
                  pagination={images.length > 1 ? { clickable: true } : false}
                  loop={images.length > 1}
                  className="
                    h-full w-full

                    [&_.swiper-button-next]:!h-8
                    [&_.swiper-button-next]:!w-8
                    [&_.swiper-button-next]:rounded-full
                    [&_.swiper-button-next]:bg-black/30
                    [&_.swiper-button-next]:text-white
                    [&_.swiper-button-next]:opacity-0
                    [&_.swiper-button-next]:transition-opacity
                    [&_.swiper-button-next]:duration-300
                    group-hover:[&_.swiper-button-next]:opacity-100

                    [&_.swiper-button-prev]:!h-8
                    [&_.swiper-button-prev]:!w-8
                    [&_.swiper-button-prev]:rounded-full
                    [&_.swiper-button-prev]:bg-black/30
                    [&_.swiper-button-prev]:text-white
                    [&_.swiper-button-prev]:opacity-0
                    [&_.swiper-button-prev]:transition-opacity
                    [&_.swiper-button-prev]:duration-300
                    group-hover:[&_.swiper-button-prev]:opacity-100

                    [&_.swiper-button-next]:after:!text-sm
                    [&_.swiper-button-prev]:after:!text-sm

                    [&_.swiper-pagination-bullet]:!bg-white
                  "
                >
                  {images.map((img, index) => {
                    const imageUrl = typeof img === "string" ? img : img?.url;

                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={imageUrl}
                          alt={`${name} image ${index + 1}`}
                          className="h-full w-full object-cover transition duration-300 ease-linear group-hover:scale-105"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-elevated">
                  <span className="text-sm text-text-muted">No image</span>
                </div>
              )}

              {/* Featured */}
              {featured && (
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 text-xs font-bold text-white sm:left-4 sm:top-4 sm:px-4 sm:py-2 sm:text-sm">
                  <Star size={14} fill="currentColor" className="sm:hidden" />
                  <Star
                    size={16}
                    fill="currentColor"
                    className="hidden sm:block"
                  />
                  Featured
                </div>
              )}

              {/* Stock */}
              <div className="absolute bottom-3 right-3 z-10 rounded-full border border-border-subtle bg-surface-card px-4 py-1.5 text-xs font-bold text-text-primary sm:bottom-4 sm:right-4 sm:px-5 sm:py-2 sm:text-sm">
                {stock} in stock
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
              {/* Name */}
              <h3 className="text-xl font-bold text-text-primary sm:text-2xl">
                {name.length > 28 ? `${name.slice(0, 28)} ....` : name}
              </h3>

              {/* Breadcrumb */}
              {breadcrumb.length > 0 && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {breadcrumb.join(" - ")}
                </p>
              )}

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {shortDescription.length > 45
                  ? `${shortDescription.slice(0, 45)} ....`
                  : shortDescription}
              </p>

              {/* Price */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-2xl font-extrabold text-text-primary sm:text-3xl">
                  ${price}
                </span>

                {discount > 0 && (
                  <span className="text-sm font-semibold text-emerald-500">
                    −${discount} off
                  </span>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-border-subtle bg-surface-elevated px-3 py-1 text-xs text-text-secondary sm:px-4 sm:py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* ================= ACTIONS ================= */}
              <div className="mt-auto pt-6">
                <div className="mb-4 border-t border-border-subtle" />

                <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                  {/* View */}
                  <button
                    type="button"
                    onClick={() => navigate(`/products/view/${id}`)}
                    className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-surface-elevated px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-border-subtle hover:text-text-primary"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => onEdit?.(product)}
                    className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-accent-light px-3 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  {/* Quick Edit */}
                  <button
                    type="button"
                    onClick={() => onQuickEdit?.(product)}
                    className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-amber-500/10 px-3 py-2.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-500/20 dark:text-amber-400"
                  >
                    <SlidersHorizontal size={16} />
                    Quick Edit
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDelete(id)}
                    className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-red-500/10 px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/20 dark:text-red-400"
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
