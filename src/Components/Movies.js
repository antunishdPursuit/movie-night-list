import Movie from "./Movie";
import { listMovies } from "../movieStore";

function Movies() {
  const movies = listMovies();
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
