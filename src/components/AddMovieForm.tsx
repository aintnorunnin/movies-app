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
  isValid: false,
  wasTouched: false,
  error: "",
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

  function titleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    let errorMessage = "";
    let isValid = true;
    if (formState.title.trim().length === 0) {
      errorMessage = "Title is not valid";
      isValid = false;
    }
    dispatchForm({ type: "validate", error: errorMessage, isValid: isValid });
  }

  function dateOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    //TODO: Fix date validation 
    const isDate = !isNaN(new Date(formState.releaseDate).getDate());
    let errorMessage = "";
    let isValid = true;
    if (!isDate) {
      errorMessage =
        "The date is not valid. Please format in date format YYYY-MM-DD";
      isValid = false;
    }
    dispatchForm({ type: "validate", error: errorMessage, isValid: isValid });
  }

  function textOnBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    let errorMessage = "";
    let isValid = true;
    if (formState.text.trim().length === 0) {
      errorMessage = "Text area is not valid";
      isValid = false;
    }
    dispatchForm({ type: "validate", error: errorMessage, isValid: isValid });
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

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
    <React.Fragment>
      <form onSubmit={submitHandler} className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={formState.title}
          onChange={inputOnChange}
          onBlur={titleOnBlur}
        ></input>

        <label htmlFor="text">Opening Text</label>
        <textarea
          id="text"
          value={formState.text}
          onChange={textAreaOnChange}
          onBlur={textOnBlur}
        ></textarea>

        <label htmlFor="releaseDate">Release Date</label>
        <input
          id="releaseDate"
          type="text"
          value={formState.releaseDate}
          onChange={inputOnChange}
          onBlur={dateOnBlur}
        ></input>
        <button type="submit" disabled={!formState.isValid}>Add Movie</button>
      </form>
      {formState.wasTouched && !formState.isValid && <p>{formState.error}</p>}
    </React.Fragment>
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

    case "validate":
      return {
        ...prevState,
        isValid: action.isValid,
        wasTouched: true,
        error: action.error,
      };

    default:
      return DEFAULT_FORM_STATE;
  }
}

export default AddMovieForm;
