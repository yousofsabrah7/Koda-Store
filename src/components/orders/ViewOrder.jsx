import {
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  StickyNote,
  Save,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

const ViewOrder = ({
  showOrder,
  setShowOrder,
  order,
  onStatusChange,
  isUpdatingStatus = false,
}) => {
  const [status, setStatus] = useState("");
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.status || "");
      setAdminNote(order.adminNote || "");
    }
  }, [order]);

  if (!order) return null;

  const handleSave = () => {
    onStatusChange({
      status,
      adminNote,
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={setShowOrder}
        className={`
          absolute inset-0 z-40
          bg-black/20
          backdrop-blur-sm
          transition-opacity duration-300
          ${
            showOrder
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          absolute right-0 top-0 z-50
          h-full w-full sm:w-[420px]
          bg-surface-card
          border-l border-border-subtle
          shadow-[-20px_0_50px_rgba(0,0,0,0.12)]
          transition-transform duration-300 ease-out
          ${showOrder ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-text-primary">
                Order Details
              </h2>

              <p className="mt-1 font-mono text-[11px] text-text-muted">
                #{order._id?.slice(-8).toUpperCase()}
              </p>
            </div>

            <button
              type="button"
              onClick={setShowOrder}
              className="flex size-9 items-center justify-center rounded-xl text-text-muted transition hover:bg-surface-elevated hover:text-text-primary"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-5 p-5">
              {/* Status & Admin Note */}
              <section className="rounded-2xl border border-border-subtle bg-surface-elevated p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Package size={17} className="text-accent" />

                  <h3 className="text-sm font-semibold text-text-primary">
                    Order Management
                  </h3>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-text-secondary">
                    Order Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={isUpdatingStatus}
                    className="
                      w-full rounded-xl
                      border border-border-subtle
                      bg-surface-card
                      px-3 py-2.5
                      text-sm text-text-primary
                      outline-none
                      transition
                      focus:border-accent
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {STATUS_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Admin Note */}
                <div className="mt-4">
                  <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                    <StickyNote size={13} />
                    Admin Note
                  </label>

                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    disabled={isUpdatingStatus}
                    rows={4}
                    placeholder="Add a note for this order..."
                    className="
                      w-full resize-none rounded-xl
                      border border-border-subtle
                      bg-surface-card
                      px-3 py-2.5
                      text-sm text-text-primary
                      placeholder:text-text-muted
                      outline-none
                      transition
                      focus:border-accent
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>

                {/* Save */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isUpdatingStatus}
                  className="
                    mt-4 flex w-full items-center justify-center gap-2
                    rounded-xl bg-accent
                    px-4 py-2.5
                    text-sm font-semibold text-white
                    transition
                    hover:bg-accent-hover
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isUpdatingStatus ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </section>

              {/* Customer */}
              <section className="rounded-2xl border border-border-subtle bg-surface-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <User size={17} className="text-accent" />

                  <h3 className="text-sm font-semibold text-text-primary">
                    Customer
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">
                    {order.user?.username || "Unknown user"}
                  </p>

                  <p className="text-xs text-text-muted">
                    {order.user?.email || "No email"}
                  </p>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="rounded-2xl border border-border-subtle bg-surface-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin size={17} className="text-accent" />

                  <h3 className="text-sm font-semibold text-text-primary">
                    Shipping Address
                  </h3>
                </div>

                <div className="space-y-1.5 text-sm text-text-secondary">
                  <p>{order.shippingAddress?.fullName}</p>
                  <p>{order.shippingAddress?.phone}</p>
                  <p>
                    {order.shippingAddress?.address},{" "}
                    {order.shippingAddress?.city}
                  </p>
                  <p>
                    {order.shippingAddress?.country}{" "}
                    {order.shippingAddress?.postalCode}
                  </p>
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-2xl border border-border-subtle bg-surface-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard size={17} className="text-accent" />

                  <h3 className="text-sm font-semibold text-text-primary">
                    Payment
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] text-text-muted">Method</p>
                    <p className="mt-1 text-sm font-medium text-text-primary">
                      {order.paymentMethod || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-text-muted">Status</p>
                    <p className="mt-1 text-sm font-medium text-text-primary">
                      {order.paymentStatus || "—"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Products */}
              <section className="rounded-2xl border border-border-subtle bg-surface-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Package size={17} className="text-accent" />

                  <h3 className="text-sm font-semibold text-text-primary">
                    Products
                  </h3>
                </div>

                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div
                      key={item.product}
                      className="flex gap-3 rounded-xl bg-surface-elevated p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-14 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-text-primary">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-text-muted">
                          Qty: {item.quantity}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-text-secondary">
                          {Number(item.price).toLocaleString()} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Summary */}
              <section className="rounded-2xl border border-border-subtle bg-surface-elevated p-4">
                <h3 className="mb-4 text-sm font-semibold text-text-primary">
                  Order Summary
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Subtotal</span>
                    <span className="text-text-secondary">
                      {Number(order.subtotal || 0).toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-text-muted">Shipping</span>
                    <span className="text-text-secondary">
                      {Number(order.shippingFee || 0).toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-text-muted">Tax</span>
                    <span className="text-text-secondary">
                      {Number(order.tax || 0).toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="my-3 border-t border-border-subtle" />

                  <div className="flex justify-between">
                    <span className="font-semibold text-text-primary">
                      Total
                    </span>

                    <span className="font-bold text-accent">
                      {Number(order.totalPrice || 0).toLocaleString()} EGP
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ViewOrder;