import React, { useState } from 'react'
import { useApplyCoupon, useRemoveCoupon } from '../../services/apiHooks/cartHooks'
import { Loader2, Tag, X } from 'lucide-react'

const CouponForm = ({coupon}) => {
  const [code, setCode] = useState("")

  const {mutate: applyCoupon, isPending: isApplying} = useApplyCoupon()
  const { mutate: removeCoupon, isPending: isRemoving } = useRemoveCoupon()
  
  const handleApply = (e) => {
    e.preventDefault()
    if (!code.trim()) return;
    applyCoupon(
      { code: code.trim() },
      {
        onSuccess: () => setCode(""),
      }
    )
  };

    return (
      <div className=' bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
        <div className='flex items-center gap-2 text-gray-800 font-medium mb-4'>
          <Tag className='w-5 h-5 text-gray-700 -rotate-90' />
          <span className='text-sm font-semibold'>Coupon Code</span>
        </div>

        {coupon ? (
          <div className='bg-emerald-50/80 border border-emerald-100 text-emerald-700 px-4 py-3 rounded-xl flex items-center justify-between text-sm font-semibold'>
            <span>Coupon "{coupon}" applied</span>
            <button
              type='button'
              onClick={() => removeCoupon()}
              disabled={isRemoving}
              className='text-red-500 hover:text-red-600 transition-colors p-1 rounded-md disabled:opacity-50'
              aria-label='Remove coupon'
              >
              {isRemoving ? (
                <Loader2 className='w-4 h-4 animate-spin text-red-500' />
              ) : (<X className='w-4 h-4' />)}
            
            </button>
          </div>
        ) : (
            <form onSubmit={handleApply} className='flex items-center gap-3'>
              <input
                type='text'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder='Enter coupon code'
                className='flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 transition-colors'
              />
              <button
                type='submit'
                disabled={isApplying || !code.trim()}
                className='px-5 py-2.5 border border-indigo-600 text-indigo-600 font-medium text-sm rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent min-w-[85px]'
              >
                {isApplying && <Loader2 className='w-4 h-4 animate-spin' />}
                Apply
              </button>
            </form>
        )}
      </div>
)
}

export default CouponForm;