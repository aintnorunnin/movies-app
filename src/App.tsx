import React, { useContext } from "react";

import AddMovieForm from "./components/AddMovieForm";
import MoviesList from "./components/MoviesList";
import MoviesContext from "./context/MoviesContext";
import "./App.css";

const App = () => {
  const moviesCxt = useContext(MoviesContext);

  let content = <p>No movies were found</p>;
  if (moviesCxt.error) {
    content = <p>{moviesCxt.error}</p>;
  }

  if (moviesCxt.movies.length > 0) {
    content = <MoviesList movies={moviesCxt.movies} />;
  }

  if (moviesCxt.loading) {
    content = <p>Retrieving movies ... </p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovieForm addMovieHandler={moviesCxt.addMovie} />
      </section>
      <section>
        <button onClick={moviesCxt.callMovieAPI}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
};

export default App;
