import React from "react";
import { Image, Upload, Trash2 } from "lucide-react";

function ImageGallery({ images, onImageChange, onRemoveImage }) {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-5
        rounded-3xl
        border
        border-border-subtle
        bg-surface-card
        p-4
        sm:p-5
      "
    >
      {/* =========================
          Gallery Header
      ========================= */}

      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-accent-light
            text-accent
          "
        >
          <Image size={19} />
        </div>

        <div className="min-w-0">
          <h3
            className="
              text-sm
              font-semibold
              text-text-primary
            "
          >
            Gallery
          </h3>

          <p
            className="
              mt-0.5
              text-xs
              leading-5
              text-text-muted
            "
          >
            Upload multiple images and preview instantly.
          </p>
        </div>
      </div>

      {/* =========================
          Images
      ========================= */}

      {images && images.length > 0 && (
        <div className="flex w-full flex-col gap-3">
          {images.map((imgSrc, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border-subtle
                bg-surface-base
              "
            >
              {/* =======================
                  Image Frame
              ======================= */}

              <div
                className="
                  flex
                  h-[300px]
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  bg-surface-elevated

                  sm:h-[340px]

                  lg:h-[280px]

                  xl:h-[320px]
                "
              >
                <img
                  src={imgSrc}
                  alt={`Uploaded ${index + 1}`}
                  className="
                    block
                    h-full
                    w-full
                    object-cover
                  "
                />
              </div>

              {/* =======================
                  Image Info
              ======================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-t
                  border-border-subtle
                  bg-surface-card
                  px-3.5
                  py-3
                "
              >
                <span
                  className="
                    text-[10px]
                    font-bold
                    tracking-[0.08em]
                    text-text-muted
                  "
                >
                  IMAGE {index + 1}
                </span>

                {/* ===================
                    Delete Uploaded
                =================== */}

                {index > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    aria-label={`Delete image ${index + 1}`}
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-lg
                      px-2
                      py-1.5
                      text-xs
                      font-medium
                      text-red-500
                      transition
                      hover:bg-red-500/10
                    "
                  >
                    <Trash2 size={14} />

                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          Upload Area
      ========================= */}

      <label
        className="
          group
          flex
          w-full
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-border-strong
          bg-surface-elevated/40
          px-4
          py-7
          text-center
          transition

          hover:border-accent
          hover:bg-accent-light
        "
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
        />

        {/* Upload Icon */}

        <div
          className="
            mb-3
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-accent-light
            text-accent
            transition
            group-hover:scale-105
          "
        >
          <Upload size={19} />
        </div>

        {/* Upload Title */}

        <span
          className="
            text-sm
            font-semibold
            text-text-primary
          "
        >
          Upload images
        </span>

        {/* Upload Description */}

        <span
          className="
            mt-1
            text-xs
            text-text-muted
          "
        >
          PNG, JPG, WEBP • multiple files supported
        </span>
      </label>
    </div>
  );
}

export default ImageGallery;
