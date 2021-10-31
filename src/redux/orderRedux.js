import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name:"order",
  initialState: {
    orders: [],
    quantity: 0,
  },
  reducers: {
    addOrder: (state, action) => {
      state.quantity += 1;
      state.orders.push(action.payload);
      console.log(action.payload)
    },
    getOrder: (state, action) => {
      state.quantity += 1;
      state.orders = action.payload
    },
    removeOrder: (state, action) => {
      state.quantity -= 1;
      const newCart = state.orders.filter(item => item._id !== action.payload.orders._id);
      state.orders = newCart;
    }
  }
});

export const { addOrder, removeOrder, getOrder } = orderSlice.actions;
export default orderSlice.reducer;