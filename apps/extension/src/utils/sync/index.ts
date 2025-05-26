import toast from 'react-hot-toast';
import { getUserId } from '../supabase';
import { syncSources } from './sources';

export type syncType = 'all' | 'settings' | 'bookmarks' | 'history' | 'readings' | 'sources';

export default async function sync(type: syncType) {
    const userId = await getUserId();

    if (userId === null) {
        console.info('Not logged in, syncing aborted')
        toast('Not logged in, syncing aborted') // Will run if popup is open
        return false; 
    }
    
    switch (type) {
        case 'sources':
            return await syncSources({ userId });
        case 'settings':

            break;
        case 'bookmarks':

            break;
        case 'history':

            break;
        case 'readings':

            break;
        case 'all':
    }
    return true; 
}