import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { FiTruck } from "react-icons/fi";

function Works() {
  return (
    <div className="w-full bg-surface-base px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 text-center">
      

          <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group relative flex flex-col items-center gap-5 rounded-3xl border border-border-subtle bg-surface-card px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light transition-all duration-300 group-hover:bg-accent">
              <FiShoppingBag className="text-3xl text-accent transition-colors duration-300 group-hover:text-white" />
            </div>

            <div>
              <h3 className="text-xl font-medium text-text-primary">
                Browse Products
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                Explore our wide range of premium products
              </p>
            </div>

           
          </div>

          {/* Step 2 */}
          <div className="group relative flex flex-col items-center gap-5 rounded-3xl border border-border-subtle bg-surface-card px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light transition-all duration-300 group-hover:bg-accent">
              <FiCreditCard className="text-3xl text-accent transition-colors duration-300 group-hover:text-white" />
            </div>

            <div>
              <h3 className="text-xl font-medium text-text-primary">
                Add to Cart
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                Select your favorites and add them to your cart
              </p>
            </div>

          
          </div>

          {/* Step 3 */}
          <div className="group relative flex flex-col items-center gap-5 rounded-3xl border border-border-subtle bg-surface-card px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light transition-all duration-300 group-hover:bg-accent">
              <FiTruck className="text-3xl text-accent transition-colors duration-300 group-hover:text-white" />
            </div>

            <div>
              <h3 className="text-xl font-medium text-text-primary">
                Order & Receive
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                Place your order and get it delivered to your doorstep
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Works;
