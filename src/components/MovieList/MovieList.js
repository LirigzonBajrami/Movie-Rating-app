import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const movies = useSelector((state) => state.movies.movies);
  const shows = useSelector((state) => state.movies.shows);

  const renderMovies = movies.map((movie, index) => (
    <MovieCard key={index} movieData={movie} />
  ));

  const renderShows = shows.map((show, index) => (
    <MovieCard key={index} movieData={show} />
  ));

  return (
    <div className={classes.renderMovies}>
      <div>
        <h2>Movies</h2>
        <div className={classes.movieList}>{renderMovies}</div>
      </div>
      <div>
        <h2>Shows</h2>
        <div className={classes.showList}>{renderShows}</div>
      </div>
    </div>
  );
};

export default MovieList;
