import MovieModel from "../models/movie";
import { movieActions } from "./movie-slice";

const FIREBASE_MOVIE_API =
  "https://react-movies-app-2966b-default-rtdb.firebaseio.com/movies.json";

export const getMoviesData = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(FIREBASE_MOVIE_API);

      if (!response.ok)
        throw new Error("An error occurred while retrieving data.");

      const data = await response.json();
      return data;
    };

    try {
      dispatch(movieActions.setLoading(true));
      const movieData = await fetchData();
      const movieModels = convertJSONMoviesToMovieModels(movieData);
      dispatch(movieActions.setMovies(movieModels));
    } catch (error) {
      const er = error as Error;
      dispatch(movieActions.setError(er.message));
    }
    dispatch(movieActions.setLoading(false));
  };
};

export const postMovieData = (newMovie: MovieModel) => {
  return async (dispatch: any) => {
    const sendPostRequest = async () => {
      const config = {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await fetch(FIREBASE_MOVIE_API, config);

      if (!response.ok)
        throw new Error("An error occurred while posting data.");

      await response.json();
    };

    try {
      await sendPostRequest();
      dispatch(movieActions.addMovie(newMovie));
    } catch (error) {
      const er = error as Error;
      dispatch(movieActions.setError(er.message));
    }
  };
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
