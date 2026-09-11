import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  sidebarCollapsed: false,
  pageSize: 10,
  tableDensity: "comfortable",
};

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },

    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },

    setTableDensity: (state, action) => {
      state.tableDensity = action.payload;
    },

    resetSettings: () => initialState,
  },
});

export const {
  setTheme,
  setSidebarCollapsed,
  setPageSize,
  setTableDensity,
  resetSettings,
} = settingsSlice.actions;

export const selectTheme = (state) => state.settings.theme;

export const selectSidebarCollapsed = (state) =>
  state.settings.sidebarCollapsed;

export const selectPageSize = (state) => state.settings.pageSize;

export const selectTableDensity = (state) =>
  state.settings.tableDensity;

export default settingsSlice.reducer;