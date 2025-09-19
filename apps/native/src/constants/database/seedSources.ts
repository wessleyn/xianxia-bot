import { SQLiteDatabase } from "expo-sqlite";
import sources from "../sources";

/**
 * Seeds all available sources from the sources module into the database
 * 
 * @param db The SQLite database instance
 * @returns Promise<void>
 */
export default async function seedSources(db: SQLiteDatabase): Promise<void> {
    try {
        // First, let's check which sources are already in the database
        const existingSourcesResult = await db.getAllAsync<{ id: string }>(
            "SELECT id FROM sources"
        );

        const existingSourceIds = new Set(
            existingSourcesResult.map(source => source.id.toLowerCase())
        );

        for (const [sourceKey, SourceClass] of Object.entries(sources)) {
            try {
                const sourceInstance = new SourceClass();
                const metadata = sourceInstance.getMetadata();

                const id =  await sourceInstance.getId();
                const icon = await sourceInstance.getIcon();
                const genres = await sourceInstance.getGenres();

                // if this source already exists in the database upsert the data, this for updates
                if (existingSourceIds.has(id)) {
                    await db.runAsync(
                        `UPDATE sources SET name = ?, icon = ?, isRaw = ?, language = ?, mainCategory = ?, genres = ? WHERE id = ?`,
                        [
                            metadata.name,
                            icon,
                            metadata.isRaw ? 1 : 0,
                            metadata.language || 'en',
                            metadata.mainCategory || 'cultivation',
                            JSON.stringify(genres),
                            id,
                        ]
                    );
                } else {

                    await db.runAsync(
                        `INSERT INTO sources(id, name, icon, isRaw, language, mainCategory, genres) 
                          VALUES(?, ?, ?, ?, ?, ?, ?)`,
                        [
                            id,
                            metadata.name,
                            icon,
                            metadata.isRaw ? 1 : 0,
                            metadata.language || 'en',
                            metadata.mainCategory || 'cultivation',
                            JSON.stringify(genres),
                        ]
                    );

                    console.log(`Seeded source: ${metadata.name}`);
                }
            } catch (sourceError) {
                console.error(`Failed to seed source ${sourceKey}:`, sourceError);
            }
        }

        console.log("Completed seeding sources");
    } catch (error) {
        console.error("Error seeding sources:", error);
        throw error;
    }
}
