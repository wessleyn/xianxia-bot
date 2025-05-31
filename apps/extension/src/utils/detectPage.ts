import { PopView } from "../ctypes";
import { getNovelPatternForUrl, isNovelChapter, isNovelSite, isNovelToc } from "@repo/scrapper";

export function detectPage(url: string) {
    const novelSiteDetected = isNovelSite(url);
    const novelChapterDetected = isNovelChapter(url);
    const novelTocDetected = isNovelToc(url);
    const matchedPattern = getNovelPatternForUrl(url);

    let pageType: PopView = "dashboard";

    if (novelSiteDetected) {
        pageType = "novelSite";
    } else if (novelTocDetected) {
        pageType = "novelToc";
    } else if (novelChapterDetected) {
        pageType = "novelCh";
    }

    return {
        type: pageType,
        name: matchedPattern?.homepage || "",
    };
}