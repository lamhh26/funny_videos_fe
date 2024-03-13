import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";
import { camelizeKeys, decamelizeKeys } from "humps";

const initialState = {
  status: "idle",
  error: {
    login: null,
    signup: null,
  },
  currentUser: {},
};

export const login = createAsyncThunk(
  "session/login",
  async (user, { rejectWithValue }) => {
    let response;
    try {
      response = await client.post("/login", decamelizeKeys(user));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "session/signup",
  async (user, { rejectWithValue }) => {
    let response;
    try {
      response = await client.post("/signup", decamelizeKeys(user));
    } catch (error) {
      return rejectWithValue(camelizeKeys(error.response.data));
    }
    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "session/currentUser",
  async () => {
    const response = await client.get("/current_user");
    return response.data;
  }
);

export const logout = createAsyncThunk("session/logout", async () => {
  const response = await client.delete("/logout");
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
        state.currentUser = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error.login = action.payload.error;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error.signup = action.payload.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = {};
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      });
  },
});

export const selectCurrentUser = (state) => state.session.currentUser;
export const selectIsLoggedIn = (state) => !!state.session.currentUser.id;

export default sessionSlice.reducer;
