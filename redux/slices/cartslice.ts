import { CartItem } from '@/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadCartFromStorage, saveCartToStorage } from '../localStorage';

interface CartState {
    cart: CartItem[];
    coupon: string | null;
    discount: number;
    // skipUpload?: boolean;
}

const initialState: CartState = {
    cart: loadCartFromStorage(),
    coupon: null,
    discount: 0,
    // skipUpload: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.cart.find(item => item.productId === action.payload.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.cart.push(action.payload);
            }
            saveCartToStorage(state.cart);
        },

        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.cart.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                saveCartToStorage(state.cart);
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
            saveCartToStorage(state.cart);
        },

        clearCart: (state) => {
            state.cart = [];
            state.coupon = null;
            state.discount = 0;
            // state.skipUpload = false;
            saveCartToStorage(state.cart);
        },

        setCart: (state, action: PayloadAction<{ items: CartItem[] }>) => {
            state.cart = action.payload.items;
            saveCartToStorage(state.cart);
        },

        // state.skipUpload = action.payload.skipUpload ?? false;

        // 🏷 Coupon logic
        applyCoupon: (
            state,
            action: PayloadAction<{ code: string; discount: number }>
        ) => {
            const { code, discount } = action.payload;
            if (code.toLowerCase() === "rajat") {
                state.coupon = code;
                state.discount = discount;
            } else {
                state.coupon = null;
                state.discount = 0;
            }
        },


        clearCoupon: (state) => {
            state.coupon = null;
            state.discount = 0;
        }
    },
});

export const {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setCart,
    applyCoupon,
    clearCoupon
} = cartSlice.actions;

export default cartSlice.reducer;
