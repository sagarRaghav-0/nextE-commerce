'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiCheckSquare, FiList, FiPlusCircle } from 'react-icons/fi';

const AdminSideBar = () => {
    const pathname = usePathname();

    const [addProduct, setAddProduct] = useState('');
    const [productList, setProductList] = useState('');
    const [orders, setOrders] = useState('');
    const [users, setUsers] = useState('');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width > 746) {
                setAddProduct('Add Product')
                setProductList('Product List')
                setOrders('Orders')
                setUsers('Users')

            }
            else {
                setAddProduct('')
                setProductList('')
                setOrders('')
                setUsers('')
            }

        };

        handleResize(); // Set initial
        window.addEventListener('resize', handleResize); // Add listener

        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    return (
        <div className="w-fit h-screen border-r border-gray-200 bg-white">
            <div className="flex flex-col">


                <Link href="/dashboard" className={`flex items-center w-fit gap-3 px-6 py-4 ${pathname === '/dashboard' ? 'bg-[var(--bbs-color)] border-r-4 border-[var(--btn-color)] text-gray-800 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}>
                    <FiPlusCircle className="text-xl" />
                    <span>{addProduct}</span>
                </Link>


                <Link href="/dashboard/productlist" className={`flex items-center gap-3 px-6 py-4 ${pathname === '/dashboard/productlist' ? 'bg-[var(--bbs-color)] border-r-4 border-[var(--btn-color)]  text-gray-800 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}>
                    <FiList className="text-xl" />
                    <span>{productList}</span>
                </Link>


                <Link href="/dashboard/orders" className={`flex items-center gap-3 px-6 py-4 ${pathname === '/dashboard/orders' ? ' bg-[var(--bbs-color)] border-r-4 border-[var(--btn-color)]  text-gray-800 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}>
                    <FiCheckSquare className="text-xl" />
                    <span>{orders}</span>
                </Link>
                <Link href="/dashboard/users" className={`flex items-center gap-3 px-6 py-4 ${pathname === '/dashboard/users' ? ' bg-[var(--bbs-color)] border-r-4 border-[var(--btn-color)]  text-gray-800 font-medium' : 'hover:bg-gray-50 text-gray-700'}`}>
                    <FiCheckSquare className="text-xl" />
                    <span>{users}</span>
                </Link>
            </div>
        </div>
    );
};

export default AdminSideBar;
