'use client';
import { showOrder } from '@/lib/services/orderRelated/showOrder';
import { Order, OrderStatus } from '@/types/order';
import { useUser } from '@clerk/nextjs';
import clsx from 'clsx';
import Image from "next/image";
import { useEffect, useState } from 'react';
import { FiPackage } from 'react-icons/fi';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-orange-600';
    case 'paid':
      return 'text-green-600';
    case 'failed':
      return 'text-red-600';
    case 'delivered':
      return 'text-green-800';
    default:
      return 'text-gray-600';
  }
};

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.publicMetadata.role === 'admin';
  const validStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'out_for_delivery', 'canceled'];


  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await showOrder();

      if (res.success && res.data) {
        setOrders(res.data);
        setError(null);
      } else {
        setOrders([]);
        setError(res.message || 'Failed to fetch orders.');
      }

      setLoading(false);
    };

    if (isLoaded) fetchOrders();
  }, [isLoaded]);

  // Update order status
  const updateStatus = async (orderId: string, newStatus: string) => {
    if (!validStatuses.includes(newStatus as OrderStatus)) return;

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setOrders(prev =>
          prev.map(o =>
            o.id === orderId ? { ...o, status: newStatus as OrderStatus } : o
          )
        );
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };


  if (loading) return <p className="p-6 text-center">Loading...</p>;

  if (error)
    return (
      <div className="p-10 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p>{error}</p>
      </div>
    );

  if (!orders || orders.length === 0)
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600">You don’t have any orders yet.</p>
      </div>
    );

  return (
    <div className="md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl md:font-bold mb-4 md:mb-6 text-gray-600">Orders</h2>
      <hr className="my-2 border-gray-300" />

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Left: Icon + Products */}
              <div className="flex items-start gap-4 basis-[55%]">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center w-12 h-12">
                  <FiPackage size={22} />
                </div>

                <div>
                  <div className="flex flex-wrap gap-4">
                    {order.items.map((item) => (
                      <div key={item.id || item.productId} className="flex items-center gap-2">
                        <Image
                          src={item.images || "/placeholder.png"}
                          alt={item.name}
                          width={48}   // w-12 = 48px
                          height={48}  // h-12 = 48px
                          className="rounded-md object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)} = ₹
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Total Items: {order.items.length}
                  </p>
                </div>
              </div>

              {/* Middle: Customer Info with full address */}
              <div className="basis-[25%] whitespace-pre-wrap">
                <p className="font-medium text-gray-800">
                  {order.billingDetails?.firstName} {order.billingDetails?.lastName}
                </p>
                <p className="text-sm text-gray-500 leading-snug">
                  {order.billingDetails?.address1}
                  {order.billingDetails?.address2 ? `, ${order.billingDetails.address2}` : ''},<br />
                  {order.billingDetails?.city}, {order.billingDetails?.state} {order.billingDetails?.zip}
                  {'\n'}
                  {order.billingDetails?.phone}
                </p>
              </div>

              {/* Right: Amount & Status */}
              <div className="text-left md:text-right basis-[20%]">
                <p className="font-bold text-green-600 text-lg">
                  ₹{Number(order.total).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-1">Method: COD</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </p>

                {/* Admin can change status */}
                {isAdmin ? (
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={clsx(
                      'text-sm font-semibold px-2 py-1 rounded',
                      getStatusColor(order.status)
                    )}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Paid</option>
                    <option value="shipped">Failed</option>
                    <option value="delivered">Delivered</option>
                    <option value="out_for_delivery">Out fro Delivery</option>
                    <option value="canceled">Canceled</option>
                  </select>
                ) : (
                  <p className={clsx('text-sm font-semibold', getStatusColor(order.status))}>
                    Payment: {order.status?.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
