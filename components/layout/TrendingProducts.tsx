'use client';

import { cartItemsUpload } from "@/lib/services/cartrelated/cartItemsUpload";
import { addToCart } from "@/redux/slices/cartslice";
import { clickedProduct } from "@/redux/slices/productSlice";
import { CartItem, CartItemsUploadToSupabase } from "@/types/cart";
import { Product } from "@/types/product";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegStar, FaShoppingBag, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

const TrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [clickedProductId, setClickedProductId] = useState<string | null>(null);
  const { user } = useUser();

  const dispatch = useDispatch();

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      const trending = res.data.filter((product: Product) => product.is_trending);
      setProducts(trending);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDataInSupabase = async (item: CartItem) => {
    console.log("Data from trending :", item)
    const payload: CartItemsUploadToSupabase = {
      ...item,
      productId: item.productId ?? "",
      userId: user?.id ?? "",
    };

    console.log("⬆️ Uploading product:", payload);
    await cartItemsUpload(payload, { overwrite: true });

    console.log("✅ Cart uploaded successfully");
  };



  const handleAddToCart = (product: Product) => {
    const item: CartItem = {
      ...product,
      productId: product.id ?? "",
      quantity: 1, // you can also add a state for quantity input
    };

    dispatch(addToCart(item));
    updateDataInSupabase(item);

    setClickedProductId(item.id ?? null);
    setTimeout(() => setClickedProductId(null), 2000);

    console.log(item)
  };

  // Dynamic star renderer with half-star support
  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return <FaStar key={i} className="text-yellow-500" />;
      } else if (rating >= starValue - 0.5) {
        return <FaStarHalfAlt key={i} className="text-yellow-500" />;
      } else {
        return <FaRegStar key={i} className="text-yellow-500" />;
      }
    });
  };

  const handleSingleProduct = (item: Product) => {
    dispatch(clickedProduct(item));
    // setClickedProductId(item.id);   
    console.log("data from handle Single Product :", item)
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // if (loading) {
  //   return
  // }

  return (
    <div className="mb-20 px-4">
      <h2 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl py-10 tracking-wide">
        Trending Products
      </h2>

      {
        loading ? <div className="text-center py-10 text-gray-600">Loading trending products...</div>
          :
          <div className="flex flex-wrap justify-evenly gap-8 max-w-[1200px] mx-auto">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="group relative w-[45%] sm:w-[48%] md:w-[30%] lg:w-[22%] flex flex-col items-center  text-center 
              bg-[#f9f9f9] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4"
              >
                {/* Bag icon or ✔ check */}
                <div className="absolute top-5 right-5 transition-opacity duration-300 z-10  hidden md:block">
                  {clickedProductId === product.id ? (
                    <span className="text-green-600 text-xl">✔</span>
                  ) : (
                    <FaShoppingBag
                      size={24}
                      className="text-gray-700 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                      onClick={() => handleAddToCart({ ...product, quantity: 1 })}
                    />
                  )}
                </div>

                {/* Product Image */}
                <div className="relative w-full flex justify-center">
                  <Link href={`/shop/productdetail/${product.id}`} onClick={() => handleSingleProduct(product)} >

                    <Image
                      src={product.images || "/placeholder.png"}
                      width={270}
                      height={270}
                      alt={product.name || "Product"}
                      className="rounded-lg p-2 mb-4 shadow-sm object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Rating */}
                <div className="flex mb-2">{getStars(product.rating || 0)}</div>

                {/* Product Details */}
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-md font-semibold text-gray-800 mt-1">{product.name}</p>
                <p className="mt-2 text-gray-700">
                  {product.discount_price && product.discount_price > 0 ? (
                    <span className="text-gray-400 line-through mr-2">₹{product.price}</span>
                  ) : null}
                  <span className="font-semibold text-gray-800">
                    ₹{product.discount_price && product.discount_price > 0 ? product.discount_price : product.price}
                  </span>
                </p>
                <button
                  onClick={() => handleAddToCart({ ...product, quantity: 1 })}
                  className="cursor-pointer w-full bg-[var(--bbs-color)] hover:bg-[var(--btn-color)] hover:text-white text-black py-3 mt-3 rounded-full font-semibold transition-all disabled:opacity-50 block md:hidden"
                >
                  {clickedProductId === product.id ? "Added To Cart" : "Add To Cart"}
                </button>

              </div>
            ))}
          </div>
      }


    </div>
  );
};

export default TrendingProducts;
