export type Novel = {
    id: string;
    title: string;
    image: string;
    tags: string;
};

export type Source = {
    id: string;
    name: string;
    icon: string;
    isRaw: boolean;
    enabled: boolean;
    language: string;
    mainCategory: string;
    last_updated: string;
};