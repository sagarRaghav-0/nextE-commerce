'use client';

import { CategoryProduct } from '@/types/category';
import Image from 'next/image';

const Categories = () => {


    const categoryProducts: CategoryProduct[] = [
        {
            id: 1,
            images: '/tshirt/gt.webp',
            category: 'Crop Top',

        },
        {
            id: 2,
            images: '/tshirt/gt2.webp',
            category: 'Kaftan Top ',

        },
        {
            id: 3,
            images: '/tshirt/gt3.webp',
            category: 'Flowy longline tank',

        },
        {
            id: 4,
            images: '/tshirt/rt.webp',
            category: ' Round Neck (t-shirt)',

        }
    ]

    return (
        <div className="mb-15 md:mb-30">
            {/* Title */}
            <div className="text-5xl text-center py-15 tracking-wider">
                <h2 className="text-3xl md:text-6xl">Our Categories</h2>
            </div>

            {/* Products Grid */}
            <div className="flex flex-wrap items-center justify-around gap-y-10">
                {categoryProducts.map(product => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center justify-center w-max max-h-fit"
                    >
                        {/* Image */}
                        <div className="flex flex-col items-center relative">
                            <Image
                                src={product.images || "/placeholder.png"}
                                width={270}
                                height={270}
                                alt={product.category}
                                className="object-contain"
                            />
                            <div className="w-32 h-4 bg-black opacity-20 rounded-full mt-[-1px] blur-md z-0"></div>
                        </div>

                        {/* Category Name */}
                        <p className="text-xl font-normal tracking-wider mt-10 mb-10 md:mb-0">
                            {product.category}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
