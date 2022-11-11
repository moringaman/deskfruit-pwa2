import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";

import { RootState } from '../../app/store'
import AuthService from "../../services/auth.service";
import { deskAdded } from '../desk/deskSlice'
  //@ts-ignore

const user = JSON.parse(localStorage.getItem("user"));
type formData = {
    deskId: string,
    password: string,
    email: string
}
export const register = createAsyncThunk<typeof user,formData >(
  "auth/register",
  //@ts-ignore

  //@ts-ignore
  async ({ deskId, email, password }, thunkAPI) => {
    try {
      const response: any = await AuthService.register(deskId, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      thunkAPI.dispatch(deskAdded(response.data))
      return response.data;
    } catch (error: any) {
      const message = (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(1);
    }
  }
);

export const login = createAsyncThunk<typeof user,formData >(
  "auth/userLogin",
  //@ts-ignore
 
  //@ts-ignore
  async ({ deskId, password }, thunkAPI) => {
    try {
      setMessage("Logging in")
      const data = await AuthService.login(deskId, password);
      return { user: data };
    } catch (error: any) {
      const message = (error.response &&
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
export const auth = (state: RootState) => state.auth
export default reducer;