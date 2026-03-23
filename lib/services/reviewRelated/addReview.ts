import axios from "axios";

export const addNewReview = async (review: { productId: string; reviewText: string }) => {
    try {
        const res = await axios.post('/api/review', review);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const backendMessage = error.response?.data?.message || "Unknown error from server";
            console.error("❌ Axios Error adding product:", backendMessage);
            return { success: false, message: backendMessage, error: error.toJSON() };
        } else if (error instanceof Error) {
            console.error("❌ JS Error adding product:", error.message);
            return { success: false, message: error.message, error };
        } else {
            console.error("❌ Unknown Error adding product:", error);
            return { success: false, message: "Unexpected error occurred", error };
        }
    }
};
