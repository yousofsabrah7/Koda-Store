import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  coupon: null,
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setCart: (state, { payload }) => {
      state.items = payload?.items ?? [];
      state.coupon = payload?.coupon ?? null;
      state.discount = payload?.discount ?? 0;
    },

    clearCartState: (state) => {
      state.items = [];
      state.coupon = null;
      state.discount = 0;
    },
  },
});

export const {
  setCart,
  clearCartState,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCoupon = (state) => state.cart.coupon;
export const selectCartDiscount = (state) => state.cart.discount;

export default cartSlice.reducer;