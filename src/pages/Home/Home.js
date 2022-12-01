import React from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useDispatch } from "react-redux";
import { movieActions } from "../../features/movies/movieSlice";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./Home.module.css";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      const movieQuery = "Harry";
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=54f949d&s=${movieQuery}&type=movie`
      );

      const data = await response.json();
      dispatch(movieActions.addMovies(data.Search));
    };

    const getShows = async () => {
      const showQuery = "Friends";
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=54f949d&s=${showQuery}&type=series`
      );

      const data = await response.json();
      console.log(data);
      dispatch(movieActions.addShows(data.Search));
      setIsLoading(false);
    };
    getMovies();
    getShows();
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div className={classes.spinner}>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <MovieList />
      )}
    </div>
  );
};

export default Home;
