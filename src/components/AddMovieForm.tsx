import React, { useRef } from "react";
import MovieModel from "../models/movie";
import classes from "./AddMovieForm.module.css";

interface AddMovieFormProps {
    addMovieHandler: (movie: MovieModel) => void;
}

const AddMovieForm: React.FC<AddMovieFormProps> = (props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const openingTextInput = useRef<HTMLTextAreaElement>(null);
  const releaseDateInput = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    let title = titleInput.current!.value;
    let text = openingTextInput.current!.value;
    let releaseDate = releaseDateInput.current!.value;

    //Need some sort of input validation

    props.addMovieHandler(new MovieModel(Math.random(), title, text, releaseDate));
    titleInput.current!.value = ""
    openingTextInput.current!.value = ""
    releaseDateInput.current!.value = ""
  }

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
