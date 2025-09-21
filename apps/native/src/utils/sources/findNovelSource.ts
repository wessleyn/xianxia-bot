import sources from "@constants/sources";

export function findNovelSource(link: string) {
    let clas;
    const linkUrl = new URL(link);
    for (const [_, SourceClass] of Object.entries(sources)) {
        const instance = new SourceClass();
        // Check supportedHostnames if present, else fallback to baseUrl
        const hostnames: string[] = instance.supportedHostnames || [new URL(instance.getMetadata().baseUrl).hostname];
        if (hostnames.some((h: string) => linkUrl.hostname.includes(h))) {
            clas = SourceClass;
            break;
        }
    }
    if (clas === undefined) {
        throw "Source Not Supported";
    }
    return clas;
}