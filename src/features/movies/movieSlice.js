import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  shows: [],
  singleMovie: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    addMovies(state, action) {
      state.movies = action.payload;
    },
    addShows(state, action) {
      state.shows = action.payload;
    },
    addSingleMovie(state, action) {
      state.singleMovie = action.payload;
    },
    removeSelectedMovie(state) {
      state.singleMovie = {};
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
