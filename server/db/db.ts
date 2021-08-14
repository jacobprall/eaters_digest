import pg from 'pg';
require('dotenv').config();

const Pool = pg.Pool;

export const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: 'gozatu_1'
});
