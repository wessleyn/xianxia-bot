import { PopView } from "../ctypes";
import { getNovelPatternForUrl, isNovelChapter, isNovelSite, isNovelToc } from "../novelPatterns";

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

    // TODO: return or store metadata about the page: name, visits and so on
    return {
        type: pageType,
        name: matchedPattern?.homepage || "",
    };
}