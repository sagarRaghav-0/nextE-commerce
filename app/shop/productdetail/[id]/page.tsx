"use client"
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import BottomBanner from "@/components/layout/BottomBanner";
import { cartItemsUpload } from "@/lib/services/cartrelated/cartItemsUpload";
import { addNewReview } from "@/lib/services/reviewRelated/addReview";
import { addToCart } from "@/redux/slices/cartslice";
import { RootState } from "@/redux/store";
import { CartItem, CartItemsUploadToSupabase } from "@/types/cart";
import { Product } from "@/types/product";
import { Review } from "@/types/reviews";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);
    const { user } = useUser();
    const [clickedProductId, setClickedProductId] = useState<string | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewText, setReviewText] = useState("");

    const productDetail = useSelector((state: RootState) => state.product.products)



    const dispatch = useDispatch();




    const updateDataInSupabase = async (item: CartItem) => {
        const payload: CartItemsUploadToSupabase = {
            ...item,
            productId: item.productId,
            userId: user?.id ?? "",
        };

        console.log("⬆️ Uploading product:", payload);
        await cartItemsUpload(payload, { overwrite: true });

        console.log("✅ Cart uploaded successfully");
    };


    const fetchReviews = useCallback(async () => {
        try {
            const res = await axios.get(`/api/review?productId=${id}`);
            setReviews(res.data);
        } catch (error) {
            console.error("❌ Failed to fetch reviews:", error);
        }
    }, [id]);
    useEffect(() => {
        fetchReviews();
    }, [id, fetchReviews]);


    const handleAddToCart = (product: Product) => {
        const item: CartItem = {
            ...product,
            quantity: 1, // you can also add a state for quantity input
        };

        // Add to Redux store
        dispatch(addToCart(item));

        // (Optional) Push to DB like Supabase
        updateDataInSupabase(item);

        setClickedProductId(item.id ?? null);
        setTimeout(() => setClickedProductId(null), 200);
    };


    const handleSubmitReview = async () => {
        if (!reviewText.trim()) return;

        try {
            const payload = { productId: id, reviewText };
            const res = await addNewReview(payload);
            setReviewText(""); // clear textarea


            if (res.success) {
                // re-fetch from DB so you always have fresh reviews
                await fetchReviews();
                setReviewText("");
            }
        } catch (error) {
            console.error("❌ Failed to submit review:", error);
        }


    };

    console.log('detail comes from productDetail:', productDetail)
    console.log('id comes from productDetail:', id)


    if (!productDetail) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <p>Product not found</p>
            </div>
        );
    }


    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Grid: Image + Details */}
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Left: Image */}
                    <div>
                        <Image
                            src={productDetail.images || "/placeholder.png"}
                            alt={productDetail.name}
                            width={600} // ✅ must provide width
                            height={600} // ✅ must provide height
                            className="w-full h-auto object-cover rounded-lg shadow"
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col gap-4">
                        <p className="text-green-600 font-medium">{productDetail.category}</p>
                        <h1 className="text-3xl font-bold">{productDetail.name}</h1>
                        <p className="mt-2 text-gray-700">
                            {productDetail.discount_price && productDetail.discount_price > 0 ? (
                                <span className="text-gray-400 line-through mr-2">₹{productDetail.price}</span>
                            ) : null}
                            <span className="font-semibold text-gray-800">
                                ₹{productDetail.discount_price && productDetail.discount_price > 0 ? productDetail.discount_price : productDetail.price}
                            </span>
                        </p>

                        <p className="text-gray-600">{productDetail.description}</p>

                        {/* Add to Cart */}
                        <div className="flex items-center gap-4 mt-2 ">
                            {clickedProductId === productDetail.id ? (
                                <button
                                    disabled
                                    className="bg-gray-400 text-white py-2 px-6 rounded transition cursor-pointer"
                                >
                                    ✅ Added to cart
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAddToCart(productDetail)}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition cursor-pointer"
                                >
                                    Add to cart
                                </button>
                            )}
                        </div>

                        <p className="text-sm mt-2">
                            Category:{" "}
                            <span className="font-bold">{productDetail.category}</span>
                        </p>

                        {/* Guaranteed Safe Checkout */}
                        <div className="mt-4 p-4 rounded flex items-center gap-6">
                            <span className="font-medium">Guaranteed Safe Checkout</span>
                            <Image
                                src="/visa.png"
                                alt="Visa"
                                width={40}   // adjust size
                                height={30}  // adjust size
                                className="h-10 w-13"
                            />
                            <Image
                                src="/mastercard.png"
                                alt="Mastercard"
                                width={40}   // adjust size
                                height={30}  // adjust size
                                className="h-10 w-13"
                            />

                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-10">
                    <div className="flex border-b border-gray-300">
                        <p className="py-2 px-4 font-medium">
                            Reviews ({reviews.filter(r => r.product_id === id).length})
                        </p>
                    </div>

                    {/* Review form */}
                    <div className="my-6">
                        <label className="block font-semibold text-gray-800 mb-1">
                            Write a Review
                        </label>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Type your review..."
                            rows={4}
                            className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-[var(--btn-color)]"
                        />
                        <button
                            onClick={handleSubmitReview}
                            className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        >
                            Submit Review
                        </button>
                    </div>

                    {/* Show reviews */}
                    {/* Show reviews */}
                    <div className="mt-4 text-gray-700">
                        {reviews.filter(r => r.product_id === id).length === 0 ? (
                            <div>No reviews yet.</div>
                        ) : (
                            <ul className="space-y-3">
                                {reviews
                                    .filter(r => r.product_id === id)
                                    .map((r) => (
                                        <li key={r.id ?? r.created_at} className="border p-3 rounded bg-gray-50">
                                            <h2 className="font-bold">{user?.firstName ?? "Anonymous"}</h2>
                                            <p className="font-medium">{r.review_text}</p>
                                            <span className="text-xs text-gray-500">
                                                {new Date(r.created_at).toLocaleString()}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
            <BottomBanner />
            <Footer />
        </>
    );
};

export default Page;
