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

export const selectTotalQuantity = (state: RootState): number => {
  return state.cart.cartItems.reduce(
    (total: number, item: CartType) => total + item.quantity,
    0
  );
};

// Create the slice
export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;

      if(product.stock <= 0) {
        toast({
          title: "Out of Stock",
          description: "There no item in stock",
          variant: "destructive",
        });
        return;
      }

      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem && existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else if (existingItem?.quantity === product.stock) {
        toast({
          title: "Stock Limit Reached",
          description: "You have reached the stock limit for this product",
          variant: "destructive",
        });
        return;
      } else {
        const cartItem: CartType = {
          ...product, // Spread the properties of ProductType
          quantity: 1, // Add the quantity field
        };
        console.log(cartItem);
        state.cartItems.push(cartItem);
      }
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    reduceItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    increaseItem: (state, action: PayloadAction<CartType>) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem && existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      } else if (existingItem?.quantity === product.stock) {
        toast({
          title: "Stock Limit Reached",
          description: "You have reached the stock limit for this product",
          variant: "destructive",
        });
        return;
      } else {
        const cartItem: CartType = {
          ...product, // Spread the properties of ProductType
          quantity: 1, // Add the quantity field
        };
        console.log(cartItem);
        state.cartItems.push(cartItem);
      }
      toast({
        title: "Success",
        description: "Product added to cart",
      });
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export the actions
export const {
  addToCart,
  removeFromCart,
  reduceItem,
  increaseItem,
  clearCart,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
