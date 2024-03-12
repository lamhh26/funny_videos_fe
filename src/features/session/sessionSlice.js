import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";
import { decamelizeKeys } from "humps";

const initialState = {
  status: "idle",
  error: null,
  currentUser: {},
};

export const login = createAsyncThunk("session/login", async (user) => {
  const response = await client.post("/login", decamelizeKeys(user));
  return response.data;
});

export const signup = createAsyncThunk("session/signup", async (user) => {
  const response = await client.post("/signup", decamelizeKeys(user));
  return response.data;
});

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCurrentUser = (state) => state.session.currentUser;

export default sessionSlice.reducer;
