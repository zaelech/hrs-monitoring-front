/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        // Ajoutez ici d'autres configurations expérimentales si nécessaire
    },
    eslint: {
        // Désactivation des vérifications ESLint pendant la construction
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": "/app/src", // Assurez-vous que cela pointe vers le bon chemin
        };
        return config;
    },
};

module.exports = nextConfig;
