import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: null,
  error: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    loadmovie: (state, action) => {
      state.info = action.payload;
      state.error = null;
    },
    removemovie: (state) => {
      state.info = null;
      state.error = null;
    },
    setMovieError: (state, action) => {
      state.error = action.payload;
      state.info = null;
    },
  },
});

export const { loadmovie, removemovie, setMovieError } = movieSlice.actions;

export default movieSlice.reducer;
