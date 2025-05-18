import React, { useState } from 'react';
import EmptyState from './components/EmptyState';
import FilterBar from './components/FilterBar';
import NovelCard from './components/NovelCard';
import StorageUsage from './components/StorageUsage';
import { NovelData } from './types';

const Downloads: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'size'>('all');
    const [novels, setNovels] = useState<NovelData[]>([
        {
            id: 1,
            title: "Against the Gods",
            author: "Mars Gravity",
            coverUrl: "https://via.placeholder.com/60x80/6366F1/FFFFFF?text=ATG",
            downloadedChapters: 530,
            totalSize: "24.5 MB",
            isExpanded: false,
            downloadOrder: 2 // More recently downloaded (higher number means more recent)
        },
        {
            id: 2,
            title: "Martial World",
            author: "Cocooned Cow",
            coverUrl: "https://via.placeholder.com/60x80/8B5CF6/FFFFFF?text=MW",
            downloadedChapters: 214,
            totalSize: "9.8 MB",
            isExpanded: false,
            downloadOrder: 1 // Less recently downloaded
        }
    ]);

    const totalStorageUsed = novels.reduce((acc, novel) => {
        return acc + parseFloat(novel.totalSize);
    }, 0);

    const toggleExpand = (id: number) => {
        setNovels(novels.map(novel =>
            novel.id === id ? { ...novel, isExpanded: !novel.isExpanded } : novel
        ));
    };

    const deleteDownload = (id: number) => {
        setNovels(novels.filter(novel => novel.id !== id));
    };

    const filteredNovels = () => {
        switch (activeFilter) {
            case 'recent':
                return [...novels].sort((a, b) =>
                    b.downloadOrder - a.downloadOrder
                );
            case 'size':
                return [...novels].sort((a, b) =>
                    parseFloat(b.totalSize) - parseFloat(a.totalSize)
                );
            default:
                return novels;
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Downloaded Novels</h2>
                <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            </div>

            <div className="flex-1 overflow-auto pr-1 custom-scrollbar">
                {novels.length > 0 ? (
                    <div className="space-y-3">
                        {filteredNovels().map((novel) => (
                            <NovelCard
                                key={novel.id}
                                novel={novel}
                                toggleExpand={toggleExpand}
                                deleteDownload={deleteDownload}
                            />
                        ))}

                        {novels.length > 0 && <StorageUsage totalStorageUsed={totalStorageUsed} />}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
};

export default Downloads;
