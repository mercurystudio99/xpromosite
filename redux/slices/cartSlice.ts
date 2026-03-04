import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  images: any;
  specialInstruction?: string;
}

interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalQty: number;
}

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
  totalQty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({ ...action.payload });
      }

      cartSlice.caseReducers.updateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      cartSlice.caseReducers.updateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQty = 0;
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      cartSlice.caseReducers.updateTotals(state);
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload
          );
        }
      }
      cartSlice.caseReducers.updateTotals(state);
    },

    updateItemQtyCustom: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity); // Ensure quantity is at least 1
      }
      cartSlice.caseReducers.updateTotals(state);
    },

    updateTotals: (state) => {
      state.totalQty = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          total + (item.discountedPrice || item.price) * item.quantity,
        0
      );
    },

    updateSpecialInstruction: (
      state,
      action: PayloadAction<{ id: string; instruction: string }>
    ) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.specialInstruction = action.payload.instruction;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
  updateItemQtyCustom,
  updateSpecialInstruction,
} = cartSlice.actions;

export default cartSlice.reducer;
