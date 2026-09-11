import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, addUser, deleteUser, updataUser } from "../services/endpointapi";

// /
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const data = await getAllUsers();
  return data;
});

// 
export const createUser = createAsyncThunk("users/createUser", async (payload) => {
  const data = await addUser(payload);
  return data;
});

// 
export const removeUser = createAsyncThunk("users/removeUser", async (id) => {
  await deleteUser(id);
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // create
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // delete
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;