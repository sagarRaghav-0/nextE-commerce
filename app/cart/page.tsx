'use client';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BottomBanner from '@/components/layout/BottomBanner';
import { cartItemsUpload } from '@/lib/services/cartrelated/cartItemsUpload';
import { deleteCartItem } from '@/lib/services/cartrelated/dbCartDelete';
import { updateCartItemQuantity } from '@/lib/services/cartrelated/updateQuantity';
// import { updateCartItemQuantity } from '@/lib/services/cartrelated/updateQuantity';
import { applyCoupon, clearCoupon, removeFromCart, updateQuantity } from '@/redux/slices/cartslice';
import { RootState } from '@/redux/store';
import { CartItem, CartItemsUploadToSupabase } from '@/types/cart';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useDispatch();

  const cartState = useSelector((state: RootState) => state.cart);
  const { cart, coupon, discount } = cartState;

  const [couponInput, setCouponInput] = useState('');

  console.log("user Id:", user?.id);
  console.log("cartItems:", cart);

  // ✅ Subtotal + Total calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    if (couponInput.trim().toLowerCase() === "rajat") {
      const discountAmount = subtotal * 0.2; // 20% off
      dispatch(applyCoupon({ code: "rajat", discount: discountAmount }));
    } else {
      alert("❌ Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(clearCoupon());
    setCouponInput("");
  };

  const handleDelete = (item: CartItem) => {
    deleteCartItem(item.productId ?? "");
    dispatch(removeFromCart(item.id ?? ""));
  };


  useEffect(() => {
    if (isSignedIn && isLoaded && user) {
      cart.forEach((item) => {
        console.log("item from cartPage_tsx", item);
        const product: CartItemsUploadToSupabase = {
          ...item,
          userId: user.id,
          productId: item.productId ?? item.id,
        };

        cartItemsUpload(product, { overwrite: true });
      });
    }
  }, [isSignedIn, isLoaded, user, cart]);


  return (
    <>
      <Header />
      <div className="px-4 sm:px-6 lg:px-10 py-10 bg-white min-h-screen max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 tracking-wide">Cart</h1>

        {/* Cart Items */}
        <div className="space-y-6 mb-10">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
          ) : (
            cart.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 border p-4 sm:p-6 rounded-xl shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center gap-4 w-full sm:w-1/3">
                  <Image
                    src={item.images}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="text-left">
                    <h2 className="font-semibold text-[var(--btn-color)] tracking-wide">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-1/2 gap-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      dispatch(updateQuantity({ id: item.id ?? "", quantity: newQuantity }));
                      updateCartItemQuantity(item.id ?? "", newQuantity)
                    }}
                    className="w-16 border border-gray-300 rounded-md text-center px-2 py-1"
                  />
                  <p className="text-gray-700 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-700 text-2xl cursor-pointer"
                    onClick={() => handleDelete(item)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon & Totals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Coupon Input */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto flex-1"
            />

            {!coupon ? (
              <button
                onClick={handleApplyCoupon}
                className="bg-[var(--bbs-color)] hover:bg-[var(--btn-color)] hover:text-white text-black px-6 py-2 rounded-full transition-all ease-in-out"
              >
                Apply Coupon
              </button>
            ) : (
              <button
                onClick={handleRemoveCoupon}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all ease-in-out"
              >
                Remove Coupon
              </button>
            )}
          </div>

          {/* Totals */}
          <div className="border border-gray-300 p-6 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4 tracking-wide">Cart Totals</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between mb-2 text-green-600 font-medium">
                <span>Coupon ({coupon})</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between mb-6 border-t pt-2 font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout">
              <button className="cursor-pointer bg-[var(--bbs-color)] hover:bg-[var(--btn-color)] hover:text-white text-black text-lg w-full py-3 rounded-full transition font-medium">
                Proceed to Checkout
              </button>
              {!isSignedIn && isLoaded && (
                <p className="text-red-500 font-bold text-sm mt-2 text-center">
                  You have to log in first to checkout
                </p>
              )}
            </Link>
          </div>
        </div>
      </div>
      <BottomBanner />
      <Footer />
    </>
  );
};

export default Cart;
