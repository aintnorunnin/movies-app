import React from "react";
import MovieModel from "../models/movie";
import classes from "./AddMovieForm.module.css";
import useInput from "../hooks/use-input";
import { useDispatch } from "react-redux";
import { movieActions } from "../store/movie-slice";
import { postMovieData } from "../store/movie-actions";

const titleConfig = {
  validate: (value: string) => {
    if (value.trim().length === 0) {
      return false;
    } else {
      return true;
    }
  },
  error: "Title is not valid",
};

const textConfig = {
  validate: (value: string) => {
    if (value.trim().length === 0) {
      return false;
    } else {
      return true;
    }
  },
  error: "Text area is not valid",
};

const dateConfig = {
  validate: (value: string) => {
    const isDate = !isNaN(new Date(value).getDate());
    if (!isDate) {
      return false;
    } else {
      return true;
    }
  },
  error: "The date is not valid. Please format in date format YYYY-MM-DD",
};

const AddMovieForm = () => {
  const dispatch = useDispatch();
  const titleInput = useInput(titleConfig);
  const textInput = useInput(textConfig);
  const dateInput = useInput(dateConfig);
  const formIsValid =
    titleInput.state.isValid &&
    textInput.state.isValid &&
    dateInput.state.isValid;

  function addNewMovie(movie: MovieModel) {
    dispatch(movieActions.addMovie(movie));
  }

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const newMovie = new MovieModel(
      Math.random(),
      titleInput.state.value,
      textInput.state.value,
      dateInput.state.value
    );

   
    dispatch(postMovieData(newMovie));
   
    titleInput.resetInput();
    textInput.resetInput();
    dateInput.resetInput();
  }

  return (
    <React.Fragment>
      <form onSubmit={submitHandler} className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={titleInput.state.value}
          onChange={titleInput.onChange}
          onBlur={titleInput.onBlur}
        ></input>
        {titleInput.state.wasTouched && !titleInput.state.isValid && (
          <p>{titleInput.state.error}</p>
        )}
        <label htmlFor="text">Opening Text</label>
        <textarea
          id="text"
          value={textInput.state.value}
          onChange={textInput.onChange}
          onBlur={textInput.onBlur}
        ></textarea>
        {textInput.state.wasTouched && !textInput.state.isValid && (
          <p>{textInput.state.error}</p>
        )}
        <label htmlFor="releaseDate">Release Date</label>
        <input
          id="releaseDate"
          type="text"
          value={dateInput.state.value}
          onChange={dateInput.onChange}
          onBlur={dateInput.onBlur}
        ></input>
        {dateInput.state.wasTouched && !dateInput.state.isValid && (
          <p>{dateInput.state.error}</p>
        )}

        <button type="submit" disabled={!formIsValid}>
          Add Movie
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddMovieForm;
