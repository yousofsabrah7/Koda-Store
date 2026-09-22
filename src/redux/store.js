import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/authSlice";
import cartSlice from "./services/cartSlice";

export const store = configureStore({
  reducer: { auth: authSlice, cart: cartSlice },
});
