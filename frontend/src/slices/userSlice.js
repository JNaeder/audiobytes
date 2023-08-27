import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    profilePic: null,
    email: null,
    userId: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
    },

    logout(state) {
      state.username = null;
      state.email = null;
    },
  },
});

export const { setCurrentUser, logout } = userSlice.actions;
export default userSlice.reducer;
