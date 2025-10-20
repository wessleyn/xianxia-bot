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
        secondaryBgColor: isDark ? '#0f172a' : '#ffffff', // dark: slate-900 - light: white 
    
        primaryBgColor: isDark ? '#1e293b' : '#ffffff', // dark: slate-800 - light: white 
    
        textColor: isDark ? '#e5e7eb' : '#111827', // dark: gray-200 - light: gray-900 
    
        mutedColor: isDark ? '#9ca3af' : '#6b7280', // dark: gray-400 - light: gray-500 
    
        borderColor: isDark ? '#374151' : '#d1d5db', // dark: gray-700 - light: gray-300 
    
        pillSelectedBg: isDark ? '#374151' : '#d1d5db', // selected pill bg — dark: gray-700, light: gray-300
        pillBg: 'transparent', // transparent
        activityColor: isDark ? '#a78bfa' : '#6b7280', // dark: violet-300 - light: gray-500 
    
        badgeBg: isDark ? '#c084fc' : '#a855f7', // dark: purple-400 - light: purple-500 
    
        badgeText: isDark ? '#000000' : '#ffffff', // dark: black - light: white 
    
        emptyIconColor: isDark ? '#475569' : '#d1d5db', // dark: slate-600 - light: gray-300 
    
        iconColor: isDark ? '#9ca3af' : '#4b5563', // dark: gray-400 - light: gray-600 
    };
}