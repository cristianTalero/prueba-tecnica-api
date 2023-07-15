import mysql2 from "mysql2";

// Create database config
export let db: mysql2.Connection;

// Start database connection
export function connect() {
  // Only one connection
  if (db) return;

  db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }

    console.log("Conexión a DB MYSQL exitosa");
  });
}
