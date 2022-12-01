import React from "react";
import { Link } from "react-router-dom";
import classes from "./MovieCard.module.css";

const MovieCard = (props) => {
  const { movieData } = props;
  console.log(movieData);
  return (
    <div>
      <Link to={`/movie/${movieData.imdbID}`}>
        <div className={classes.content}>
          <img src={movieData.Poster} alt={movieData.Title} />
          <h4>{movieData.Year}</h4>
          <h3>{movieData.Title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
