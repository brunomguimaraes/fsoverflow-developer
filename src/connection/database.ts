import pg from 'pg';
import '../setup';

const { Pool } = pg;

let connData = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
};

const connection = new Pool(connData);

export default connection;
