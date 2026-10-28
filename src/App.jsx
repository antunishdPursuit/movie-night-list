import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { listMovies, findMovie, saveMovie, deleteMovie } from './movieStore';
import './App.css';

const emptyMovie = { title: '', director: '', genre: '', has_watched: false, rotten_tomato_score: '', release_date: '', runtime: '', poster: '' };

function Poster({ movie }) {
  const [failed, setFailed] = useState(false);
  return !movie.poster || failed ? <div className="poster-fallback" role="img" aria-label={`No poster available for ${movie.title}`}><span>{movie.title}</span></div> : <img className="poster" src={movie.poster} alt={`${movie.title} poster`} onError={() => setFailed(true)} />;
}
function MovieCard({ movie }) {
  return <article className="movie-card"><Link className="poster-link" to={`/movies/${movie.id}`} aria-label={`View details for ${movie.title}`}><Poster movie={movie} /></Link></article>;
}
function Library({ movies }) {
  return <section className="page"><div className="page-heading"><div><h1>Movies</h1><p>Browse your movie list.</p></div></div>{movies.length ? <div className="movie-grid">{movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}</div> : <div className="empty"><h2>No movies yet</h2><p>Use Add movie to start your list.</p></div>}</section>;
}
const originalHomeImage = 'https://m.media-amazon.com/images/M/MV5BNzU4NWEwNDItMzMzYy00ZDYyLWIxZjMtMDlkYWVjNjQwYzBjXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg';
function HomeSlide({ movie, decorative = false }) {
  const [failed, setFailed] = useState(false);
  const title = movie ? movie.title : 'The Movies';
  const src = movie ? movie.poster : originalHomeImage;
  return (
    <div className="home-slide-art" aria-hidden={decorative || undefined}>
      {src && !failed ? <img src={src} alt={decorative ? '' : movie ? title + ' poster' : 'Original Movie Night flyer'} onError={() => setFailed(true)} /> : <div className="poster-fallback" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : 'Poster unavailable for ' + title}>{title}</div>}
    </div>
  );
}
function Home({ movies }) {
  const [position, setPosition] = useState(0);
  const slides = [null, ...movies];
  const currentPosition = position % slides.length;
  const current = slides[currentPosition];
  const slideAt = offset => slides[(currentPosition + offset + slides.length) % slides.length];
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-inner">
        <div className="home-intro">
          <h1 id="home-title">Good movies belong here.</h1>
          <p>A collection of movies to explore, remember, and enjoy again.</p>
          <Link className="button primary" to="/movies">Browse movies</Link>
        </div>
        <div className="home-carousel" role="region" aria-label="Movie poster carousel" aria-roledescription="carousel">
          <div className="home-stage">
            {slides.length > 1 && <div className="home-neighbor home-neighbor-left"><HomeSlide key={slideAt(-1)?.id ?? 'original-left'} movie={slideAt(-1)} decorative /></div>}
            <div className="home-poster" aria-live="polite" aria-atomic="true">{current ? <Link className="home-poster-link" to={`/movies/${current.id}`} aria-label={`View details for ${current.title}`}><HomeSlide key={current.id} movie={current} /></Link> : <HomeSlide key="original" movie={null} />}</div>
            {slides.length > 1 && <div className="home-neighbor home-neighbor-right"><HomeSlide key={slideAt(1)?.id ?? 'original-right'} movie={slideAt(1)} decorative /></div>}
            <button className="carousel-control carousel-previous" aria-label="Previous poster" onClick={() => setPosition((currentPosition - 1 + slides.length) % slides.length)}>‹</button>
            <button className="carousel-control carousel-next" aria-label="Next poster" onClick={() => setPosition((currentPosition + 1) % slides.length)}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Details({ onDelete }) {
  const { index } = useParams(); const navigate = useNavigate(); const movie = findMovie(index);
  if (!movie) return <NotFound />;
  function remove() { if (window.confirm(`Delete ${movie.title} from this demo?`)) { onDelete(index); navigate('/movies'); } }
  return <section className="page"><Link className="back-link" to="/movies">Back to movies</Link><div className="detail"><div className="detail-poster"><Poster key={movie.id} movie={movie}/></div><div><h1>{movie.title}</h1><p className="status">{movie.has_watched ? 'Watched' : 'Not watched'}</p><dl><div><dt>Director</dt><dd>{movie.director || 'Not specified'}</dd></div><div><dt>Genre</dt><dd>{movie.genre || 'Not specified'}</dd></div><div><dt>Score</dt><dd>{movie.rotten_tomato_score}/100</dd></div><div><dt>Release date</dt><dd>{movie.release_date}</dd></div><div><dt>Runtime</dt><dd>{movie.runtime} minutes</dd></div></dl><div className="actions"><Link className="button primary" to={`/movies/${movie.id}/edit`}>Edit movie</Link><button className="danger" onClick={remove}>Delete movie</button></div></div></div></section>;
}
function MovieForm({ onSave, editing }) {
  const { index } = useParams(); const navigate = useNavigate(); const existing = editing ? findMovie(index) : null;
  const [movie, setMovie] = useState(() => existing ? { ...existing } : { ...emptyMovie }); const [error, setError] = useState('');
  if (editing && !existing) return <NotFound />;
  function update(event) { const { name, value, type, checked } = event.target; setMovie({ ...movie, [name]: type === 'checkbox' ? checked : value }); }
  function submit(event) { event.preventDefault(); try { const saved = onSave(movie, editing ? index : undefined); navigate(`/movies/${saved.id}`); } catch (err) { setError(err.message); } }
  return <section className="page form-page"><Link className="back-link" to={editing ? `/movies/${index}` : '/movies'}>Cancel</Link><h1>{editing ? 'Edit movie' : 'Add movie'}</h1><p>Enter the movie details below.</p><form onSubmit={submit}><div className="form-grid"><label>Title <input name="title" value={movie.title} onChange={update} required /></label><label>Director <input name="director" value={movie.director} onChange={update} /></label><label>Genre <input name="genre" value={movie.genre} onChange={update} /></label><label>Score (0–100) <input name="rotten_tomato_score" type="number" min="0" max="100" step="1" value={movie.rotten_tomato_score} onChange={update} required /></label><label>Release date <input name="release_date" type="date" value={movie.release_date} onChange={update} required /></label><label>Runtime (minutes) <input name="runtime" type="number" min="0" step="1" value={movie.runtime} onChange={update} required /></label><label className="full">Poster URL <input name="poster" type="url" value={movie.poster} onChange={update} placeholder="https://" /></label></div><label className="check"><input name="has_watched" type="checkbox" checked={movie.has_watched} onChange={update} /> Watched</label>{error && <p role="alert" className="error">{error}</p>}<button className="primary" type="submit">{editing ? 'Save changes' : 'Add movie'}</button></form></section>;
}
function NotFound() { return <section className="page"><h1>Movie not found</h1><Link to="/movies">Back to movies</Link></section>; }
function App() {
  const [movies, setMovies] = useState(listMovies);
  const save = (movie, id) => { const saved = saveMovie(movie, id); setMovies(listMovies()); return saved; };
  const remove = id => { deleteMovie(id); setMovies(listMovies()); };
  return <BrowserRouter><header className="site-header"><div className="header-inner"><Link className="brand" to="/">Movie Night</Link><nav aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/movies">Movies</NavLink></nav><Link className="button primary header-add" to="/movies/new">Add movie</Link></div></header><main><Routes><Route path="/" element={<Home movies={movies} />} /><Route path="/movies" element={<Library movies={movies} />} /><Route path="/movies/new" element={<MovieForm onSave={save} />} /><Route path="/movies/:index" element={<Details onDelete={remove} />} /><Route path="/movies/:index/edit" element={<MovieForm onSave={save} editing />} /><Route path="*" element={<NotFound />} /></Routes></main><footer>Local demo · Movie changes reset when this page is reloaded.</footer></BrowserRouter>;
}
export default App;
