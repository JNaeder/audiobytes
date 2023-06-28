import { createSlice } from "@reduxjs/toolkit";

export const songSlice = createSlice({
  name: "song",
  initialState: {
    currentSong: null,
    isPlaying: false,
  },
  reducers: {
    setCurrentSong(state, action) {
      state.currentSong = action.payload;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
  },
});

export const { setCurrentSong, setIsPlaying } = songSlice.actions;

export default songSlice.reducer;
