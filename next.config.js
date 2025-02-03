/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        // Ajoutez ici d'autres configurations expérimentales si nécessaire
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': '/app/src'  // Assurez-vous que cela pointe vers le bon chemin
        };
        return config;
    }
};

export default nextConfig;