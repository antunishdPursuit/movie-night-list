import { useState, useEffect } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

function MoviesDetails() {
  const API = process.env.REACT_APP_API_URL;
  const [movie, setMovies] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/movies/${index}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [index, navigate, API]);

  const handleDelete = () => {
    axios
      .delete(`${API}/movies/${index}`)
      .then(() => {
        navigate(`/movies`);
      })
      .catch((e) => {
        console.error(e)
      });
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
  