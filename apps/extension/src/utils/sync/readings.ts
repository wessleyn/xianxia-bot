import toast from 'react-hot-toast';
import { localReadings } from '../../constants/storage';
import supabase from '../supabase';

/**
 * Syncs local reading history with the server
 * @param {Object} params - The parameters for the sync operation
 * @param {string} params.userId - The ID of the user
 * @returns {Promise<boolean>} Success status of the sync operation
 */
export async function syncReadings({ userId }: { userId: string }) {
    console.debug('Starting syncReadings for userId:', userId);
    try {
        // Get local readings
        console.debug('Fetching local readings from storage');
        const readings = await localReadings.getValue();
        console.debug('Local readings fetched:', readings?.length || 0, 'items');

        if (!readings || readings.length === 0) {
            toast.success('No readings to sync');
            console.info('No readings to sync');
            return true;
        }

        console.debug('Processing', readings.length, 'reading items');
        for (const reading of readings) {
            console.debug('Processing reading:', reading.novelName, 'from source:', reading.readingSourceUrl);
            if (!reading.lastReadingAt) {
                console.debug('Skipping reading with no lastReadingAt:', reading.novelName);
                continue;
            }

            // Check for existing novel
            console.debug('Checking if novel exists:', reading.novelName);
            let novelId: string;
            const { data: existingNovel, error: novelError } = await supabase
                .from('Novel')
                .select('id')
                .ilike('title', `%${reading.novelName}%`)
                .maybeSingle();

            if (novelError) {
                console.error('Error checking existing novel:', novelError);
                continue;
            }

            // If novel doesn't exist, create it
            if (!existingNovel) {
                console.debug('Novel not found, creating new novel:', reading.novelName);
                const now = new Date().toISOString();
                const { data: newNovel, error: createNovelError } = await supabase
                    .from('Novel')
                    .insert({
                        id: crypto.randomUUID(),
                        title: reading.novelName,
                        // TODO: scrap this from content script
                        coverImage: reading.coverImage,
                        author: reading.novelAuthor ?? 'Unknown',
                        description: '',
                        publishedAt: now,
                        createdAt: now,
                        updatedAt: now,
                        genre: reading.novelGenres
                    })
                    .select('id')
                    .single();

                if (createNovelError || !newNovel) {
                    console.error('Error creating novel:', createNovelError);
                    continue;
                }

                novelId = newNovel.id;
                console.debug('New novel created with ID:', novelId);
            } else {
                novelId = existingNovel.id;
                console.debug('Found existing novel with ID:', novelId);
            }

            // Check if reading source exists
            console.debug('Checking if reading source exists:', reading.readingSourceUrl);
            let sourceId: string;
            const { data: existingSource, error: sourceError } = await supabase
                .from('NovelSource')
                .select('id')
                .eq('url', reading.readingSourceUrl)
                .single();

            if (sourceError) {
                console.error('Error checking source:', sourceError);
                continue;
            }

            if (!existingSource) {
                console.debug('Source not found, creating new source for:', reading.readingSourceUrl);
                try {
                    // Create source if it doesn't exist
                    const sourceName = new URL(reading.readingSourceUrl).hostname;
                    console.debug('Extracted source name:', sourceName);
                    const { data: newSource, error: createSourceError } = await supabase
                        .from('NovelSource')
                        .insert({
                            id: crypto.randomUUID(),
                            name: sourceName,
                            url: reading.readingSourceUrl,
                            stars: 0
                        })
                        .select('id')
                        .single();

                    if (createSourceError || !newSource) {
                        console.error('Error creating source:', createSourceError);
                        continue;
                    }

                    sourceId = newSource.id;
                    console.debug('New source created with ID:', sourceId);
                } catch (urlError) {
                    console.error('Invalid URL format:', urlError);
                    continue;
                }
            } else {
                sourceId = existingSource.id;
                console.debug('Found existing source with ID:', sourceId);
            }

            // Check if source visit exists for this user and source
            console.debug('Checking if source visit exists for userId:', userId, 'sourceId:', sourceId);
            let sourceVisitId: string;
            const { data: existingSourceVisit, error: sourceVisitError } = await supabase
                .from('SourceVisit')
                .select('id, count')
                .eq('userId', userId)
                .eq('sourceId', sourceId)
                .maybeSingle();

            if (sourceVisitError) {
                console.error('Error checking source visit:', sourceVisitError);
                continue;
            }

            if (!existingSourceVisit) {
                console.debug('Source visit not found, creating new one');
                const { data: newSourceVisit, error: createSourceVisitError } = await supabase
                    .from('SourceVisit')
                    .insert({
                        id: crypto.randomUUID(),
                        userId: userId,
                        sourceId: sourceId,
                        count: 1,
                        startedAt: new Date().toISOString(),
                        lastVisited: new Date().toISOString()
                    })
                    .select('id')
                    .single();

                if (createSourceVisitError || !newSourceVisit) {
                    console.error('Error creating source visit:', createSourceVisitError);
                    continue;
                }

                sourceVisitId = newSourceVisit.id;
                console.debug('New source visit created with ID:', sourceVisitId);
            } else {
                sourceVisitId = existingSourceVisit.id;
                // TODO: Maybe capture source reading visits and source browsing visits here?? 
                // Increment the visit count
                const { error: updateCountError } = await supabase
                    .from('SourceVisit')
                    .update({
                        count: (existingSourceVisit.count || 0) + 1,
                        lastVisited: new Date().toISOString()
                    })
                    .eq('id', sourceVisitId);

                if (updateCountError) {
                    console.error('Error updating source visit count:', updateCountError);
                }
                console.debug('Using existing source visit with ID:', sourceVisitId);
            }

            // Handle chapters data if available
            let currentChapterId: string | null = null;
            let previousChapterId: string | null = null;

            if (reading.readChapters && reading.readChapters.length > 0) {
                console.debug('Processing', reading.readChapters.length, 'chapters for novel:', reading.novelName);
                try {
                    const now = new Date().toISOString();

                    // Process chapters sequentially to avoid race conditions
                    const validChapters = [];
                    for (const chapter of reading.readChapters) {
                        console.debug('Processing chapter:', chapter.chapterNumber, chapter.chapterName || '');
                        // First, check if the chapter already exists
                        const { data: existingChapter, error: checkError } = await supabase
                            .from('NovelChapter')
                            .select('id')
                            .eq('novelId', novelId)
                            .eq('number', chapter.chapterNumber)
                            .maybeSingle();

                        if (checkError) {
                            console.error('Error checking existing chapter:', checkError);
                            continue; // Skip this chapter and move to the next
                        }

                        // If it exists, use it; otherwise create it
                        if (existingChapter) {
                            console.debug('Found existing chapter with ID:', existingChapter.id);
                            validChapters.push({
                                id: existingChapter.id,
                                number: chapter.chapterNumber,
                                lastReadAt: chapter.lastReadAt
                            });
                        } else {
                            console.debug('Creating new chapter:', chapter.chapterNumber);
                            const { data: newChapter, error: chapterError } = await supabase
                                .from('NovelChapter')
                                .insert({
                                    id: crypto.randomUUID(),
                                    novelId: novelId,
                                    number: chapter.chapterNumber,
                                    title: chapter.chapterName || `Chapter ${chapter.chapterNumber}`,
                                    content: '',
                                    createdAt: now,
                                    updatedAt: now
                                })
                                .select('id')
                                .single();

                            if (chapterError || !newChapter) {
                                console.error('Error creating chapter:', chapterError);
                                continue; // Skip this chapter and move to the next
                            }

                            console.debug('New chapter created with ID:', newChapter.id);
                            validChapters.push({
                                id: newChapter.id,
                                number: chapter.chapterNumber,
                                lastReadAt: chapter.lastReadAt
                            });
                        }
                    }

                    console.debug('Successfully processed', validChapters.length, 'chapters');

                    // Sort chapters by number to find current and previous
                    if (validChapters.length > 0) {
                        const sortedChapters = validChapters.sort((a, b) => b.number - a.number);
                        currentChapterId = sortedChapters[0].id;
                        console.debug('Current chapter ID:', currentChapterId, 'Chapter number:', sortedChapters[0].number);

                        if (sortedChapters.length > 1) {
                            previousChapterId = sortedChapters[1].id;
                            console.debug('Previous chapter ID:', previousChapterId, 'Chapter number:', sortedChapters[1].number);
                        }
                    }
                } catch (chapterError) {
                    console.error('Error processing chapters:', chapterError);
                }
            } else {
                console.debug('No chapters to process for novel:', reading.novelName);
            }

            // Check if reading already exists
            console.debug('Checking if ReadNovel entry exists for userId:', userId, 'novelId:', novelId);
            const { data: existingReadNovel, error: checkReadError } = await supabase
                .from('ReadNovel')
                .select('id')
                .eq('userId', userId)
                .eq('novelId', novelId)
                .maybeSingle();

            if (checkReadError) {
                console.error('Error checking existing read novel:', checkReadError);
                continue;
            }

            const now = new Date().toISOString();
            const readNovelData = {
                id: existingReadNovel ? existingReadNovel.id : crypto.randomUUID(),
                userId: userId,
                novelId: novelId,
                readingSourceId: sourceVisitId,  // Now correctly using the sourceVisitId instead of sourceId
                readingSourceUrl: reading.fullUrl, // Include the full URL to the novel
                currentChapterId: currentChapterId,
                previousChapterId: previousChapterId,
                lastReadAt: reading.lastReadingAt,
                startedAt: reading.startedReadingOn,
                continuedAt: now
            };

            console.debug('Upserting ReadNovel entry:', existingReadNovel ? 'Updating existing' : 'Creating new', 'ID:', readNovelData.id);
            const { error: readNovelError } = await supabase
                .from('ReadNovel')
                .upsert(readNovelData, {
                    onConflict: 'userId,novelId',
                    ignoreDuplicates: false
                });

            if (readNovelError) {
                console.error('Error updating read novel:', readNovelError);
                continue;
            } else {
                console.debug('Successfully upserted ReadNovel entry for novel:', reading.novelName);
            }

            // Now sync the ReadChapter entries for tracking reading history
            if (reading.readChapters && reading.readChapters.length > 0) {
                console.debug('Syncing ReadChapter entries for', reading.readChapters.length, 'chapters');
                const readNovelId = readNovelData.id;

                for (const chapter of reading.readChapters) {
                    // Get the chapter ID from our database
                    const { data: chapterData, error: chapterError } = await supabase
                        .from('NovelChapter')
                        .select('id')
                        .eq('novelId', novelId)
                        .eq('number', chapter.chapterNumber)
                        .single();

                    if (chapterError) {
                        console.error('Error finding chapter for ReadChapter entry:', chapterError);
                        continue;
                    }

                    const chapterId = chapterData.id;

                    // Check if a ReadChapter entry already exists
                    const { data: existingReadChapter, error: checkReadChapterError } = await supabase
                        .from('ReadChapter')
                        .select('id')
                        .eq('readingId', readNovelId)
                        .eq('chapterId', chapterId)
                        .maybeSingle();

                    if (checkReadChapterError) {
                        console.error('Error checking existing ReadChapter:', checkReadChapterError);
                        continue;
                    }

                    // Prepare ReadChapter data
                    const readChapterData = {
                        id: existingReadChapter ? existingReadChapter.id : crypto.randomUUID(),
                        readingId: readNovelId,
                        chapterId: chapterId,
                        startedAt: chapter.startedAt || now,
                        lastReadAt: chapter.lastReadAt || now
                    };

                    // Upsert ReadChapter entry
                    console.debug('Upserting ReadChapter for chapter:', chapter.chapterNumber);
                    const { error: readChapterError } = await supabase
                        .from('ReadChapter')
                        .upsert(readChapterData, {
                            onConflict: 'readingId,chapterId',
                            ignoreDuplicates: false
                        });

                    if (readChapterError) {
                        console.error('Error upserting ReadChapter:', readChapterError);
                    } else {
                        console.debug('Successfully recorded ReadChapter for chapter:', chapter.chapterNumber);
                    }
                }
                console.debug('Finished syncing ReadChapter entries');
            }
        }

        console.log('Readings synced successfully');
        toast.success('Readings synced successfully');
        return true;
    } catch (error) {
        console.error('Error syncing readings:', error);
        toast.error('Failed to sync readings');
        return false;
    }
}