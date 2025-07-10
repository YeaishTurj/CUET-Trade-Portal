import { createSlice } from "@reduxjs/toolkit";

// Utility functions
const setSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

const setProductsTotal = (state) =>
  state.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

// Initial state
const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  deliveryCharge: 50, // Default delivery charge (you can change this dynamically later)
};

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExists = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (!isExists) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        console.log("Product already exists in the cart");
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setProductsTotal(state) + state.deliveryCharge;
    },

    updateQuantity: (state, action) => {
      state.products.forEach((product) => {
        if (product.id === action.payload.id) {
          if (action.payload.type === "increment") {
            product.quantity += 1;
          } else if (
            action.payload.type === "decrement" &&
            product.quantity > 1
          ) {
            product.quantity -= 1;
          }
        }
      });

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setProductsTotal(state) + state.deliveryCharge;
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setProductsTotal(state) + state.deliveryCharge;
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
    },

    setDeliveryCharge: (state, action) => {
      state.deliveryCharge = action.payload;
      state.totalPrice = setProductsTotal(state) + state.deliveryCharge;
    },
  },
});

// Export actions and reducer
export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setDeliveryCharge,
} = cartSlice.actions;

export default cartSlice.reducer;
