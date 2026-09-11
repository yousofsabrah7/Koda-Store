import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/authSlice";
import settingsSlice from "./services/settingsSlice";

export const store = configureStore({
  reducer: { auth: authSlice, settings: settingsSlice },
});
