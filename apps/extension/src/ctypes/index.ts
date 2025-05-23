export interface NovelPattern {
    homepage: string;
    homepageRegex: RegExp;
    novelTocRegex: RegExp;
    novelChRegex: RegExp;
}

export type PopView = 'dashboard' | 'novelSite' | 'novelToc' | 'novelCh';
