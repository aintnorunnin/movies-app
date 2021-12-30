import MovieModel from "../models/movie";

const FIREBASE_MOVIE_API =
  "https://react-movies-app-2966b-default-rtdb.firebaseio.com/movies.json";

class MovieService {
  async getMovies(
    setLoading: (boolean: boolean) => void,
    setMovies: (movies: MovieModel[]) => void,
    setError: (text: string) => void
  ) {
    setLoading(true);
    try {
      const jsonResponse = await fetch(FIREBASE_MOVIE_API);
      if (!jsonResponse.ok)
        throw new Error("An error occurred while retrieving data.");
      const dataObj = await jsonResponse.json();
      setMovies(this.convertJSONMoviesToMovieModels(dataObj));
    } catch (error) {
      const er = error as Error;
      setError(er.message);
    }
    setLoading(false);
  }

  async addMovie(movie: MovieModel) {
    const response = await fetch(FIREBASE_MOVIE_API, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
  }

  convertJSONMoviesToMovieModels(dataObj: any): MovieModel[] {
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
}

export default MovieService;
