import { novelBin } from './patterns/novelBin';
import { ChapterInfo } from './types';

export const novelPatterns = [novelBin];

// Generic checker by regex type
function matchesAnyPattern(url: string, key: 'homepageRegex' | 'novelTocRegex' | 'novelChRegex'): boolean {
    return novelPatterns.some(pattern => pattern[key].test(url));
}

export const isNovelSite = (url: string): boolean => matchesAnyPattern(url, 'homepageRegex');
export const isNovelToc = (url: string): boolean => matchesAnyPattern(url, 'novelTocRegex');
export const isNovelChapter = (url: string): boolean => matchesAnyPattern(url, 'novelChRegex');

// Get matching pattern for URL
export function getNovelPatternForUrl(url: string) {
    return (
        novelPatterns.find(p =>
            p.homepageRegex.test(url) ||
            p.novelTocRegex.test(url) ||
            p.novelChRegex.test(url)
        ) ?? novelPatterns.find(p => url.includes(p.homepage))
    );
}

// Extract novel slug or formatted title based on `format` flag
export function extractNovelInfo(url: string) {
    const pattern = getNovelPatternForUrl(url);
    if (!pattern?.extractNovelSlug) throw Error('No pattern matched for url: ' + url)

    const slug = pattern.extractNovelSlug(url);
    if (!slug) throw Error('No slug extracted url: ' + url)

    return {
        slug: slug,
        title: slugToTitle(slug),
        source: pattern.homepage,
        sourceUrl: url // Store the full URL to the novel
    };
}

// Extract chapter information including slug, chapter number and name
export function extractChapterInfo(url: string, format = true): ChapterInfo | null {
    const pattern = getNovelPatternForUrl(url);
    if (!pattern?.extractChapSlug) return null;

    const slug = pattern.extractChapSlug(url);
    if (!slug) return null;

    // Extract chapter number and name from the URL
    const chapterMatch = url.match(/chapter-(\d+(?:\.\d+)?)-?(.*?)$/);

    const result: ChapterInfo = {
        slug,
        ...(format && { formattedTitle: slugToTitle(slug) })
    };

    if (chapterMatch) {
        result.chapterNumber = parseFloat(chapterMatch[1]);
        if (chapterMatch[2]) {
            const chapterName = chapterMatch[2].replace(/-/g, ' ').trim();
            if (chapterName) {
                result.chapterName = format ? slugToTitle(chapterName) : chapterName;
            }
        }
    }

    return result;
}

// Turn "some-novel-name" into "Some Novel Name"
export function slugToTitle(slug: string): string {
    return slug
        .replace(/[-_]+/g, ' ')
        .split(' ')
        .map(word => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : '')
        .join(' ');
}
