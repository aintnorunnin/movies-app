import React from 'react';
import MovieModel from '../models/movie';

import Movie from './Movie';
import classes from './MoviesList.module.css';

interface MoveListProps {
  movies: MovieModel[];
}

const MovieList: React.FC<MoveListProps>= (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
