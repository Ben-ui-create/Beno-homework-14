import mysql from 'mysql2/promise';
import 'dotenv/config';

const {
  MY_SQL_HOST,
  MY_SQL_PORT,
  MY_SQL_USER,
  MY_SQL_PASSWORD,
  MY_SQL_DATABASE
} = process.env;

const pool = mysql.createPool({
  host: MY_SQL_HOST,
  port: Number(MY_SQL_PORT),
  user: MY_SQL_USER,
  password: MY_SQL_PASSWORD || '',
  database: MY_SQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

try {
  const conn = await pool.getConnection();
  console.log('DB connection successful');
  conn.release();
} catch (err) {
  console.error('DB connection failed:', err);
}

export default pool;