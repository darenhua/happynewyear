/** @type {import('tailwindcss').Config} */

export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter"],
            },
            screens: {
                "-2xl": { max: "1535px" },
                // => @media (max-width: 1535px) { ... }

                "-xl": { max: "1279px" },
                // => @media (max-width: 1279px) { ... }

                "-lg": { max: "1023px" },
                // => @media (max-width: 1023px) { ... }

                "-md": { max: "767px" },
                // => @media (max-width: 767px) { ... }

                "-sm": { max: "639px" },
                // => @media (max-width: 639px) { ... }
            },
        },
    },
    plugins: [],
};
