import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Static HTML export for Cloudflare Pages (no server runtime required).
  output: 'export',
  transpilePackages: ['motion'],
};

export default nextConfig;
