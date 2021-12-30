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
      const dataObj = await jsonResponse.json();
      setMovies(convertJSONMoviesToMovieModels(dataObj));
    } catch (error) {
      const er = error as Error;
      setError(er.message);
    }
    setLoading(false);
  }, []);

  async function addMovie(movie: MovieModel) {
    const response = await fetch(FIREBASE_MOVIE_API, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
  }

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
        <AddMovieForm addMovieHandler={addMovie} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

function convertJSONMoviesToMovieModels(dataObj : any): MovieModel[] {
  const jsonMovies = Object.keys(dataObj).map(key => dataObj[key])
  return jsonMovies.map((movieObj) => {
    return new MovieModel(
      movieObj.id,
      movieObj.title,
      movieObj.openingText,
      movieObj.releaseDate,
    );
  });
}

export default App;
