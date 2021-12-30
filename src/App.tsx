import React, { useCallback, useEffect, useState } from "react";

import AddMovieForm from "./components/AddMovieForm";
import MovieModel from "./models/movie";
import MoviesList from "./components/MoviesList";
import MovieService from "./services/MovieService";
import "./App.css";

const INITIAL_MOVIES: MovieModel[] = [];

const App = () => {
  const Movie_Service = new MovieService();
  const [movies, setMovies] = useState(INITIAL_MOVIES);
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

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  let content = <p>No movies were found</p>;
  if (error) {
    content = <p>{error}</p>;
  }

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (loading) {
    content = <p>Retrieving movies ... </p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovieForm addMovieHandler={Movie_Service.addMovie} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

export default App;
