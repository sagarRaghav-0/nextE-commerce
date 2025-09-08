// types/cart.ts

import { Product } from "./product";

export type CartItem = Product & { quantity: number };


export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
};

export type CartItemsUploadToSupabase = CartItem & {
  userId?: string;

};
