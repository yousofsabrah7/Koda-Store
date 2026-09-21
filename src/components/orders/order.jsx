import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Order({ details }) {
  const navigate=useNavigate()
  const formatedData = new Date(details.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const statusStyle = {
    confirmed: "bg-green-500/10 text-green-600 border-green-500/20",
    returned: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
  };
  const currentStatus =
    statusStyle[details.status?.toLowerCase()] ||
    "bg-accent-light text-accent border-accent/20";
  return (
    <div
      key={details.id}
      onClick={()=> navigate(`/orders/${details.id}`)}
      className="group relative overflow-hidden bg-surface-card border border-border-subtle rounded-2xl p-5 sm:p-6
      shadow-sm hover:shadow-md hover:border-border-strong
      transition-all duration-300"
    >
      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
        {/* Order Information */}
        <div className="min-w-0 flex flex-col gap-3">
          {/* Order ID + Status */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-semibold text-text-primary tracking-wide">
              #{details.id.toUpperCase().slice(0, 8)}
            </p>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize border ${currentStatus}`}
            >
              {details.status}
            </span>
          </div>

          {/* Date */}
          <p className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>

            {formatedData}
          </p>

          {/* Items Count */}
          <p className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="text-text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7h12l1 14H5L6 7zM9 7a3 3 0 016 0"
                />
              </svg>
            </span>

            <span>{details.length_item}</span>
            <span>{details.length_item === 1 ? "item" : "items"}</span>
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-5 border-t border-border-subtle pt-4 sm:border-0 sm:pt-0">
          <div className="flex flex-col sm:items-end gap-1">
            <span className="text-xs text-text-muted">Order Total</span>

            <p className="text-lg sm:text-xl font-bold text-text-primary tabular-nums">
              EGP {Number(details.subprice).toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-elevated text-text-secondary group-hover:bg-accent-light group-hover:text-accent transition-all duration-300">
            <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
