import { novelBin } from './novelBin';

export const novelPatterns = [
  novelBin,
];

export function isNovelSite(url: string): boolean {
  return novelPatterns.some(pattern => pattern.homepageRegex.test(url));
}

export function isNovelToc(url: string): boolean {
  return novelPatterns.some(pattern => pattern.novelTocRegex.test(url));
}

export function isNovelChapter(url: string): boolean {
  return novelPatterns.some(pattern => pattern.novelChRegex.test(url));
}

export function getNovelPatternForUrl(url: string) {
  // First try exact regex matching
  let pattern = novelPatterns.find(pattern =>
    pattern.homepageRegex.test(url) ||
    pattern.novelTocRegex.test(url) ||
    pattern.novelChRegex.test(url)
  );

  // Fallback to domain check if regex doesn't match
  if (!pattern) {
    pattern = novelPatterns.find(pattern => url.includes(pattern.homepage));
  }

  return pattern;
}
