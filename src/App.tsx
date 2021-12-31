import React, { useState, useEffect, useCallback } from "react";

import AddMovieForm from "./components/AddMovieForm";
import MoviesList from "./components/MoviesList";
import useHttp from "./hooks/use-http";
import "./App.css";
import MovieModel from "./models/movie";

const INITIAL_MOVIES_STATE: MovieModel[] = [];
const FIREBASE_MOVIE_API =
  "https://react-movies-app-2966b-default-rtdb.firebaseio.com/movies.json";

const App = () => {
  const [movies, setMovies] = useState(INITIAL_MOVIES_STATE);
  const { loading, error, sendRequest: fetchMovies } = useHttp();
  const requestConfig = {
    url: FIREBASE_MOVIE_API,
  };

  const convertAndSetMovies = (jsonResponse: any) => {
    setMovies(convertJSONMoviesToMovieModels(jsonResponse));
  };

  const getMovies = useCallback(async () => {
    fetchMovies(requestConfig, convertAndSetMovies);
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

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
        <AddMovieForm />
      </section>
      <section>
        <button onClick={getMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

function convertJSONMoviesToMovieModels(dataObj: any): MovieModel[] {
  const jsonMovies = Object.keys(dataObj).map((key) => dataObj[key]);
  return jsonMovies.map((movieObj) => {
    return new MovieModel(
      movieObj.id,
      movieObj.title,
      movieObj.openingText,
      movieObj.releaseDate
    );
  });
}

export default App;
