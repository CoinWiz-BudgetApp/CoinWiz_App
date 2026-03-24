import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseAsync('coinwiz.db');

export async function initDB() {
  const database = await db;

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      bankLinked INTEGER DEFAULT 0
    );
  `);
}

/* export async function clearDatabase() {
  const database = await db;

  await database.execAsync(`
    DELETE FROM users;
  `);

  console.log("Database cleared");
} */