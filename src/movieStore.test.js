import { test, expect, vi } from 'vitest';
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

test('a fresh app load restores the sample list', async () => {
  const before = listMovies().length;
  saveMovie({ title: 'Temporary', director: '', genre: '', has_watched: false, rotten_tomato_score: 50, release_date: '2024-01-01', runtime: 90, poster: '' });
  expect(listMovies()).toHaveLength(before + 1);
  vi.resetModules();
  const fresh = await import('./movieStore');
  expect(fresh.listMovies()).toHaveLength(before);
});
