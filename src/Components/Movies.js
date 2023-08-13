
import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";

const API = process.env.REACT_APP_API_URL;
function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/movies`)
      .then((response) => {
          setMovies(response.data)})
      .catch((e) => {
        console.error("catch", e)
      });
  }, []);
  
  return (
    <div className="container align-items-center">
    <div className="row justify-content-center">
        {movies.map(movie => {
          return <Movie key={movie.id} movie={movie} />;
        })}
    </div>
  </div>
  );
}

export default Movies;
