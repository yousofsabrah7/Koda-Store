import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");

const initialState = {
  token: storedToken,
  user: null,
  isAuthenticated: Boolean(storedToken),
  // false only after the API answered 403 (e.g. "Admin only")
  isAuthorized: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // payload = login response: { success, message, token, user }
    setLogin: (state, { payload }) => {
      state.token = payload?.token ?? state.token;
      state.user = payload?.user ?? null;
      state.isAuthenticated = Boolean(state.token);
      state.isAuthorized = true;
    },

    // payload = /auth/me response (either { user } or the user itself)
    setProfile: (state, { payload }) => {
      state.user = payload?.user ?? payload ?? null;
    },

    setLogout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthorized = true;
    },

    // payload = HTTP status code of a failed request
    setAuthorize: (state, { payload: status }) => {
      if (status === 401) {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      } else if (status === 403) {
        state.isAuthorized = false;
      }
    },
  },
});

export const { setLogin, setProfile, setLogout, setAuthorize } =
  authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAuthorized = (state) => state.auth.isAuthorized;
export const selectIsAdmin = (state) => state.auth.user?.role === "admin";

export default authSlice.reducer;
