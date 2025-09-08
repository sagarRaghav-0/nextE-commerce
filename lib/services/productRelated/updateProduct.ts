import { Product } from "@/types/product";
import axios from "axios";

interface UpdateProductResult {
    success: boolean;
    message?: string;
    data?: Product;
}

export const updateProduct = async (
    product: Product
): Promise<UpdateProductResult> => {
    const { id, ...productData } = product;

    try {
        const res = await axios.patch(`/api/products/${id}`, productData, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("Success:", res.data?.message || "Updated successfully");

        return {
            success: true,
            message: res.data?.message,
            data: res.data,
        };
    } catch (error: unknown) {
        let message = "Unknown error";

        if (axios.isAxiosError(error)) {
            // AxiosError gives access to response data safely
            message = error.response?.data?.message || error.message;
        }

        console.error("Error updating product:", message);

        return {
            success: false,
            message,
        };
    }
};
