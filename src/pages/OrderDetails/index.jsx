import React from "react";
import { useSingleOrder } from "../../services/apiHooks/OrdersHook";
import { data, useParams } from "react-router-dom";
import OrderDetails from "../../components/orders/OrderDetails";

const index = () => {
  const { id } = useParams();
  const { data: dataorder, isLoading } = useSingleOrder(id);
  const detailsOrder = {
    idOrder: id,
    items: dataorder?.order?.items,
    status: dataorder?.order?.status,
    priceTotal: dataorder?.order?.subtotal,
    shippingAddress: dataorder?.order?.shippingAddress,
    date: new Date(dataorder?.order?.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    paymentMethod: dataorder?.order?.paymentMethod,
  };

  return (
    <div className="mt-11 w-full max-w-5xl min-w-0 mx-auto px-3 sm:px-6 box-border ">
      {isLoading ? (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 bg-surface-base">
       
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-border-subtle" />

            <div className="absolute w-16 h-16 rounded-full border-4 border-transparent border-t-accent animate-spin" />

            <div className="absolute w-8 h-8 rounded-full bg-accent-light animate-pulse" />
          </div>

        
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-text-primary">
              Loading Order
            </h2>

            <p className="text-sm text-text-muted animate-pulse-subtle">
              Please wait while we fetch your order details...
            </p>
          </div>
        </div>
      ) : (
        <OrderDetails detailsOrder={detailsOrder} />
      )}
    </div>
  );
};

export default index;
