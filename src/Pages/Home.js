import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";



const API = process.env.REACT_APP_API_URL;
function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/movies`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((e) => {
        console.error("catch", e);
      });
  }, []);

  return (
    <div className="container-fluid movie-app">
      <h2>Welcome</h2>
      <h3>To the greatest Movies app!</h3>
      
      
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://m.media-amazon.com/images/M/MV5BNzU4NWEwNDItMzMzYy00ZDYyLWIxZjMtMDlkYWVjNjQwYzBjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg" alt="First slide" />
    </div>

    {movies.map((movie, index) => (
      <div className="carousel-item" key={index}>
        <img className="d-block w-100" src={movie.poster} alt={`Slide ${index}`} />
      </div>
    ))}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

    </div>
  );
}

export default Home;
