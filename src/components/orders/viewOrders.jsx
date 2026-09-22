import React, { useEffect, useState } from "react";
import { useMyOrders } from "../../services/apiHooks/OrdersHook";
import Order from "./order";

const ViewOrders = () => {
  const [page, setPage] = useState(1);
  const [dataorders, setDataorders] = useState([]);
  const {
    data: Dataorders,
    isLoading,
    isError,
  } = useMyOrders({ page, limit: 10 });
  useEffect(() => {
    if (Dataorders?.orders) {
      setDataorders((prev) => [...prev, ...Dataorders.orders]);
    }
  }, [Dataorders]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 text-text-primary">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          My Orders
        </h2>
      </div>

      {/* Orders List */}
      <div className="mt-8 flex flex-col gap-4">
        {dataorders.map((order) => {
          const orderDetail = {
            id: order._id,
            status: order.status,
            length_item: order.items?.length,
            subprice: order.subtotal,
            date: order.createdAt,
          };
          return <Order key={order._id} details={orderDetail} />;
        })}
      </div>

      {/* Error */}
      {isError && (
        <div className="mt-6 rounded-xl border border-border-subtle bg-surface-card p-4 text-center text-text-secondary">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Loading Button */}
      {Dataorders?.length ? (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLoading}
          className="group flex items-center justify-center gap-3 mx-auto mt-8 px-8 py-3.5 rounded-xl
        bg-accent text-white font-semibold shadow-sm
        hover:bg-accent-hover hover:shadow-md
        active:scale-[0.98] transition-all duration-300
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-sm"
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Loading orders...</span>
            </>
          ) : (
            <>
              <span>Load More</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </>
          )}
        </button>
      ) : (
        <p className="text-center text-text-muted">No orders yet, Return to shop</p>
      )}
    </div>
  );
};

export default ViewOrders;
