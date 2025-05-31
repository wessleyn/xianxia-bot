import { NovelPattern } from "../types";

export const novelBin: NovelPattern = {
    homepage: "novelbin.me",
    homepageRegex: /^https?:\/\/(?:www\.)?novelbin\.(me|com)\/?$/,
    novelTocRegex: /^https?:\/\/(?:www\.)?novelbin\.(me|com)\/novel-book\/[^\/]+(?:#tab-chapters-title)?$/,
    novelChRegex: /^https?:\/\/(?:www\.)?novelbin\.(me|com)\/(?:b|novel-book)\/[^\/]+\/(?:c+)?chapter-[^\/]+$/
}