import React, { useCallback, useEffect, useState } from "react";
import MovieModel from "../models/movie";
import MovieService from "../services/MovieService";

interface MoviesContextInterface {
  movies: MovieModel[];
  error: string;
  loading: boolean;
  callMovieAPI: () => void;
  addMovie: (movie: MovieModel) => void;
}

const INITIAL_MOVIES_STATE: MovieModel[] = [];

const DEFAULT_MOVIES_CONTEXT: MoviesContextInterface = {
  movies: INITIAL_MOVIES_STATE,
  error: "",
  loading: false,
  callMovieAPI: () => {},
  addMovie: (movie) => {},
};

const MoviesContext = React.createContext(DEFAULT_MOVIES_CONTEXT);

export const MoviesContextProvider: React.FC = (props) => {
  const Movie_Service = new MovieService();
  const [movies, setMovies] = useState(INITIAL_MOVIES_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      setMovies(await Movie_Service.getMovies());
    } catch (error) {
      const er = error as Error;
      setError(er.message);
    }
    setLoading(false);
  }, []);

  const addMovie = (movie: MovieModel) => {
    Movie_Service.addMovie(movie);
  };

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const movieCxt = {
    movies: movies,
    error: error,
    loading: loading,
    callMovieAPI: fetchMovies,
    addMovie: addMovie,
  };
  return (
    <MoviesContext.Provider value={movieCxt}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContext;
