import React, { useState } from "react";
import { VscError } from "react-icons/vsc";
import PrgressOrder from "./PrgressOrder";
import ItemsOrder from "./ItemsOrder";
import ShippingPayment from "./ShippingPayment";
import CancelOrderModal from "./CancelOrderModal";
import { useCancelOrder } from "../../services/apiHooks/OrdersHook";
function OrderDetails({ detailsOrder }) {
  const [openCancel,setOpenCancel]=useState(false)
  const {mutateAsync, isPending}=useCancelOrder()
  const CancelOrder=async ()=>{
        const res=await  mutateAsync(detailsOrder.idOrder)
        if(res.success){
          setOpenCancel(false)
        }
  }
  const statusStyle = {
    confirmed: "bg-green-500/10 text-green-600 border-green-500/20",
    returned: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  const currentStatus =statusStyle[detailsOrder.status?.toLowerCase()] || "bg-accent-light text-accent border-accent/20";
  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6 text-text-primary">
     
      <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-surface-card p-6 sm:p-8 shadow-sm">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Order Details
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-sm sm:text-base font-semibold text-text-secondary">
                #{detailsOrder.idOrder.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p
              className={`${currentStatus} border px-4 py-2 rounded-full text-sm font-semibold capitalize`}
            >
              {detailsOrder.status}
            </p>
          </div>
        </div>
      </div>
      <div>
        <PrgressOrder status={detailsOrder.status} />
      </div>
      {/* Items */}
      <div>
        <ItemsOrder items={detailsOrder.items} />
      </div>

      {/* Shipping + Payment */}
      <div>
        <ShippingPayment
          paymentMethod={detailsOrder.paymentMethod}
          priceTotal={detailsOrder.priceTotal.toFixed(2)}
          date={detailsOrder.date}
          phone={detailsOrder.shippingAddress.phone}
          country={detailsOrder.shippingAddress.country}
          city={detailsOrder.shippingAddress.city}
          address={detailsOrder.shippingAddress.address}
          fullName={detailsOrder.shippingAddress.fullName}
        />
      </div>

      {/* Cancel Order */}
      {detailsOrder.status === "confirmed" ? (
        <div className="flex justify-center pt-2">
          <button
           onClick={()=>{setOpenCancel(true)}}
          className="group flex items-center justify-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 px-6 py-3.5 font-semibold hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-[0.98] transition-all duration-300">
            <VscError className="text-xl group-hover:scale-110 transition-transform duration-300" />
            <p>Cancel Order</p>
          </button>
        </div>
      ) : (
        ""
      )}
      {
        openCancel ? <CancelOrderModal  isOpen={openCancel} onKeepOrder={()=>setOpenCancel(false)}
        onCancelOrder={CancelOrder}
        pending={isPending}
        /> : ""
      }
    </div>
  );
}

export default OrderDetails;
