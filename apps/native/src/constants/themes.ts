export type ThemeColors = {
    secondaryBgColor: string;
    primaryBgColor: string;
    textColor: string;
    mutedColor: string;
    borderColor: string;
    pillSelectedBg: string;
    pillBg: string;
    activityColor: string;
    badgeBg: string;
    badgeText: string;
    emptyIconColor: string;
    iconColor: string;
};

export function createTheme(isDark: boolean): ThemeColors {
    return {
        secondaryBgColor: isDark ? '#0f172a' : '#ffffff', // slate-900 / white
        primaryBgColor: isDark ? '#1e293b' : '#fff', 
        textColor: isDark ? '#e5e7eb' : '#111827', // gray-200 / gray-900
        mutedColor: isDark ? '#9ca3af' : '#6b7280', // gray-400 / gray-500
        borderColor: isDark ? '#374151' : '#d1d5db', // gray-700 / gray-300
        pillSelectedBg: isDark ? '#374151' : '#d1d5db', // selected pill bg
        pillBg: 'transparent',
        activityColor: isDark ? '#a78bfa' : '#6b7280', // purple-ish for dark, default for light
        badgeBg: isDark ? '#06b6d4' : '#3b82f6', // teal for dark, blue for light
        badgeText: isDark ? '#000000' : '#ffffff',
        emptyIconColor: isDark ? '#475569' : '#d1d5db',
        iconColor: isDark ? "#9ca3af" : "#4b5563",
    };
}