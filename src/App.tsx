import React, { useCallback, useEffect, useState } from "react";

import AddMovieForm from "./components/AddMovieForm";
import MovieModel from "./models/movie";
import MoviesList from "./components/MoviesList";
import "./App.css";

const INITIAL_MOVIES: MovieModel[] = [];

const FIREBASE_MOVIE_API =
  "https://react-movies-app-2966b-default-rtdb.firebaseio.com/movies.json";

const App = () => {
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const jsonResponse = await fetch(FIREBASE_MOVIE_API);
      if (!jsonResponse.ok)
        throw new Error("An error occurred while retrieving data.");
      console.log(jsonResponse);
      const dataObj = await jsonResponse.json();
      setMovies(convertJSONMoviesToMovieModels(dataObj.results));
    } catch (error) {
      const er = error as Error;
      setError(er.message);
    }
    setLoading(false);
  }, []);

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

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  return (
    <React.Fragment>
      <section>
        <AddMovieForm />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

function convertJSONMoviesToMovieModels(jsonMovies: any[]): MovieModel[] {
  return jsonMovies.map((movieObj) => {
    return new MovieModel(
      Math.random(),
      movieObj.title,
      movieObj.opening_crawl,
      movieObj.release_date
    );
  });
}

export default App;
