import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { movieActions } from "../../features/movies/movieSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  // Search functinality
  const getMovies = async (searchQuery) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=54f949d&s=${searchQuery}&type=movie`
    );

    const data = await response.json();
    dispatch(movieActions.addMovies(data.Search));
  };

  const getShows = async (searchQuery) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=54f949d&s=${searchQuery}&type=series`
    );

    const data = await response.json();
    dispatch(movieActions.addShows(data.Search));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (searchQuery === "") return;

    await getMovies(searchQuery);
    await getShows(searchQuery);

    setSearchQuery("");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">IMDb</Link>
      </div>
      <div className={classes["search-form"]}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search IMDb"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search fa-lg"></i>
          </button>
        </form>
      </div>
      <button className={classes["sign-in"]}>Sign In</button>
    </header>
  );
};

export default Header;
