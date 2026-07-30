import pool from './util/db';

afterAll(async () => {
  await pool.end();
});
