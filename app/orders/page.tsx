'use client';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BottomBanner from '@/components/layout/BottomBanner';
import { showOrder } from '@/lib/services/orderRelated/showOrder';
import { Order } from '@/types/order';
import { useUser } from '@clerk/nextjs';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const OrdersPage = () => {
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirect to login if user is not signed in
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/sign-in?redirectUrl=/orders');
        }
    }, [isLoaded, isSignedIn, router]);

    // Fetch orders when user is signed in
    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;

        const fetchOrders = async () => {
            setLoading(true);

            try {
                const res = await showOrder();

                if (res.success && Array.isArray(res.data)) {
                    const normalizedOrders = res.data.map((order) => ({
                        ...order,
                        total: Number(order.total),
                        subtotal: Number(order.subtotal),
                        discount: Number(order.discount),
                        items: order.items.map((item) => ({
                            ...item,
                            price: Number(item.price),
                            quantity: Number(item.quantity),
                            images: item.images, // keep images as is
                        })),
                    }));

                    setOrders(normalizedOrders);
                    setError(null);
                } else {
                    setOrders([]);
                    setError(res.message || 'Failed to fetch orders.');
                }
            } catch (err) {
                setOrders([]);
                setError('Unexpected error occurred while fetching orders.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isLoaded, isSignedIn]);



    return (
        <>
            <Header />
            <div className="p-8 md:p-16">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                {/* All states handled here */}
                {!isLoaded || loading ? (
                    <p className="p-6 text-center">Loading...</p>
                ) : error ? (
                    <div className="p-10 text-center text-red-600">
                        <p>{error}</p>
                    </div>
                ) : !orders.length ? (
                    <div className="p-10 text-center">
                        <p className="text-gray-600">You don’t have any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border rounded-lg shadow p-6 bg-white hover:shadow-md transition"
                            >
                                {/* Order Header */}
                                <div className="flex justify-between items-center border-b pb-3 mb-3">
                                    <div>
                                        <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                                        <p className="text-sm text-gray-500">
                                            Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString() : "Unknown"}
                                        </p>


                                    </div>

                                    {/* Status Badge */}
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full font-medium ${order.status === 'delivered'
                                            ? 'bg-green-100 text-green-700'
                                            : order.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-gray-300 text-gray-700'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="divide-y">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between py-2 text-sm items-center gap-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                {item.images && (
                                                    <div className="w-12 h-12 relative">
                                                        <Image
                                                            src={item.images}
                                                            alt={item.name}
                                                            fill
                                                            className="rounded-md object-cover"
                                                            sizes="48px"
                                                        />
                                                    </div>

                                                )}
                                                <span>
                                                    {item.name} × {item.quantity}
                                                </span>
                                            </div>
                                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="flex justify-between mt-4 font-semibold">
                                    <span>Total</span>
                                    <span>₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <BottomBanner />
            <Footer />
        </>
    );
};


export default OrdersPage;
