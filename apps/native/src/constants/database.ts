import { SQLiteDatabase } from "expo-sqlite";

export default async function initializeDatabase(db: SQLiteDatabase) {

    try {
        // Create and initialize Sources table if it doesn't exist
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        DROP TABLE IF EXISTS sources;
        CREATE TABLE IF NOT EXISTS sources (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            icon TEXT NOT NULL,
            isRaw INTEGER DEFAULT 0,
            enabled INTEGER DEFAULT 0,
            language TEXT DEFAULT 'en',
            mainCategory TEXT DEFAULT 'cultivation',
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        INSERT INTO sources(id, name, icon, enabled) VALUES('novelbin', 'NovelBin', 'https://b/nb.png', 1);
        INSERT INTO sources(id, name, icon, mainCategory) VALUES('royalroad', 'Royal Road', 'https://ad/rr.png', 'litRPG');
        INSERT INTO sources(id, name, icon) VALUES('wuxiaworld', 'WuxiaWorld', 'https://ad/wx.png');

    `);

    }
    catch (error) {
        console.error("init failed", error)
        throw error
    }

}