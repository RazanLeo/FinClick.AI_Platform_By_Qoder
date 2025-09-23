import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.tsx');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Configure experimental features for large page data
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
    largePageDataBytes: 128 * 100000, // 128MB
  },
  // Alternative configuration for API routes
  serverRuntimeConfig: {
    maxDuration: 60,
  },
}

export default withNextIntl(nextConfig);