// Base URL of movies API
import axios from "axios";

export default axios.create({
  baseURL: "https://www.omdbapi.com/",
});
