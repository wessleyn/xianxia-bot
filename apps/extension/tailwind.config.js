/** @type {import('tailwindcss').Config} */
import sharedConfig from "@repo/tailwind-config";

export default {
    presets: [sharedConfig],
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./.wxt/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                spin: {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
            },
        },
    },
};
