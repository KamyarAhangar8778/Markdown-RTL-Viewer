import type {NextConfig} from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isExport = process.env.NEXT_EXPORT === 'true' || isGithubActions;
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
// Ensure basePath begins with '/' and does not end with '/' unless empty, only active in static export
const basePath = isExport
  ? rawBasePath.startsWith('/')
    ? rawBasePath
    : rawBasePath
      ? `/${rawBasePath}`
      : ''
  : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Static export support for GitHub Pages with unoptimized images
  images: {
    unoptimized: isExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  output: isExport ? 'export' : 'standalone',
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: isExport,
  transpilePackages: ['motion', 'lenis'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify - file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
