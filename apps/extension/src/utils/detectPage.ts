import { extractChapterInfo, extractNovelInfo, getNovelPatternForUrl, isNovelChapter, isNovelSite, isNovelToc } from "@repo/scrapper";
import { PopView } from "../ctypes";

export function detectPage(url: string) {
    const pattern = getNovelPatternForUrl(url);

    let pageType: PopView = "dashboard";
    let name = ''

    if (isNovelSite(url)) {
        pageType = "novelSite";
        name = pattern!.homepage
    } else if (isNovelToc(url)) {
        pageType = "novelToc";
        name = extractNovelInfo(url).title ?? ''
    } else if (isNovelChapter(url)) {
        pageType = "novelCh";
        name = extractChapterInfo(url)?.chapterName ?? ''
    }

    return {
        type: pageType,
        name,
        pattern

    };
}