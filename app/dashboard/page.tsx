'use client';
import { addNewProduct } from '@/lib/services/productRelated/addProducts';
import { uploadImage } from '@/lib/services/productRelated/uploadImages';
import { validation } from '@/lib/services/validation/validation';
import { Product } from '@/types/product';
import Image from "next/image";
import React, { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const AddProduct = () => {
  const [upload, setUpload] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isImage, setIsImage] = useState<File | null>(null);

  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    description: '',
    price: 0,
    discount_price: 0,
    category: '',
    images: '',
    stock: 0,
    rating: 0,
    is_trending: false,
    is_available: true,
    productId: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      let newValue: boolean | number | string = value;
      if (['price', 'discount_price', 'stock', 'rating'].includes(name)) {
        let num = Number(value);
        if (num < 0) num = 0;
        if (name === 'rating' && num > 5) num = 5;
        newValue = num;
      } else if (name === 'is_trending' || name === 'is_available') {
        newValue = value === 'true';
      }
      return { ...prev, [name]: newValue };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!isImage) {
      alert('Please upload an image first.');
      return;
    }
    const { isValid, message } = validation(product);
    if (!isValid) {
      alert(message);
      return;
    }
    setUpload(true);
    try {
      const imageUrl = await uploadImage(isImage);
      if (!imageUrl) {
        alert('Image upload failed.');
        setUpload(false);
        return;
      }
      const productToSend = { ...product, images: imageUrl };
      const result = await addNewProduct(productToSend);
      setUpload(false);
      if (result && result.success) {
        console.log('✅ Product added successfully!');
        setProduct({
          id: '',
          name: '',
          description: '',
          price: 0,
          discount_price: 0,
          category: '',
          images: '',
          stock: 0,
          rating: 0,
          is_trending: false,
          is_available: true,
          productId: ''
        });
        setPreviewUrl(null);
        setIsImage(null);
      } else {
        console.error('❌ Error adding product:', result?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
      setUpload(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-md">
      {/* Product Image */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 mb-2">Product Image</h2>
        <label className="w-32 h-32 sm:w-40 sm:h-40 border border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center cursor-pointer bg-gray-50 relative group">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={500}   // give fixed dimensions
              height={500}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <FiUploadCloud size={24} />
              <span className="text-sm mt-1">Upload</span>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {/* Product Name */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-1">Product Name</label>
        <input
          type="text"
          placeholder="Type here"
          className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-[var(--btn-color)]"
          name="name"
          value={product.name ?? ''}
          onChange={handleChange}
        />
      </div>

      {/* Product Description */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-800 mb-1">Product Description</label>
        <textarea
          onChange={handleChange}
          value={product.description ?? ''}
          name="description"
          placeholder="Type here"
          rows={4}
          className="w-full border border-gray-300 rounded p-2 text-gray-700 focus:outline-[var(--btn-color)]"
        ></textarea>
      </div>

      {/* Category, Price, Offer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
        <div className="col-span-1 lg:col-span-2">
          <label className="block font-semibold text-gray-800 mb-1">Category</label>
          <select
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            <option>Round Neck (t-shirt)</option>
            <option>Hoodies & Sweatshirts</option>
            <option>Flowy longline tank</option>
            <option>Crop Top</option>
            <option>Kaftan Top</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">Product Price</label>
          <input
            type="number"
            placeholder="0"
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            value={product.price ?? ''}
            name="price"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">Stock</label>
          <input
            type="number"
            placeholder="0"
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            value={product.stock ?? ''}
            name="stock"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">Trending</label>
          <input
            type="checkbox"
            name="is_trending"
            checked={product.is_trending}
            onChange={(e) => setProduct((prev) => ({ ...prev, is_trending: e.target.checked }))}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">Available</label>
          <input
            type="checkbox"
            name="is_available"
            checked={product.is_available}
            onChange={(e) => setProduct((prev) => ({ ...prev, is_available: e.target.checked }))}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">Rating</label>
          <input
            type="number"
            placeholder="0"
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            value={product.rating ?? ''}
            name="rating"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">Discount Price</label>
          <input
            type="number"
            placeholder="0"
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            name="discount_price"
            value={product.discount_price ?? ''}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          className="bg-[var(--btn-color)] text-white font-semibold px-6 py-2 rounded hover:bg-lime-800 transition"
          onClick={handleSubmit}
        >
          {upload ? 'Uploading...' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
