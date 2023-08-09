import Movie from "./Movie";
import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
      axios
      .get(`${API}/movies`)
      .then((response) => {
          setMovies(response.data)})
      .catch((e) => console.error("catch", e));
  }, []);
  
  return (
    <div className="row justify-content-md-center">
      <div className="col-md-auto">
          {movies.map(movie => {
            return <Movie key={movie.id} movie={movie} />;
          })}
      </div>
    </div>
  );
}

export default Movies;
