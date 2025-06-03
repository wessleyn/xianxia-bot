'use client';

import { IconAbc, IconSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import type { Term } from './actions';

export default function DictionaryClient({ terms }: { terms: Term[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTerms = useMemo(() => {
        if (!searchQuery.trim()) return terms;

        const normalizedQuery = searchQuery.toLowerCase().trim();

        return terms.filter(term => {
            // Search in name
            if (term.name.toLowerCase().includes(normalizedQuery)) return true;

            // Search in Chinese term if exists
            if (term.chinese && term.chinese.toLowerCase().includes(normalizedQuery)) return true;

            // Search in description
            if (term.description.toLowerCase().includes(normalizedQuery)) return true;

            // Search in examples
            if (term.examples && term.examples.toLowerCase().includes(normalizedQuery)) return true;

            // Search in related terms
            if (term.related && term.related.some(rel => rel.toLowerCase().includes(normalizedQuery))) return true;

            return false;
        });
    }, [searchQuery, terms]);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center mb-8">
                    <IconAbc size={24} className="text-purple-600 mr-2" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Common Xianxia Terms</h2>
                </div>
                <div className="mb-8 w-full md:max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <IconSearch className="text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="search"
                            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-base rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-4"
                            placeholder="Search terms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {filteredTerms.length === 0 ? (
                <div className="py-10 text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">No terms found matching &ldquo;{searchQuery}&rdquo;</p>
                    <button
                        className="mt-4 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                        onClick={() => setSearchQuery('')}
                    >
                        Clear search
                    </button>
                </div>
            ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTerms.map((term) => (
                        <div key={term.id} className="py-6">
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-300 text-2xl font-bold">
                                        {term.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                                        {term.name}
                                        {term.chinese && (
                                            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                                {term.chinese}
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{term.description}</p>

                                    <div className="space-y-2">
                                        {term.examples && (
                                            <div>
                                                <span className="font-medium text-gray-900 dark:text-gray-100">Example: </span>
                                                <span className="italic text-gray-600 dark:text-gray-400">{term.examples}</span>
                                            </div>
                                        )}

                                        {term.related && (
                                            <div className="flex flex-wrap gap-2">
                                                <span className="font-medium text-gray-900 dark:text-gray-100">Related: </span>
                                                {term.related.map((rel, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer transition-colors"
                                                        onClick={() => setSearchQuery(rel)}
                                                    >
                                                        {rel}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}