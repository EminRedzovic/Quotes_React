import slice, { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
const initialState = {
  favorites: [],
};
export const quoteSlice = createSlice({
  name: "quote",
  initialState: initialState,

  reducers: {
    setFavorite(state, actions) {
      const quote = actions.payload;
      const favIds = state.favorites.map((item) => item._id);
      if (!favIds.includes(quote._id)) {
        state.favorites.push(quote);
      }
      return state;
    },
    clearFavorites(state, actions) {
      return initialState;
    },
  },
});
