export function normalizeText(text: string): string {
    return text.trim().toLowerCase().replace(/\s+/g, '');
}
