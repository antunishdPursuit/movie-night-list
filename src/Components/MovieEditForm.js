import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function MoviesEditForm() {
  let { index } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    has_watched: false,
    rotten_tomato_score: 0,
    release_date: "",
    runtime: 0,
    poster: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/movies/${index}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((e) => {
        console.error(e)
      });
  }, [index]);

  const handleTextChange = (event) => {
    setMovie({ ...movie, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setMovie({ ...movie, has_watched: !movie.has_watched });
  }

  const updateMovie = () => {
    axios
      .put(`${API}/movies/${index}`, movie)
      .then((response) => {
        setMovie(response.data);
        navigate(`/movies/${index}`);
      })
      .catch((c) => {
        console.warn("catch", c)
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMovie();
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-md-auto">
        <h1>Edit Movie Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
            id="title" 
            type="text" 
            value={movie.title}
            onChange={handleTextChange}
            className="form-control" 
            placeholder="title"
            required
            />
            <label htmlFor="title">Title:</label>
          </div>
            <br></br>
          <div className="form-floating">
            <input
            id="director" 
            type="text" 
            value={movie.director}
            onChange={handleTextChange}
            className="form-control" 
            placeholder="director:"
            required
            />
            <label htmlFor="director">Director:</label>
          </div>
            <br></br>
          <div className="form-floating">
            <input
            id="genre" 
            type="text" 
            value={movie.genre}
            onChange={handleTextChange}
            className="form-control" 
            placeholder="genre"
            required
            />
            <label htmlFor="genre">genre:</label>
          </div>
            <br></br>
          <div className="form-check form-switch">
            <input 
            id="has_watched"
            type="checkbox" 
            value={movie.has_watched}
            onChange={handleCheckboxChange}
            className="form-check-input" 
            />
            <label className="form-check-label" htmlFor="has_watched">Is it Your favorite?</label>
          </div>
            <br></br>
          <div className="form-floating">
            <input
            id="rotten_tomato_score" 
            type="number" 
            value={movie.rotten_tomato_score}
            onChange={handleTextChange}
            className="form-control" 
            placeholder="rotten_tomato_score:"
            required
            />
            <label htmlFor="rotten_tomato_score">rotten_tomato_score:</label>
          </div>
            <br></br>
          <div className="form-floating">
            <input
            id="release_date" 
            type="date" 
            value={movie.release_date}
            onChange={handleTextChange}
            className="form-control" 
            placeholder="release_date:"
            required
            />
            <label htmlFor="release_date">release_date:</label>
          </div>
            <br></br>
          <div className="form-floating">
            <input
            id="runtime" 
            type="number" 
            value={movie.runtime}
            onChange={handleTextChange}
            className="form-control" 
            placeholder="runtime:"
            required
            />
            <label htmlFor="runtime">runtime:</label>
          </div>
            <br></br>
          <div className="form-floating">
            <input
            id="poster" 
            type="text" 
            value={movie.poster}
            onChange={handleTextChange}
            className="form-control" 
            placeholder="poster:"
            required
            />
            <label htmlFor="poster">poster:</label>
          </div>
            <br></br>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
          </div>
            <br></br>
          <input type="submit" />
        </form>
          <Link to={`/transactions/${index}`}>
            <button>Nevermind!</button>
          </Link>
      </div>
    </div>
  );
}

export default MoviesEditForm;
  