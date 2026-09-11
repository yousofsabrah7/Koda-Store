import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "./services/authSlice";
import usersReducer from "./usersSlice";
export const store = configureStore({
  reducer: { auth: authSlice, users:usersReducer },
 
});
