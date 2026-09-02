import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: null,
  verified: false,
  authLoading: false,
  authSuccess: false,
  authError: false,
  isAdmin: false,
  isAuthorize: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      if (action.payload === "loading") {
        state.authLoading = true;
        state.authSuccess = false;
        state.authError = false;
      } else if (action.payload === "success") {
        state.authSuccess = true;
        state.authLoading = false;
        state.authError = false;
      } else if ((action.payload = "error")) {
        state.authError = true;
        state.authSuccess = false;
        state.authLoading = false;
      }
    },
    setVerify: (state, action) => {
      state.verified = action.payload;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.verified = action.payload.isVerified;
      state.role = action.payload.user.role;
      state.isAuthorize = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.verified = false;
      state.isAuthorize = false;
    },
    setProfile: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.verified = action.payload.isVerified;
      state.role = action.payload.user;
      state.isAuthorize = true;
    },
    setAdmin: (state, action) => {
      action.payload.message === "Welcome Admin"
        ? (state.isAdmin = true)
        : (state.isAdmin = false);
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setAuthorize: (state, action) => {
      state.isAuthorize = action.payload === 401 ? false : true;
    },
  },
});

export const {
  setAuthStatus,
  setVerify,
  setLogin,
  setLogout,
  setProfile,
  setAdmin,
  setRole,
  setAuthorize,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectRole = (state) => state.auth.role;
export const selectVerified = (state) => state.auth.verified;
export const selectAuthLoading = (state) => state.auth.authLoading;
export const selectAuthSuccess = (state) => state.auth.authSuccess;
export const selectAuthError = (state) => state.auth.authError;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectIsAuthorize = (state) => state.auth.isAuthorize;

export default authSlice.reducer;
