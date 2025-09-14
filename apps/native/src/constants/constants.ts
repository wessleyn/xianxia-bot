import { FilterOption } from "./types";

export const FILTER_OPTIONS: FilterOption[] = [
    { id: 'updated', label: 'Updated', icon: 'update' },
    { id: '100chapters', label: '100+ Chapters', icon: 'book-open-variant' },
    { id: '1000chapters', label: '1000+ Chapters', icon: 'book-open-page-variant' },
    { id: 'rating', label: 'Rating', icon: 'star' },
    { id: 'newest', label: 'Newest', icon: 'sort-calendar-descending' },
    { id: 'oldest', label: 'Oldest', icon: 'sort-calendar-ascending' }
];