/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Only apply basePath and assetPrefix in production for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/in' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/in' : '',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    loader: 'default',
    domains: ['images.unsplash.com', 'assets.aceternity.com', 'cdn.simpleicons.org', 'cdn.builder.io'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'assets.aceternity.com' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
      { protocol: 'https', hostname: 'cdn.builder.io' },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure static assets are properly handled
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  // Ensure CSS is properly processed for static export
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
