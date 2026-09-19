import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";

function ShippingPayment({paymentMethod,fullName,address,city,country,phone,priceTotal,date}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Shipping Address */}
      <div className="rounded-3xl border border-border-subtle bg-surface-card p-5 sm:p-7 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-accent-light text-accent">
            <FaLocationDot size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold">Shipping Address</h2>

            <p className="text-sm text-text-muted mt-1">Delivery information</p>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-elevated/70 border border-border-subtle p-4 sm:p-5 flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
              Full Name
            </p>

            <p className="font-semibold text-text-primary">
              {fullName}
            </p>
          </div>

          <div className="border-t border-border-subtle" />

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
              Address
            </p>

            <p className="text-sm leading-relaxed text-text-secondary">
              {address}
            </p>
          </div>

          <div className="border-t border-border-subtle" />

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
              City & Country
            </p>

            <p className="text-sm font-medium text-text-secondary">
              {city} ,{" "}
              {country}
            </p>
          </div>

          <div className="border-t border-border-subtle" />

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
              Phone
            </p>

            <p className="text-sm font-medium text-text-secondary">
              {phone}
            </p>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="rounded-3xl border border-border-subtle bg-surface-card p-5 sm:p-7 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-accent-light text-accent">
            <MdPayment size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold">Payment Summary</h2>

            <p className="text-sm text-text-muted mt-1">
              Your order payment details
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-elevated/70 border border-border-subtle p-4 sm:p-5">
          <div className="flex flex-col gap-2 mb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Payment Method
            </p>

            <p className="font-semibold text-text-primary capitalize">
              {paymentMethod}
            </p>
          </div>

          <div className="border-t border-dashed border-border-strong my-5" />

          <div className="flex justify-between items-center gap-4">
            <p className="text-sm text-text-secondary">Total</p>

            <p className="text-2xl font-bold text-accent tabular-nums">
              EGP {priceTotal}
            </p>
          </div>

          <div className="mt-5 rounded-xl bg-surface-card border border-border-subtle p-3">
            <p className="text-xs text-text-muted mb-1">Order Date</p>

            <p className="text-sm font-medium text-text-secondary">
              Placed on {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingPayment;
