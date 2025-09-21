export default function parseRelativeTime(raw: string): Date {
    const now = new Date();

    // Normalize string
    const normalized = raw.trim().toLowerCase();

    // Handle "just now"
    if (normalized === "just now") return now;

    // Match number or "a"/"an"
    const regex = /(\d+|a|an)\s*(sec|second|seconds|min|minute|minutes|hr|hour|hours|day|days|week|weeks|month|months|year|years)/i;
    const match = normalized.match(regex);

    if (!match) {
        console.warn(`[parseRelativeTime] No match for "${raw}", returning current time.`);
        return now; // fallback
    }

    let value = match[1] === "a" || match[1] === "an" ? 1 : parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    let ms = 0;
    switch (true) {
        case unit.startsWith("sec"):
            ms = value * 1000;
            break;
        case unit.startsWith("min"):
            ms = value * 60 * 1000;
            break;
        case unit.startsWith("hr") || unit.startsWith("hour"):
            ms = value * 60 * 60 * 1000;
            break;
        case unit.startsWith("day"):
            ms = value * 24 * 60 * 60 * 1000;
            break;
        case unit.startsWith("week"):
            ms = value * 7 * 24 * 60 * 60 * 1000;
            break;
        case unit.startsWith("month"):
            ms = value * 30 * 24 * 60 * 60 * 1000; 
            break;
        case unit.startsWith("year"):
            ms = value * 365 * 24 * 60 * 60 * 1000; 
            break;
        default:
            console.warn(`[parseRelativeTime] Unknown unit "${unit}", returning current time.`);
            return now;
    }

    return new Date(now.getTime() - ms);
}
