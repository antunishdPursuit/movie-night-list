import { Link } from "react-router-dom";

function Movie({movie}) {
  return (
    <div >
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item">{movie.title}</li>
        <li className="list-group-item"><Link to={`/movies/${movie.id}`}><img src={movie.poster} alt={movie.title}></img></Link></li>
        <li className="list-group-item">{movie.rotten_tomato_score}</li>
      </ul>
    </div>
  );
}

export default Movie;
  