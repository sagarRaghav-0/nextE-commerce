// 'use client';
// import { useUser } from '@clerk/nextjs';
// import { useState } from 'react';

// interface RazorpayResponse {
//     razorpay_payment_id: string;
//     razorpay_order_id: string;
//     razorpay_signature: string;
// }

// interface RazorpayOptions {
//     key: string | undefined;
//     amount: number;
//     currency: string;
//     name: string;
//     description: string;
//     order_id: string;
//     handler: (response: RazorpayResponse) => void;
//     prefill: {
//         name: string;
//         email: string;
//         contact: string;
//     };
//     theme: {
//         color: string;
//     };
// }

// declare global {
//     interface Window {
//         Razorpay: new (options: RazorpayOptions) => {
//             open: () => void;
//         };
//     }
// }

// interface PaymentButtonProps {
//     formData: {
//         firstName: string;
//         lastName: string;
//         country: string;
//         address1: string;
//         address2: string;
//         city: string;
//         state: string;
//         zip: string;
//         phone: string;
//         email: string;
//         notes: string;
//     };
//     handlePlaceOrder: () => Promise<void>; // ✅ no event param
//     total: number;
// }

// const PaymentButton: React.FC<PaymentButtonProps> = ({ formData, handlePlaceOrder, total }) => {
//     const [loading, setLoading] = useState(false);
//     const { isLoaded } = useUser();

//     const handlePayment = async () => {
//         try {
//             setLoading(true);

//             // 1️⃣ Create Razorpay order first
//             const res = await fetch('/api/razorpay', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ amount: total * 100 }), // paise
//             });

//             const order = await res.json();
//             if (!order.id) {
//                 alert('❌ Invalid Razorpay order response');
//                 return;
//             }

//             // 2️⃣ Setup Razorpay options
//             const options: RazorpayOptions = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: 'My Store',
//                 description: 'Order Payment',
//                 order_id: order.id,
//                 handler: async function (response: RazorpayResponse) {
//                     console.log("✅ Payment success:", response);

//                     // 3️⃣ Now place order in backend
//                     await handlePlaceOrder();

//                     alert("✅ Order placed successfully!");
//                 },
//                 prefill: {
//                     name: `${formData.firstName} ${formData.lastName}`,
//                     email: formData.email,
//                     contact: formData.phone,
//                 },
//                 theme: { color: '#6366f1' },
//             };

//             console.log("🟢 Prefill values:", options.prefill);

//             // 4️⃣ Open Razorpay modal
//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//         } catch (err) {
//             console.error('❌ Payment error:', err);
//             alert('Something went wrong. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isLoaded) return <p>Loading user...</p>;

//     return (
//         <button
//             onClick={handlePayment}
//             disabled={loading}
//             className="w-full bg-[var(--bbs-color)] hover:bg-[var(--btn-color)] hover:text-white text-black py-3 rounded-full font-semibold transition-all disabled:opacity-50"
//         >
//             {loading ? 'Processing...' : 'Place Order'}
//         </button>
//     );
// };

// export default PaymentButton;
