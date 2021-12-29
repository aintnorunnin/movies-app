import React, { useState } from "react";

import MovieModel from "./models/movie";
import MoviesList from "./components/MoviesList";
import "./App.css";

const INITIAL_MOVIES: MovieModel[] = [];

const STAR_WARS_API_URL = "https://swapi.dev/api/films/";

const App = () => {
  const [movies, setMovies] = useState(INITIAL_MOVIES);

  async function fetchMovies() {
    try {
      const jsonResponse = await fetch(STAR_WARS_API_URL);
      const dataObj = await jsonResponse.json();
      setMovies(convertJSONMoviesToMovieModels(dataObj.results));
    }catch(error) {
      //In production we would do something more user friendly than log error
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
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
