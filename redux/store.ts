import { configureStore } from "@reduxjs/toolkit";
import factoryReducer from "./slices/factorySlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    factory: factoryReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
