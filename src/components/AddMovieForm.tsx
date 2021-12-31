import React, { useRef } from "react";
import MovieModel from "../models/movie";
import classes from "./AddMovieForm.module.css";
import useHttp from "../hooks/use-http";

const FIREBASE_MOVIE_API =
  "https://react-movies-app-2966b-default-rtdb.firebaseio.com/movies.json";

const AddMovieForm: React.FC = (props) => {
  const { sendRequest: postNewFilm } = useHttp();
  const titleInput = useRef<HTMLInputElement>(null);
  const openingTextInput = useRef<HTMLTextAreaElement>(null);
  const releaseDateInput = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    //Need some sort of input validation
    let title = titleInput.current!.value;
    let text = openingTextInput.current!.value;
    let releaseDate = releaseDateInput.current!.value;

    const requestConfig = {
      method: "POST",
      url: FIREBASE_MOVIE_API,
      body: new MovieModel(Math.random(), title, text, releaseDate),
      headers: {
        "Content-type": "application/json",
      },
    };

    postNewFilm(requestConfig, (data: any) => {});
    titleInput.current!.value = "";
    openingTextInput.current!.value = "";
    releaseDateInput.current!.value = "";
  };

  return (
    <form onSubmit={submitHandler} className={classes.control}>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" ref={titleInput}></input>

      <label htmlFor="opening_text">Opening Text</label>
      <textarea id="opening_text" ref={openingTextInput}></textarea>

      <label htmlFor="release_date">Release Date</label>
      <input id="release_date" type="text" ref={releaseDateInput}></input>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
