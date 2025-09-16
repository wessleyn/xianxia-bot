import sources from "@constants/sources";

export default async function findRandomNovel(sourceName?: string) {
    console.log(`[findRandomNovel] Called with sourceName: ${sourceName || 'none'}`);
    
    if (sourceName) {
        console.log(`[findRandomNovel] Looking for specific source: ${sourceName}`);
        const SourceClass = sources[sourceName];
        if (!SourceClass) {
            console.error(`[findRandomNovel] Error: Invalid source name "${sourceName}"`);
            throw new Error("Invalid source name.");
        }

        console.log(`[findRandomNovel] Creating instance of source: ${sourceName}`);
        const sourceInstance = new SourceClass();

        if (typeof sourceInstance.getRandomNovel !== 'function') {
            console.error(`[findRandomNovel] Error: Source ${sourceName} does not support random novels`);
            throw new Error(`Source ${sourceName} does not support random novels.`);
        }

        console.log(`[findRandomNovel] Fetching random novel from source: ${sourceName}`);
        const result = await sourceInstance.getRandomNovel();
        console.log(`[findRandomNovel] Successfully retrieved novel from ${sourceName}`);
        return result;
    }

    console.log('[findRandomNovel] No specific source provided, selecting random source');
    
    // For random source selection
    console.log('[findRandomNovel] Filtering sources that support random novels');
    const availableSources = Object.entries(sources).filter(([name, SourceClass]) => {
        const tempInstance = new SourceClass();
        const hasRandomSupport = typeof tempInstance.getRandomNovel === 'function';
        console.log(`[findRandomNovel] Source "${name}" ${hasRandomSupport ? 'supports' : 'does not support'} random novels`);
        return hasRandomSupport;
    });

    console.log(`[findRandomNovel] Found ${availableSources.length} sources with random selection support`);

    if (availableSources.length === 0) {
        console.error('[findRandomNovel] Error: No sources with random selection available');
        throw new Error("No sources with random selection available.");
    }

    const randomIndex = Math.floor(Math.random() * availableSources.length);
    const [selectedName, RandomSourceClass] = availableSources[randomIndex];
    console.log(`[findRandomNovel] Selected random source: ${selectedName} (index ${randomIndex}/${availableSources.length-1})`);

    console.log(`[findRandomNovel] Creating instance and fetching random novel`);
    const sourceInstance = new RandomSourceClass();
    const result = await sourceInstance.getRandomNovel!();
    console.log(`[findRandomNovel] Successfully retrieved random novel`);
    return result;
}
