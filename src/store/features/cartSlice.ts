import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/api/product/types";
import { CartType } from "@/api/cart/types";
import { toast } from "@/hooks/use-toast";
import { RootState } from "..";

// Define the initial state
interface CartState {
  cartItems: CartType[];
}

const initialState: CartState = {
  cartItems: [],
};

// Helper function to find an item in the cart
const findCartItem = (cartItems: CartType[], productId: string) =>
  cartItems.find((item) => item.id === productId);

// Helper function to show toast notifications
const showToast = (title: string, description: string, variant: "default" | "destructive" = "default") => {
  toast({ title, description, variant });
};

// Selector to calculate total quantity in the cart
export const selectTotalQuantity = (state: RootState): number =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);

// Create the slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;

      if (product.stock <= 0) {
        showToast("Out of Stock", "There are no items in stock", "destructive");
        return;
      }

      const existingItem = findCartItem(state.cartItems, product.id);

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1;
          showToast("Success", "Product quantity increased in cart");
        } else {
          showToast("Stock Limit Reached", "You have reached the stock limit for this product", "destructive");
        }
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
        showToast("Success", "Product added to cart");
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    reduceItem: (state, action: PayloadAction<string>) => {
      const existingItem = findCartItem(state.cartItems, action.payload);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
      }
    },
    increaseItem: (state, action: PayloadAction<CartType>) => {
      const product = action.payload;
      const existingItem = findCartItem(state.cartItems, product.id);

      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1;
          showToast("Success", "Product quantity increased in cart");
        } else {
          showToast("Stock Limit Reached", "You have reached the stock limit for this product", "destructive");
        }
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
        showToast("Success", "Product added to cart");
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart, reduceItem, increaseItem, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;