import { SQLiteDatabase } from "expo-sqlite";
import seedSources from "./seedSources";

export default async function initializeDatabase(db: SQLiteDatabase) {

    try {
        // Create and initialize Sources table if it doesn't exist
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS sources (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            icon TEXT NOT NULL,
            isRaw INTEGER DEFAULT 0,
            enabled INTEGER DEFAULT 0,
            language TEXT DEFAULT 'en',
            mainCategory TEXT DEFAULT 'cultivation',
            genres TEXT,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
        await seedSources(db)
    }
    catch (error) {
        console.error("init failed", error)
        throw error
    }

}