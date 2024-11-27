import Database from 'better-sqlite3';
import { z } from 'zod';

const db = new Database('subscribers.db');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

const emailSchema = z.string().email();

export function addSubscriber(email: string) {
  try {
    emailSchema.parse(email);
    const stmt = db.prepare('INSERT INTO subscribers (email) VALUES (?)');
    return stmt.run(email);
  } catch (error) {
    throw new Error('Invalid email address');
  }
}