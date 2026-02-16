import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('coinwiz.db');

export function initDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);
}