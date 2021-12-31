import React, { ChangeEvent, useReducer } from "react";
import MovieModel from "../models/movie";
import classes from "./AddMovieForm.module.css";
import useHttp from "../hooks/use-http";

interface AddMovieFormProps {
  addNewMovie: (movie: MovieModel) => void;
}

const FIREBASE_MOVIE_API =
  "https://react-movies-app-2966b-default-rtdb.firebaseio.com/movies.json";

const DEFAULT_FORM_STATE = {
  title: "",
  text: "",
  releaseDate: "",
};

const AddMovieForm: React.FC<AddMovieFormProps> = (props) => {
  const { sendRequest: postNewFilm } = useHttp();
  const [formState, dispatchForm] = useReducer(formReducer, DEFAULT_FORM_STATE);

  function inputOnChange(event: ChangeEvent<HTMLInputElement>) {
    dispatchForm({ type: event.target.id, value: event.target.value });
  }

  function textAreaOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatchForm({ type: event.target.id, value: event.target.value });
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    //Need some sort of input validation
    const newMovie = new MovieModel(
      Math.random(),
      formState.title,
      formState.text,
      formState.releaseDate
    );

    const requestConfig = {
      method: "POST",
      url: FIREBASE_MOVIE_API,
      body: newMovie,
      headers: {
        "Content-type": "application/json",
      },
    };

    postNewFilm(requestConfig, props.addNewMovie.bind(null, newMovie));
    dispatchForm({ type: "Default" });
  }

  return (
    <form onSubmit={submitHandler} className={classes.control}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={formState.title}
        onChange={inputOnChange}
      ></input>

      <label htmlFor="text">Opening Text</label>
      <textarea
        id="text"
        value={formState.text}
        onChange={textAreaOnChange}
      ></textarea>

      <label htmlFor="releaseDate">Release Date</label>
      <input
        id="releaseDate"
        type="text"
        value={formState.releaseDate}
        onChange={inputOnChange}
      ></input>
      <button type="submit">Add Movie</button>
    </form>
  );
};

function formReducer(prevState: any, action: any) {
  switch (action.type) {
    case "title":
      return {
        ...prevState,
        title: action.value,
      };

    case "text":
      return {
        ...prevState,
        text: action.value,
      };

    case "releaseDate":
      return {
        ...prevState,
        releaseDate: action.value,
      };

    default:
      return DEFAULT_FORM_STATE;
  }
}

export default AddMovieForm;
