/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // ajoutez cette ligne
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Couleurs de branding (fixes)
                primary: "#FF6601", // Pumpkin
                secondary: "#0F2337", // Oxford Blue

                // Couleurs fonctionnelles (avec variantes dark)
                content: {
                    DEFAULT: "#1C3350", // Prussian blue - Light mode
                    dark: "#E8E6E0", // Version claire pour dark mode
                },
                "content-hover": {
                    DEFAULT: "#2D4F7D", // YlnMn Blue - Light mode
                    dark: "#FAF7F1", // Version plus claire pour dark mode
                },
                classic: {
                    DEFAULT: "#FAF7F1", // Isabelline - Light mode
                    dark: "#1C3350", // Prussian blue pour dark mode
                },
                surface: {
                    DEFAULT: "#E8E6E0", // Alabaster - Light mode
                    dark: "#2D4F7D", // YlnMn Blue pour dark mode
                },
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
