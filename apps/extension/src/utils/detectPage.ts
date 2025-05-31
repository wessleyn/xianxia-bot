import { extractChapterInfo, extractNovelInfo, getNovelPatternForUrl, isNovelChapter, isNovelSite, isNovelToc } from "@repo/scrapper";
import { PopView } from "../ctypes";

export function detectPage(url: string) {
    const novelSiteDetected = isNovelSite(url);
    const novelChapterDetected = isNovelChapter(url);
    const novelTocDetected = isNovelToc(url);
    const pattern = getNovelPatternForUrl(url);

    let pageType: PopView = "dashboard";
    let name = ''

    if (novelSiteDetected) {
        pageType = "novelSite";
        name = pattern!.homepage
    } else if (novelTocDetected) {
        pageType = "novelToc";
        name = extractNovelInfo(url) ?? ''
    } else if (novelChapterDetected) {
        pageType = "novelCh";
        name = extractChapterInfo(url)?.chapterName ?? ''
    }

    return {
        type: pageType,
        name,
        pattern

    };
}