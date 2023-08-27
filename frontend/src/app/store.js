import { configureStore } from "@reduxjs/toolkit";
import songReducer from "../slices/songSlice";
import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    song: songReducer,
    user: userReducer,
  },
});
