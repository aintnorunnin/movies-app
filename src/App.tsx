import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddMovieForm from "./components/AddMovieForm";
import MoviesList from "./components/MoviesList";
import "./App.css";
import { MoviesState } from "./store/movie-slice";
import { getMoviesData } from "./store/movie-actions";

const App = () => {
  const moviesState: MoviesState = useSelector(
    (storeState: any) => storeState.movies
  );
  const dispatch = useDispatch();

  const getMovies = useCallback(async () => {
    dispatch(getMoviesData());
  }, [dispatch]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  let content = <p>No movies were found</p>;
  if (moviesState.error) {
    content = <p>{moviesState.error}</p>;
  }

  if (moviesState.movies.length > 0) {
    content = <MoviesList movies={moviesState.movies} />;
  }

  if (moviesState.loading) {
    content = <p>Retrieving movies ... </p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovieForm />
      </section>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

export default App;
