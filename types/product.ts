export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  category: string;
  images: string;
  stock: number;
  rating?: number;
  is_trending?: boolean;
  is_available: boolean;
  created_at?: string;
  quantity?: number,
  productId: string
};
