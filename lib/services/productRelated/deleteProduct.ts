import axios from 'axios';

export const deleteProducts = async (id: string | undefined) => {
    if (!id) return;

    try {
        const res = await axios.delete(`/api/products/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });

        return res.data.message;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const backendMessage = error.response?.data?.message || "Unknown error from server";
            console.error("❌ Axios Error deleteing product:", backendMessage);
            return { success: false, message: backendMessage, error: error.toJSON() };
        } else if (error instanceof Error) {
            console.error("❌ JS Error deleteing product:", error.message);
            return { success: false, message: error.message, error };
        } else {
            console.error("❌ Unknown Error deleteing product:", error);
            return { success: false, message: "Unexpected error occurred", error };
        }
    }
};
