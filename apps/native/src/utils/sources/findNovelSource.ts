import sources from "@constants/sources";

export function findNovelSource(link: string) {
    let clas
    const linkUrl = new URL(link)
    for (const [_, SourceClass] of Object.entries(sources)) {
        const instance = new SourceClass
        const sourceUrl = new URL(instance.getMetadata().baseUrl)
        if (sourceUrl.hostname.includes(linkUrl.hostname)) clas = SourceClass
    }
    if (clas === undefined) {
        throw "Source Not Supported"
    }
    return clas
}