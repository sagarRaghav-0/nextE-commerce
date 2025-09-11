'use client';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BottomBanner from '@/components/layout/BottomBanner';
import { deleteCartItem } from '@/lib/services/cartrelated/dbCartDelete';
import { placeOrder } from '@/lib/services/orderRelated/placeOrder';
import { clearCart } from '@/redux/slices/cartslice';
// import { setOrder } from '@/redux/slices/orderSlice';
import { RootState } from '@/redux/store';
import { Order } from '@/types/order';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Checkout = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { cart, discount } = useSelector((state: RootState) => state.cart);
    const router = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: 'India',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        notes: ''
    });

    useEffect(() => {
        if (!isLoaded) return;
        // if (!isSignedIn) router.replace('/sign-in?redirect_url=/checkout');

    }, [isLoaded, isSignedIn, router]);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal - discount;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderData: Order = {
            id: '', // backend can generate
            billingDetails: formData,
            items: cart,
            subtotal,
            discount,
            total,
            userId: isSignedIn ? user?.id : undefined,
            created_at: '', // backend sets
            status: "pending",
        };

        setLoading(true);
        try {
            const res = await placeOrder(orderData);

            if (res.success) {
                alert("✅ Order placed successfully!");
                dispatch(clearCart());
                deleteCartItem();

                setFormData({
                    firstName: '',
                    lastName: '',
                    country: 'India',
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    zip: '',
                    phone: '',
                    email: '',
                    notes: ''
                });

                router.push('/');
            } else {
                alert("❌ Failed to place order: " + res.message);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("❌ Something went wrong. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="bg-white px-8 md:px-20 py-10 relative">
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                <hr className="border-[var(--btn-color)] border-2 mb-10" />

                {/* Different UI states */}
                {!isLoaded ? (
                    <div className="flex justify-center items-center py-20">
                        <p>Loading...</p>
                    </div>
                ) : !isSignedIn ? (
                    <div className="flex justify-center items-center py-20">
                        <p>Please sign in to continue.</p>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    // Grid Layout
                    <div className="grid md:grid-cols-3 gap-10 items-start">
                        {/* Left: Billing Form */}
                        <form
                            id="checkout-form"
                            onSubmit={handlePlaceOrder}
                            className="md:col-span-2 space-y-6"
                        >
                            {/* First + Last Name */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <label className="block font-medium mb-1">First name *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block font-medium mb-1">Last name *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block font-medium mb-1">Country / Region *</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                >
                                    <option>India</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                </select>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block font-medium mb-1">Street address *</label>
                                <input
                                    type="text"
                                    name="address1"
                                    placeholder="House number and street name"
                                    value={formData.address1}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Apartment, suite, etc. (optional)</label>
                                <input
                                    type="text"
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block font-medium mb-1">Town / City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>

                            {/* State + Zip */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full">
                                    <label className="block font-medium mb-1">State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block font-medium mb-1">ZIP Code *</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block font-medium mb-1">Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block font-medium mb-1">Email address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block font-medium mb-1">Order notes (optional)</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    placeholder="Notes about your order, e.g. special instructions."
                                />
                            </div>
                        </form>

                        {/* Right: Sticky Order Summary */}
                        <div className="md:col-span-1 self-start">
                            <div className="sticky top-24 border border-gray-300 p-6 rounded-lg h-max bg-white shadow">
                                <h2 className="text-xl font-semibold mb-4">Your order</h2>
                                <div className="mb-4">
                                    <div className="flex justify-between border-b py-2 font-medium">
                                        <span>Product</span>
                                        <span>Subtotal</span>
                                    </div>
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between py-2">
                                            <span>{item.name} × {item.quantity}</span>
                                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between border-t pt-2 mt-2">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between border-t pt-2 mt-2 text-green-600">
                                            <span>Discount</span>
                                            <span>- ₹{discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-100 border border-yellow-400 text-yellow-800 p-3 text-sm mb-4 rounded">
                                    Sorry, it seems that there are no available payment methods. Please contact us for alternate arrangements.
                                </div>

                                <button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={loading || !isLoaded || !isSignedIn || cart.length === 0}
                                    className="w-full bg-[var(--bbs-color)] hover:bg-[var(--btn-color)] hover:text-white text-black py-3 rounded-full font-semibold transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Placing Order...' : 'Place order'}
                                </button>
                                {/* <PaymentButton /> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <BottomBanner />
            <Footer />
        </>
    );
};

export default Checkout;
