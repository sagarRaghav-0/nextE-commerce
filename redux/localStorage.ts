'use client'
import type { CartItem } from "@/types/cart";
import type { Order } from "@/types/order";
import { Review } from "@/types/reviews";


const Cart_key = 'cart-data-ekamya_2';

export const saveCartToStorage = (cart: CartItem[], useSession = false) => {

  if (typeof window === 'undefined') {
    return [];
  }

  const storage = useSession ? sessionStorage : localStorage;
  storage.setItem(Cart_key, JSON.stringify(cart))
}

export const loadCartFromStorage = (useSession = false): CartItem[] => {

  if (typeof window === 'undefined') {
    return [];
  }

  const storage = useSession ? sessionStorage : localStorage;

  const data = storage.getItem(Cart_key);
  return data ? JSON.parse(data) : [];
}
export const clearStorage = (useSession = false): void | [] => {

  if (typeof window === 'undefined') {
    return [];
  }

  const storage = useSession ? sessionStorage : localStorage;

  storage.removeItem(Cart_key);
}





const Order_key = 'order-data-ekamya_2';

// ✅ Save orders
export const saveOrdersToStorage = (orders: Order[], useSession = false) => {
  if (typeof window === 'undefined') return;

  const storage = useSession ? sessionStorage : localStorage;
  storage.setItem(Order_key, JSON.stringify(orders));
};

// ✅ Load orders
export const loadOrdersFromStorage = (useSession = false): Order[] => {
  if (typeof window === 'undefined') return [];

  const storage = useSession ? sessionStorage : localStorage;
  const data = storage.getItem(Order_key);
  return data ? JSON.parse(data) : [];
};

// ✅ Clear orders
export const clearOrdersStorage = (useSession = false): void => {
  if (typeof window === 'undefined') return;

  const storage = useSession ? sessionStorage : localStorage;
  storage.removeItem(Order_key);
};


const Review_key = "review-data-ekamya_2";

// ✅ Save review
export const saveReviewToStorage = (review: Review[], useSession = false) => {
  if (typeof window === 'undefined') return;

  const storage = useSession ? sessionStorage : localStorage;
  storage.setItem(Review_key, JSON.stringify(review));
};


// ✅ Load Reviews
export const loadReviewFromStorage = (useSession = false): Review[] => {
  if (typeof window === 'undefined') return [];

  const storage = useSession ? sessionStorage : localStorage;
  const data = storage.getItem(Review_key);
  return data ? JSON.parse(data) : [];
};

// ✅ Clear Reviews
export const clearReviewStorage = (useSession = false): void => {
  if (typeof window === 'undefined') return;

  const storage = useSession ? sessionStorage : localStorage;
  storage.removeItem(Review_key);
};