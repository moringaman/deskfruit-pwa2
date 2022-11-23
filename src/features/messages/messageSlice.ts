import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../../app/store'

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions
export default reducer;
export const messages = (state: RootState) => state.messages