import slice, { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
  userId: null,
  fullName: null,
  email: null,
  isAdmin: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setData(state, actions) {
      const data = actions.payload;
      console.log(data, "data");
      state = data;
      return state;
    },
    logout(state, actions) {
      return initialState;
    },
  },
});
export const testSlice = createSlice({
  name: "test",
  initialState: {
    test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    test2: "ua",
  },

  reducers: {
    setData(state, actions) {
      const data = actions.payload;
      console.log(data, "data");
      state = data;
      return state;
    },
  },
});
