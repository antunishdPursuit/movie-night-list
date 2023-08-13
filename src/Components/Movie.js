import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";

function Movie({ movie }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="list-group">
        <Link to={`/movies/${movie.id}`} className="list-group-item">
          <img
            src={movie.poster}
            alt={movie.title}
            className="img-fluid custom-movie-poster"
          />
        </Link>
        <div className="list-group-item">
          <h5 className="mb-1">{movie.title}</h5>
          <p className="mb-0">{movie.rotten_tomato_score}</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
