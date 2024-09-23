import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  images: {
    domains: ['assets.acme.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io'
      }
    ],
  },
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        dns: false,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
