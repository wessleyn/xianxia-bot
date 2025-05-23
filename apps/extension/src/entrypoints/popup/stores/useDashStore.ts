import toast from 'react-hot-toast';
import { create } from 'zustand';
import { delay } from '../../../utils/common';

interface DashStoreState {
    isSyncing: boolean
    handleSync: () => void
}

const useDashStore = create<DashStoreState>((set) => ({
    isSyncing: false,
    handleSync: async () => {
        set({ isSyncing: true });
        try {
            await delay(2);
            // TODO: syncing logic
        } catch (error) {
            console.error('Error syncing:', error);
            set({ isSyncing: false });
            toast.error('Sync failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
        set({ isSyncing: false });
        toast.success('Sync completed successfully');
    }
}))

export default useDashStore