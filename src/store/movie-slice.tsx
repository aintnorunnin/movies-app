import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MovieModel from "../models/movie";

export interface MoviesState {
  movies: MovieModel[];
  error: string;
  loading: boolean;
}

const DEFAULT_MOVIES_STATE: MoviesState = {
  movies: [],
  error: "",
  loading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState: DEFAULT_MOVIES_STATE,
  reducers: {
    addMovie: (state: MoviesState, action: PayloadAction<MovieModel>) => {
      state.movies.push(action.payload);
    },
    setMovies: (state: MoviesState, action: PayloadAction<MovieModel[]>) => {
      state.movies = action.payload;
    },
    setLoading: (state: MoviesState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: MoviesState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;
