import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from "../../services/apiHooks/cartHooks";
import CartItem from '../../components/cart/cartItem';
import CouponForm from '../../components/cart/couponForm';
import CartSummary from '../../components/cart/cartSummary';
import EmptyCart from '../../components/cart/emptyCart';


const Cart = () => {
    const { data: cart, isLoading } = useCart()

    if (isLoading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin text-accent' />
            </div>
        )
    }

    if (!cart || !cart.items || cart.items.length === 0) return <EmptyCart />

    return (
        <main className='min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8'>

            <div className='max-w-7xl mx-auto'>
            <h1 className='text-2xl font-bold text-gray-900 mb-6'>Shopping Cart</h1>

                    {/* grid layout */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* left side */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* cartItems */}
                        <div className='bg-white rounded-2xl border border-gray-100 p-6 shadow-sm divide-y divide-gray-100'>
                            {cart.items.map((item) => (
                                <CartItem key={item._id || item.product} item={item} />
                            ))}
                        </div>

                        {/* coupon */}
                        <CouponForm coupon={cart.coupon} />

                        {/* back to shop */}
                        <div className='pt-1'>
                            <Link
                                to="/shop"
                                className='inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors'
                            >
                                <ArrowLeft className='w-4 h-4'/>Continue Shopping</Link>
                        </div>
                    </div>

                    {/* order summary */}
                    <div className='lg:col-span-4 h-full lg:sticky lg:top-8'>
                        <CartSummary
                            subtotal={cart.subtotal}
                            discountAmount={cart.discountAmount}
                            total={cart.total}
                        />
                    </div>
                </div>
            </div>
        </main>
    )

}


export default Cart;