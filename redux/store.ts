import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './slices/cartslice';
import ProductReducer from './slices/productSlice';
import ReviewSlice from './slices/reviewSlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReducer,
    review: ReviewSlice,

  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
