import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('coinwiz.db');

export function initDB() {
  db.execSync(`

    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      recovery_pin TEXT
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS budgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      category TEXT NOT NULL,
      limit_amount REAL NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}