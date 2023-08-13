import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <Link className="navbar-brand" to="/movies">Movies</Link>
        <span className="navbar-text">
        <Link className="navbar-link" to="/movies/new">New Movie</Link>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
  