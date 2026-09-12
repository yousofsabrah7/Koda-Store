
import React, { useState } from "react";

import ImageGallery from "./ImageGallery";
import ProductFormFields from "./ProductFormFields";
import ProductHeader from "./ProductHeader";

import coverImage1 from "./images/cover.png";
import coverImage2 from "./images/cover1.png";

import { validateProductForm } from "./productValidation";
import { useCreateProduct } from "../../services/apiHooks/productsHook";
function AddProduct() {
  /* =========================
     Images
  ========================= */

  const [images, setImages] = useState([
    coverImage1,
    coverImage2,
  ]);

  /* =========================
     Form Data
  ========================= */

  const [formData, setFormData] = useState({
    name: "",
    shortDesc: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    category: "electronics",
    subcategory: "",
    brand: "",
    tags: [],
    featured: false,
    active: true,
  });

  /* =========================
     State
  ========================= */

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");

  /* =========================
     Mutation
  ========================= */

  const createProductMutation = useCreateProduct();

  const isLoading = createProductMutation.isPending;

  /* =========================
     Image Change
  ========================= */

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const newImageUrls = files.map((file) =>
      URL.createObjectURL(file),
    );

    setImages((prev) => [
      ...prev,
      ...newImageUrls,
    ]);
  };

  /* =========================
     Remove Image
  ========================= */

  const handleRemoveImage = (indexToRemove) => {
    if (
      indexToRemove === 0 ||
      indexToRemove === 1
    ) {
      alert(
        "لا يمكن حذف الصور الرئيسية الثابتة للمنتج!",
      );

      return;
    }

    setImages((prev) =>
      prev.filter(
        (_, index) =>
          index !== indexToRemove,
      ),
    );
  };

  /* =========================
     Form Change
  ========================= */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => {
      const newErrors = {
        ...prev,
      };

      delete newErrors[name];

      return newErrors;
    });
  };

  /* =========================
     Add Tag
  ========================= */

  const handleAddTag = () => {
    const newTag = tagInput.trim();

    if (!newTag) return;

    setFormData((prev) => ({
      ...prev,
      tags: [
        ...prev.tags,
        newTag,
      ],
    }));

    setTagInput("");
  };

  /* =========================
     Remove Tag
  ========================= */

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(
        (tag) =>
          tag !== tagToRemove,
      ),
    }));
  };

  /* =========================
     Cancel
  ========================= */

  const handleCancel = () => {
    window.history.back();
  };

  /* =========================
     Submit
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const validationErrors =
      validateProductForm(formData);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);

      return;
    }

    const productData = {
      name: formData.name,

      shortDescription:
        formData.shortDesc,

      description:
        formData.description,

      price: Number(formData.price),

      ...(formData.discountPrice !== ""
        ? {
            discountPrice: Number(
              formData.discountPrice,
            ),
          }
        : {}),

      stock: Number(formData.stock),

      sku: formData.sku,

      category: formData.category,

      subcategory:
        formData.subcategory,

      brand: formData.brand,

      tags: formData.tags,

      featured: formData.featured,

      active: formData.active,

      images: [
        {
          url:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        },
        {
          url:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        },
      ],
    };

    try {
      await createProductMutation.mutateAsync(
        productData,
      );

      setErrors({});
    } catch (error) {
      console.error(
        "API ERROR:",
        error,
      );

      const errorMessage =
        error?.message ||
        "حدث خطأ أثناء حفظ المنتج، حاول مرة أخرى.";

      setErrors({
        general: errorMessage,
      });
    }
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-surface-base
        pb-12
        text-text-primary
      "
    >
      {/* =========================
          Page Container
      ========================= */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
          px-4
          py-5
          sm:px-6
          lg:px-8
        "
      >
        {/* =========================
            Header
        ========================= */}

        <ProductHeader
          onBack={handleCancel}
        />

        {/* =========================
            General Error
        ========================= */}

        {errors.general && (
          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-3.5
              text-sm
              text-red-500
            "
          >
            <span
              className="
                mt-0.5
                shrink-0
              "
            >
              ⚠️
            </span>

            <span>
              {errors.general}
            </span>
          </div>
        )}

        {/* =========================
            Form
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="
            mt-6
            grid
            grid-cols-1
            items-start
            gap-5
            lg:grid-cols-[320px_minmax(0,1fr)]
            xl:grid-cols-[350px_minmax(0,1fr)]
          "
        >
          {/* =======================
              Image Gallery
          ======================= */}

          <div
            className="
              lg:sticky
              lg:top-6
              lg:self-start
            "
          >
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-border-subtle
                bg-surface-card
                p-4
                shadow-sm
              "
            >
              <div className="mb-4">
                <h2
                  className="
                    text-sm
                    font-semibold
                    text-text-primary
                  "
                >
                  Product Images
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-text-muted
                  "
                >
                  Add and manage product images
                </p>
              </div>

              <ImageGallery
                images={images}
                onImageChange={
                  handleImageChange
                }
                onRemoveImage={
                  handleRemoveImage
                }
              />
            </div>
          </div>

          {/* =======================
              Product Information
          ======================= */}

          <div
            className="
              min-w-0
              overflow-hidden
              rounded-3xl
              border
              border-border-subtle
              bg-surface-card
              shadow-sm
            "
          >
            {/* Form Header */}

            <div
              className="
                border-b
                border-border-subtle
                px-5
                py-4
                sm:px-6
              "
            >
              <h2
                className="
                  text-base
                  font-semibold
                  text-text-primary
                "
              >
                Product Information
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-text-muted
                "
              >
                Fill in the details below
                to create your product.
              </p>
            </div>

            {/* Form Fields */}

            <div className="p-5 sm:p-6">
              <ProductFormFields
                formData={formData}
                errors={errors}
                onChange={handleChange}
                isLoading={isLoading}
                tagInput={tagInput}
                setTagInput={setTagInput}
                onAddTag={handleAddTag}
                onRemoveTag={
                  handleRemoveTag
                }
                onCancel={handleCancel}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
