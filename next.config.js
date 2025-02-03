/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactivation des vérifications ESLint pendant la construction
    ignoreDuringBuilds: true,
  },
  // Configuration supplémentaire pour s'assurer que l'application fonctionne correctement sur Azure
  output: 'standalone',
}

module.exports = nextConfig