// A local, in-memory stand-in for the original API. Reloading restores the seed.
const initialMovies = [
  { id: 1, title: 'Underwater', director: 'William Eubank', genre: 'Horror', has_watched: true, rotten_tomato_score: 48, release_date: '2020-01-10', runtime: 95, poster: 'https://i.ebayimg.com/images/g/kfYAAOSwDF5gR0VQ/s-l1600.jpg' },
  { id: 2, title: 'World War Z', director: 'Marc Forster', genre: 'Horror', has_watched: true, rotten_tomato_score: 66, release_date: '2013-06-21', runtime: 116, poster: 'https://m.media-amazon.com/images/I/71DIMtOXspL.jpg' },
  { id: 3, title: 'Oppenheimer', director: 'Christopher Nolan', genre: 'History', has_watched: false, rotten_tomato_score: 93, release_date: '2023-07-12', runtime: 180, poster: 'https://cdn.artstation.com/p/thumbnails/001/324/070/thumb.jpg' },
  { id: 4, title: 'The Flash', director: 'Andrés Muschietti', genre: 'Superhero', has_watched: true, rotten_tomato_score: 64, release_date: '2023-06-16', runtime: 144, poster: 'https://i.ebayimg.com/images/g/L98AAOSwaeZkeLQD/s-l1600.jpg' },
  { id: 5, title: 'Rush Hour', director: 'Brett Ratner', genre: 'Comedy', has_watched: true, rotten_tomato_score: 62, release_date: '1998-09-18', runtime: 98, poster: 'https://m.media-amazon.com/images/I/51cfg5XBgQL._AC_UF894,1000_QL80_.jpg' },
];
let movies = initialMovies.map(movie => ({ ...movie }));
let nextId = 6;

export function listMovies() { return movies.map(movie => ({ ...movie })); }
export function findMovie(id) { return movies.find(movie => movie.id === Number(id)); }
export function saveMovie(movie, id) {
  const score = Number(movie.rotten_tomato_score);
  const runtime = Number(movie.runtime);
  if (!movie.title.trim() || !movie.release_date || !Number.isInteger(score) || score < 0 || score > 100 || !Number.isInteger(runtime) || runtime < 0) {
    throw new Error('Enter a title, release date, score from 0 to 100, and a non-negative runtime.');
  }
  if (id != null && !findMovie(id)) throw new Error('Movie not found.');
  const saved = { ...movie, id: id == null ? nextId++ : Number(id), rotten_tomato_score: score, runtime };
  movies = id == null ? [...movies, saved] : movies.map(item => item.id === Number(id) ? saved : item);
  return saved;
}
export function deleteMovie(id) { movies = movies.filter(movie => movie.id !== Number(id)); }
