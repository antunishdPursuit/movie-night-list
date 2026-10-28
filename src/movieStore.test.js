import { test, expect } from 'vitest';
import { listMovies, findMovie, saveMovie, deleteMovie } from './movieStore';

test('local movie lifecycle preserves fields and rejects invalid scores', () => {
  const initialCount = listMovies().length;
  const input = { title: 'A new film', director: 'A director', genre: 'Drama', has_watched: false, rotten_tomato_score: 80, release_date: '2020-01-01', runtime: 90, poster: '' };
  const created = saveMovie(input);
  expect(listMovies()).toHaveLength(initialCount + 1);
  expect(findMovie(created.id)).toMatchObject(input);
  expect(() => saveMovie({ ...input, rotten_tomato_score: 101 }, created.id)).toThrow();
  saveMovie({ ...input, has_watched: true }, created.id);
  expect(findMovie(created.id).has_watched).toBe(true);
  deleteMovie(created.id);
  expect(findMovie(created.id)).toBeUndefined();
});
