import { localSources } from '../../constants/storage';
import supabase from '../supabase';

/**
 * Syncs local webnovels sites with the server
 * @returns {Promise<boolean>} Success status of the sync operation
 */
export async function syncSources({ userId }: { userId: string }) {
    try {
        // Get local sources
        const sources = await localSources.getValue();
        if (!sources || sources.length === 0) {
            return true; // Nothing to sync
        }

        for (const source of sources) {
            const { data: existingSource, error: sourceError } = await supabase
                .from('NovelSource')
                .select('id')
                .eq('url', source.url)
                .maybeSingle();

            if (sourceError) {
                console.error('Error checking source:', sourceError);
                continue;
            }

            let sourceId: string;

            if (!existingSource) {
                const { data: newSource, error: createError } = await supabase
                    .from('NovelSource')
                    .insert({
                        name: source.name,
                        url: source.url,
                        stars: 0 
                    })
                    .select('id')
                    .single();

                if (createError || !newSource) {
                    console.error('Error creating source:', createError);
                    continue;
                }

                sourceId = newSource.id;
            } else {
                sourceId = existingSource.id;
            }

            // Update the SourceVisit metrics
            const { error: visitError } = await supabase
                .from('SourceVisit')
                .upsert({
                    userId: userId,
                    sourceId: sourceId,
                    count: source.visits,
                    lastVisted: source.lastVisited
                }, {
                    onConflict: 'userId,sourceId',
                    ignoreDuplicates: false
                });

            if (visitError) {
                console.error('Error updating visit count:', visitError);
            }
        }

        return true;
    } catch (error) {
        console.error('Error syncing sources:', error);
        return false;
    }
}