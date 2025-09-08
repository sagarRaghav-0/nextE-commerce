import { User } from "@/types/user";
import axios from "axios";

export const addNewUser = async (users: User) => {
    try {

        await axios.post('http://localhost:3000/api/users', users)

    } catch (error) {
        console.error("❌ Error adding user:", error);
        return { success: false, message: "An error occurred", error }
    }
}