import { CartItemsUploadToSupabase } from "@/types/cart";
import axios from "axios";

export const cartItemsUpload = async (
  payload: CartItemsUploadToSupabase,
  options?: { overwrite?: boolean }   // ✅ extra argument
) => {
  try {
    const res = await axios.post("/api/cartitems", {
      ...payload,
      overwrite: options?.overwrite ?? false, // ✅ attach overwrite flag
    });

    console.log("comes from cartItemsUpload:", res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage =
        error.response?.data?.message || "Unknown error from server";
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
