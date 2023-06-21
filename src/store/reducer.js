import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { authSlice, testSlice } from "./authSlice";
import { quoteSlice } from "./quoteSlice";

export const rootReduer = combineReducers({
  auth: authSlice.reducer,
  quote: quoteSlice.reducer,
});
