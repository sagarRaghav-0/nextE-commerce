"use client";
import { setCart } from '@/redux/slices/cartslice';
import { RootState } from '@/redux/store';
import { CartItem } from '@/types/cart';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CartSync = () => {
    const { isSignedIn, isLoaded, user } = useUser();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);

    const hasSyncedOnLogin = useRef(false);
    const prevUserId = useRef<string | null>(null);

    // 🔹 Reset sync flag if user changes
    useEffect(() => {
        if (user?.id !== prevUserId.current) {
            hasSyncedOnLogin.current = false; // allow fresh sync
            prevUserId.current = user?.id || null;
        }
    }, [user?.id]);

    // 🔹 On login: load DB cart OR upload guest cart
    useEffect(() => {
        const syncCartOnLogin = async () => {
            if (!isSignedIn || !isLoaded || !user || hasSyncedOnLogin.current) return;

            try {
                const res = await axios.get(`/api/cartitems?userId=${user.id}`);
                const dbCart = res.data as CartItem[];

                if (dbCart.length > 0) {
                    dispatch(setCart({ items: dbCart }));
                    console.log("✅ Loaded cart from DB:", dbCart);
                } else if (cart.length > 0) {
                    for (const item of cart) {
                        await axios.post(`/api/cartitems`, { ...item, overwrite: true });
                    }
                    console.log("✅ Uploaded guest cart to DB:", cart);
                }

                hasSyncedOnLogin.current = true;
            } catch (error) {
                console.error("❌ Cart sync error (login):", error);
            }
        };

        syncCartOnLogin();
    }, [isSignedIn, isLoaded, user?.id]);

    // 🔹 When cart changes locally → sync changes to DB
    useEffect(() => {
        const syncCartChanges = async () => {
            if (!isSignedIn || !isLoaded || !user) return;

            try {
                for (const item of cart) {
                    await axios.post(`/api/cartitems`, { ...item, overwrite: true });
                }
                console.log("✅ Cart updated in DB:", cart);
            } catch (error) {
                console.error("❌ Cart sync error (update):", error);
            }
        };

        if (hasSyncedOnLogin.current) {
            syncCartChanges();
        }
    }, [cart, isSignedIn, isLoaded, user?.id]);

    return null;
};

export default CartSync;
