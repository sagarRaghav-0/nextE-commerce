'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BottomBanner from '@/components/layout/BottomBanner';
import ScrollToTop from '@/components/layout/ScrollTop';
import { cartItemsUpload } from '@/lib/services/cartrelated/cartItemsUpload';
import { addToCart } from '@/redux/slices/cartslice';
import { clickedProduct } from '@/redux/slices/productSlice';
import { CartItem, CartItemsUploadToSupabase } from '@/types/cart';
import { Product } from '@/types/product';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegStar, FaShoppingBag, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';


const Shop = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortOption, setSortOption] = useState('');
    const [clickedProductId, setClickedProductId] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useUser();


    const dispatch = useDispatch();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.currentTarget.value);
        setVisibleCount(6);
    };


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



    const handleAddToCart = (product: Product) => {
        const item: CartItem = {
            ...product,
            productId: product.id,
            quantity: 1,
        };

        // Add to Redux
        dispatch(addToCart(item));

        // Push to DB
        updateDataInSupabase(item);

        setClickedProductId(item.id ?? null);
        setTimeout(() => setClickedProductId(null), 2000);


    };





    const handleSingleProduct = (item: Product) => {
        dispatch(clickedProduct({ ...item }));
        // setClickedProductId(item.id);   
        console.log(item)
    };


    const getStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <FaStar key={i} className="text-yellow-500" />
                ) : (
                    <FaRegStar key={i} className="text-gray-300" />
                )
            );
        }
        return stars;
    };


    const handleShowMore = () => setVisibleCount((prev) => prev + 3);
    const handleShowLess = () => setVisibleCount(6);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'lowToHigh') return a.price - b.price;
        if (sortOption === 'highToLow') return b.price - a.price;
        if (sortOption === 'latest') return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();

        if (sortOption === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
        return 0;
    });

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');

            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }

            const data = await res.json();
            console.log('Fetched data:', data);

            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div>
            <Header />

            <div className="relative bg-[url('/banners/shopbanner.webp')] p-20 md:p-40 flex items-center justify-center bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-black opacity-35 z-0"></div>
                <h1 className="z-20 text-white text-6xl">Shop</h1>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-row items-start sm:items-center md:items-center justify-between px-5 py-7">
                <div>
                    <p className="text-gray-600">
                        Showing <span>{Math.min(visibleCount, sortedProducts.length)}</span> of{' '}
                        {sortedProducts.length} results
                    </p>
                </div>

                <div>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="text-gray-600 w-full block p-4 border-none focus:outline-none focus:ring-0 bg-white"
                    >
                        <option value="">Default sorting</option>
                        <option value="rating">Sort by average rating</option>
                        <option value="latest">Sort by latest</option>
                        <option value="lowToHigh">Sort by price: low to high</option>
                        <option value="highToLow">Sort by price: high to low</option>
                    </select>
                </div>
            </div>

            <hr className="md:my-2 mb-10 border-gray-300" />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-10 md:gap-10 md:px-10 sm:px-8 px-4 py-10">
                {sortedProducts.slice(0, visibleCount).map((product: Product) => (
                    <Link key={product.id} href={`/shop/productdetail/${product.id}`} onClick={() => handleSingleProduct(product)}>
                        <div className="group relative w-[45%] sm:w-[48%] md:w-[30%] lg:w-[22%] flex flex-col items-center  text-center 
              bg-[#f9f9f9] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4">
                            <div className="absolute top-3 right-3 transition-opacity duration-300 z-10 hidden md:block">
                                {clickedProductId === product.id ? (
                                    <span className="text-green-600 text-xl">✔</span>
                                ) : (
                                    <FaShoppingBag
                                        onClick={(e) => {
                                            e.preventDefault(); // stop navigation
                                            e.stopPropagation();
                                            handleAddToCart(product); // ✅ pass the product
                                        }}
                                        size={24}
                                        className="text-gray-700 opacity-0 group-hover:opacity-100 cursor-pointer"
                                    />

                                )}
                            </div>
                            <Image
                                src={product.images}
                                width={200}
                                height={200}
                                alt={product.name}
                                className="rounded-xl"
                            />
                            <div className="flex py-2">{getStars(Math.round(product.rating ?? 0))}</div>
                            <p className="capitalize text-gray-700">{product.category}</p>
                            <p className="mt-2 text-gray-700">
                                {product.discount_price && product.discount_price > 0 ? (
                                    <span className="text-gray-400 line-through mr-2">₹{product.price}</span>
                                ) : null}
                                <span className="font-semibold  text-gray-800">
                                    ₹{product.discount_price && product.discount_price > 0 ? product.discount_price : product.price}
                                </span>
                            </p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAddToCart({ ...product, quantity: 1 });
                                }}
                                className={`cursor-pointer w-full py-3 mt-3 rounded-full font-semibold transition-all duration-300 block md:hidden
                                        ${clickedProductId === product.id
                                        ? "bg-[var(--btn-color)] text-white" // ✅ active state (like hover)
                                        : "bg-[var(--bbs-color)] text-black active:bg-[var(--btn-color)] active:text-white"
                                    }`}
                            >
                                {clickedProductId === product.id ? "Added To Cart" : "Add To Cart"}
                            </button>



                        </div>
                    </Link>
                ))}
            </div>

            {
                visibleCount < sortedProducts.length ? (
                    <div className="flex justify-center mt-10 mb-20">
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer"
                        >
                            Show More
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-10 mb-20">
                        <p className="text-gray-500 mb-4">No more products to show</p>
                        {sortedProducts.length > 6 && (
                            <button
                                onClick={handleShowLess}
                                className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer"
                            >
                                Show Less
                            </button>
                        )}
                    </div>
                )
            }

            <BottomBanner />
            <ScrollToTop />
            <Footer />
        </div >
    );
};

export default Shop;  