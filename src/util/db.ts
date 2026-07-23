// db.ts
import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool with modern configuration
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your server capacity
  maxIdle: 10, // Max idle connections, standard in modern mysql2
  idleTimeout: 60000, // Idle connections timeout in milliseconds
  queueLimit: 0,
  enableKeepAlive: true, // Prevents connections from dropping unexpectedly
  keepAliveInitialDelay: 0,
});

// Export the pool directly for execution across your app
export default pool;
