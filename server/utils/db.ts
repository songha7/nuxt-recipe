// ! server/utils/db.ts
import Database from 'better-sqlite3'
import path from 'node:path'

const dbPath = path.resolve(process.cwd(), 'data', 'app.db')

export const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    deadline TEXT,
    done INTEGER DEFAULT 0
    )
`)