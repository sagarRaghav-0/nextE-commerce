import { Order } from "@/types/order";
import axios from "axios";

type ShowOrderResponse = {
    success: boolean;
    data?: Order[];
    message?: string;
};

export const showOrder = async (): Promise<ShowOrderResponse> => {
    try {
        const res = await axios.get("/api/orders");

        console.log("✅ Orders fetched:", res.data);

        // Always return { success: true, data: [...] }
        return {
            success: true,
            data: res.data as Order[],
        };
    } catch (error) {
        console.error("❌ Error fetching orders:", error);

        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.error || "Unknown error from server",
            };
        }

        if (error instanceof Error) {
            return { success: false, message: error.message };
        }

        return { success: false, message: "Unexpected error occurred" };
    }
};
