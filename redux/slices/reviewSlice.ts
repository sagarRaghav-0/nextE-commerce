import { Review } from "@/types/reviews";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadReviewFromStorage, saveReviewToStorage, } from "../localStorage";

interface ReviewState {
    reviews: Review[];
}

const initialState: ReviewState = {
    reviews: loadReviewFromStorage(), // ✅ load from storage on init
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<Review>) => {
            state.reviews.push(action.payload);
            saveReviewToStorage(state.reviews); // ✅ save reviews
        },
        removeReview: (state, action: PayloadAction<string>) => {
            state.reviews = state.reviews.filter(item => item.id !== action.payload);
            saveReviewToStorage(state.reviews); // ✅ clear in storage too
        },


    },
})

export const { addReview, removeReview } = reviewSlice.actions;
export default reviewSlice.reducer;
