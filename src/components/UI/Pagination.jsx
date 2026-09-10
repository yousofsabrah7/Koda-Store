import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({
  currentPage ,
  totalPages,
  onPageChange,
}) => {
  const paginationBar = () => {
    const pages = [];

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      const isActive = currentPage === i;

      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => onPageChange?.(i)}
          disabled={isActive}
          className={`
            flex h-9 min-w-9 items-center justify-center
            rounded-lg border px-2
            text-sm font-medium
            transition-all duration-200

            ${
              isActive
                ? `
                  cursor-default
                  border-accent
                  bg-accent
                  text-white
                  shadow-sm
                `
                : `
                  border-border-subtle
                  bg-surface-card
                  text-text-secondary
                  hover:border-border-strong
                  hover:bg-accent-light
                  hover:text-accent
                `
            }
          `}
        >
          {i && i}
        </button>,
      );
    }

    return (
      <div className="flex items-center gap-1.5">
        {pages}
      </div>
    );
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <div
      className="
        flex items-center justify-between
        gap-4
        rounded-xl
        border border-border-subtle
        bg-surface-card
        px-5 py-3
      "
    >
      {/* Page Info */}
      <div className="text-sm text-text-secondary">
        Page{" "}
        <span className="font-semibold text-text-primary">
          {currentPage && currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-text-primary">
          {totalPages && totalPages}
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={handlePrevious}
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-lg
            border border-border-subtle
            bg-surface-card
            text-text-secondary
            transition-all duration-200
            hover:border-border-strong
            hover:bg-surface-elevated
            hover:text-text-primary
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="Previous page"
        >
          <ArrowLeft size={17} strokeWidth={1.8} />
        </button>

        {paginationBar()}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={handleNext}
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-lg
            border border-border-subtle
            bg-surface-card
            text-text-secondary
            transition-all duration-200
            hover:border-border-strong
            hover:bg-surface-elevated
            hover:text-text-primary
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="Next page"
        >
          <ArrowRight size={17} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
