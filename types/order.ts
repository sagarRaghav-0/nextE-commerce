// types/order.ts
import { CartItem } from "./cart";

export interface BillingDetails {
  firstName: string;
  lastName: string;
  country: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  notes?: string;
}
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "canceled";

export interface Order {
  id: string; // UUID or DB-generated
  billingDetails: BillingDetails;
  items: CartItem[]; // Already defined in your cart types
  subtotal?: number,
  discount?: number; // for coupon (if any)
  total: number;
  userId?: string; // optional: if signed in
  created_at: string; // ISO date string
  status: OrderStatus;
}
