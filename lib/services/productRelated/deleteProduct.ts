import axios from 'axios';

export const deleteProducts = async (id: string | undefined) => {
    if (!id) return;

    try {
        const res = await axios.delete(`/api/products/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });

        // Axios response data
        return res.data.message; // your backend sends { message: '...' }
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
