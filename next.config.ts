import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: '**.clerk.com' },
    ],
  },
  webpack: (config: any) => {
    config.cache = false;
    if (config.optimization) {
      config.optimization.minimize = false;
    }
    return config;
  },
}

export default nextConfig

