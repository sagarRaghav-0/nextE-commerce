import { Order } from "@/types/order";
import axios from "axios";

export const placeOrder = async (payload: Order) => {
    try {
        const res = await axios.post("/api/orders", payload);

        console.log("✅ Order placed:", res.data);
        return { success: true, ...res.data };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const backendMessage =
                error.response?.data?.error ||
                "Unknown error from server";
            return {
                success: false,
                message: backendMessage,
                error: error.toJSON?.() ?? error,
            };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message, error };
        }

        return { success: false, message: "Unexpected error occurred", error };
    }
};
