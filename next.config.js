/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  eslint: {
    // Désactiver ESLint lors du build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Désactiver aussi la vérification TypeScript lors du build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
