/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Fix for large file uploads and API requests
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
    responseLimit: '100mb',
  },
  // Alternative configuration for API routes
  serverRuntimeConfig: {
    maxDuration: 60,
  },
  // Add experimental features
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
    largePageDataBytes: 128 * 100000, // 128MB
  },
}

export default nextConfig