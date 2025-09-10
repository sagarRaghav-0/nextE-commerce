'use client';

import { deleteProducts } from '@/lib/services/productRelated/deleteProduct';
import { Product } from "@/types/product";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    const deleteP = await deleteProducts(id);
    if (deleteP) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-600">Loading products...</div>;
  }

  return (
    <div className="flex-1 min-h-screen p-4">
      <h2 className="pb-4 text-2xl font-semibold text-gray-800">All Products</h2>

      {/* 🖥️ Desktop Layout */}
      <div className="hidden md:block max-w-7xl w-full border border-gray-200 rounded-xl bg-white shadow-sm overflow-x-auto">
        <div className="grid grid-cols-12 bg-gray-50 text-sm text-gray-700 font-semibold px-4 py-3 rounded-t-xl">
          <div className="col-span-2">Image</div>
          <div className="col-span-2">Product</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-1">Available</div>
          <div className="col-span-1">Trending</div>
          <div className="col-span-1">Stock</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12 items-center border-t text-sm text-gray-700 px-4 py-4 hover:bg-gray-50 transition duration-200"
          >
            {/* Image */}
            <div className="col-span-2 flex items-center">
              {product.images ? (
                <Image
                  src={product.images}
                  alt={product.name || 'Product image'}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                />
              ) : (
                <div className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Product Name */}
            <div className="col-span-2 font-medium truncate">{product.name}</div>

            {/* Category */}
            <div className="col-span-2 text-gray-500">{product.category}</div>

            {/* Price */}
            <div className="col-span-2 font-semibold text-green-600">
              ₹{product.price}
            </div>

            {/* Availability */}
            <div className="col-span-1">{product.is_available ? "Yes" : "No"}</div>

            {/* Trending */}
            <div className="col-span-1">{product.is_trending ? "Yes" : "No"}</div>

            {/* Stock */}
            <div className="col-span-1">{product.stock}</div>

            {/* Actions */}
            <div className="col-span-1 text-right flex gap-2 justify-end">
              <Link
                href={`/dashboard/edit/${product.id}`}
                className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
              >
                <FaEdit size={16} />
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              >
                <FaTrash className='cursor-pointer' size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📱 Mobile Layout */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="flex items-center gap-4">
              {product.images ? (
                <Image
                  src={product.images}
                  alt={product.name || 'Product image'}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                />
              ) : (
                <div className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-green-600 font-semibold">₹{product.price}</p>
                <p className="text-xs text-gray-500">
                  {product.is_available ? "Available" : "Not Available"} |{" "}
                  {product.is_trending ? "Trending" : "Normal"} | Stock: {product.stock}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Link
                href={`/dashboard/edit/${product.id}`}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                <FaEdit size={16} /> Edit
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                <FaTrash size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
