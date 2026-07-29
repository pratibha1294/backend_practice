import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function resetDatabase(): Promise<void> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  try {
    await connection.query(`
      DROP TABLE IF EXISTS contacts;
      CREATE TABLE contacts (
        contact_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        primary_number VARCHAR(50) NOT NULL
      );
    `);
  } finally {
    await connection.end();
  }
}
