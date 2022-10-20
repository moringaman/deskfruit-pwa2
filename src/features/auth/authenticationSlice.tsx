import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";

import AuthService from "../../services/auth.service";
  //@ts-ignore

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  //@ts-ignore

  async ({ username, email, password }, thunkAPI) => {
    try {
      const response:any = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(1);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  //@ts-ignore

  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error:any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(0);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

  //@ts-ignore
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
  //@ts-ignore

    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
  //@ts-ignore

    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  //@ts-ignore

    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
  //@ts-ignore

    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  //@ts-ignore

    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default authSlice.reducer;