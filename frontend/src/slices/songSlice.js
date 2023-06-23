import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "song",
  initialState: {
    currentSong: null,
  },
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
  },
});

export const { setCurrentSong } = songSlice.actions;

export default songSlice.reducer;
