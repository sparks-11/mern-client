import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name:"cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.total += action.payload.price;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      const newCart = state.products.filter(item => item._id !== action.payload.product._id);
      state.products = newCart;
      state.total -= action.payload.price;
    },
    placedOrder: (state) => {
      state.products = []
      state.total = 0
      state.quantity=0
    }
  }
});

export const { addProduct, removeProduct, placedOrder } = cartSlice.actions;
export default cartSlice.reducer;