export default nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- Agregamos esto para obligar a Next.js a crear carpetas HTML
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
