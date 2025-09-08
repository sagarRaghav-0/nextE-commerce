// lib/services/validation.ts
import { Product } from '@/types/product';

export function validation(product: Product): { isValid: boolean; message?: string } {
    if (!product.name.trim()) return { isValid: false, message: "Please enter a product name." };
    if (!product.description?.trim()) return { isValid: false, message: "Please enter a product description." };
    if (!product.category.trim()) return { isValid: false, message: "Please select a category." };
    if (product.price <= 0) return { isValid: false, message: "Please enter a valid price greater than 0." };
    if (product.stock < 1) return { isValid: false, message: "Please enter a stock quantity greater than 0." };

    return { isValid: true };
}
