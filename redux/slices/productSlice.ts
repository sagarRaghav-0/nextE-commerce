
import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: Product | null;
}

const initialState: ProductState = {
  products: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clickedProduct: (state, action: PayloadAction<Product>) => {
      state.products = action.payload;
      console.log(state);
    },
  },
});

export const { clickedProduct } = productSlice.actions;
export default productSlice.reducer;
