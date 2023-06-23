import { configureStore } from "@reduxjs/toolkit";
import songReducer from "../slices/songSlice";

export const store = configureStore({
  reducer: {
    song: songReducer,
  },
});
