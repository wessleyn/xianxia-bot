// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')
import {novelPatterns} from '@repo/scrapper'
const nextConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: { plugins: any[]; }, { isServer }: any) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ].concat(novelPatterns.map(pattern => ({
        protocol: "https",
        hostname: pattern.homepage,
        port: "",
        pathname: "/**",
      }))),
  }
};

export default nextConfig;
