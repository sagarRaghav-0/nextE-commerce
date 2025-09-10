import { Product } from "@/types/product";
import axios from "axios";

export const addNewProduct = async (product: Product) => {
    try {
        const res = await axios.post('/api/products', product);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // If the backend sends JSON { success, message }
            const backendMessage = error.response?.data?.message || "Unknown error from server";
            console.error("❌ Axios Error adding product:", backendMessage);
            return { success: false, message: backendMessage, error: error.toJSON() };
        } else if (error instanceof Error) {
            // Handle standard JS errors
            console.error("❌ JS Error adding product:", error.message);
            return { success: false, message: error.message, error };
        } else {
            // Fallback for any unknown error shapes
            console.error("❌ Unknown Error adding product:", error);
            return { success: false, message: "Unexpected error occurred", error };
        }
    }
};
