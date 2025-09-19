import { FILTER_OPTIONS } from "@constants/constants";
import { FilterOption } from "@constants/types";

// Helper function to check if a source supports a specific filter
export const supportsFilter = (sourceInstance: any, filterId: string): boolean => {
  switch (filterId) {
    case 'updated':
      return typeof sourceInstance.getUpdatedNovels === 'function';
    case 'newest':
      return typeof sourceInstance.getNewestNovels === 'function';
    case 'completed':
      return typeof sourceInstance.getCompletedNovels === 'function';
    case 'rating':
      return typeof sourceInstance.getHighestRatedNovels === 'function';
    case '100chapters':
    case '1000chapters':
      return typeof sourceInstance.getNovelsWithChapters === 'function';
    case 'oldest':
      return typeof sourceInstance.getOldestNovels === 'function';
    default:
      return false;
  }
};

// Helper function to get supported filters for a source
export const getSupportedFilters = (sourceInstance: any): FilterOption[] => {
  return FILTER_OPTIONS.filter(option => supportsFilter(sourceInstance, option.id));
};
