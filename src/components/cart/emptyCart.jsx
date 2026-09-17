import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[55vh] py-12 px-4 text-center'>
          {/* cart icon */}
          <div className='w-25 h-25 bg-slate-200 rounded-full flex items-center justify-center mb-5'>
            <ShoppingCart className='w-12 h-12 text-accent' />
          </div>

          {/* title */}
          <h2 className='text-xl font-bold text-gray-800 mb-2'>
              Your cart is empty
          </h2>

          {/* sub */}
          <p className='text-slate-500 text-sm leading-relaxed max-w-md mb-6'>
              Looks like you haven't added anything to your cart yet.
              <br />
              Start shopping and find something you love!
          </p>

          {/* shop button */}
          <Link
              to="/shop"
              className='px-6 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold text-sm rounded-xl shadow-sm transition-colors duration-200'
          >
          Start Shopping
          </Link>
    </div>
  )
}

export default EmptyCart;