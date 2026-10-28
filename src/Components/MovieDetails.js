import { useParams,Link, useNavigate } from "react-router-dom";
import { findMovie, deleteMovie } from "../movieStore";
import "./MovieDetails.css";

function MoviesDetails() {
  const { index } = useParams();
  const navigate = useNavigate();
  const movie = findMovie(index);
  if (!movie) return <p>Movie not found. <Link to="/movies">Back to movies</Link></p>;
  const handleDelete = () => {
    if (window.confirm("Delete this movie from the demo?")) { deleteMovie(index); navigate("/movies"); }
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-auto">
        <h1>Movie Details</h1>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><span className="fw-bold"></span><img src={movie.poster} alt={movie.title}></img></li>
          <li className="list-group-item"><span className="fw-bold"></span>{movie.title}</li>
          <li className="list-group-item"><span className="fw-bold"></span>{movie.director}</li>
          <li className="list-group-item"><span className="fw-bold"></span>{movie.genre}</li>
          <li className="list-group-item"><span className="fw-bold"></span>{movie.rotten_tomato_score}</li>
          <li className="list-group-item"><span className="fw-bold"></span>{movie.release_date}</li>
          <li className="list-group-item"><span className="fw-bold"></span>{movie.runtime}</li>
        </ul>
        <div>
          {" "}
          <Link to={`/movies`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/movies/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
  
export default MoviesDetails;
  