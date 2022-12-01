import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { movieActions } from "../../features/movies/movieSlice";
import classes from "./MovieDetails.module.css";
import { CircularProgress } from "@mui/material";

const MovieDetails = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movies.singleMovie);

  useEffect(() => {
    const getSingleMovie = async (id) => {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=54f949d&i=${id}&Plot=full`
      );

      const singleMovieData = await response.json();

      setIsLoading(false);
      dispatch(movieActions.addSingleMovie(singleMovieData));
    };
    getSingleMovie(imdbID);

    // Cleanup function
    return () => {
      dispatch(movieActions.removeSelectedMovie());
    };
  }, [dispatch, imdbID]);

  return (
    <Fragment>
      {isLoading ? (
        <div className={classes.spinner}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className={classes["section-details"]}>
          <div className={classes["section-left"]}>
            <h2>{data.Title}</h2>
            <div className={classes["movie-ratings"]}>
              <span>
                IMDB Rating{" "}
                <i style={{ color: "#f5c518" }} className="fa fa-star"></i>:{" "}
                <strong>{data.imdbRating}</strong>
              </span>
              <span>
                IMDB Votes{" "}
                <i style={{ color: "#fff" }} className="fa fa-thumbs-up"></i>:{" "}
                <strong>{data.imdbVotes}</strong>
              </span>
              <span>
                Runtime <i style={{ color: "#fff" }} className="fa fa-film"></i>
                : <strong>{data.Runtime}</strong>
              </span>
              <span>
                Relased Year{" "}
                <i style={{ color: "#fff" }} className="fa fa-calendar"></i>:{" "}
                <strong>{data.Year}</strong>
              </span>
              <p>{data.Plot}</p>
            </div>
            <div className={classes["more-info"]}>
              <div>
                <span>Director </span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Actors </span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Genre </span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Language </span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards </span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className={classes["section-right"]}>
            <img src={data.Poster} alt={data.Title}></img>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MovieDetails;
