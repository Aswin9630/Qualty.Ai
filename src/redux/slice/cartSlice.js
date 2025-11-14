import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addCartItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeCartItem: (state, action) => {
  state.items = state.items.filter(item => item._id !== action.payload);
},
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { setCartItems, addCartItem, clearCart,removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
