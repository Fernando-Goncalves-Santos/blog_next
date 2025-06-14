import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
        search: ''
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
        search: ''
      },
    ],
  }
};

//  https://res.cloudinary.com/dvt78xazb/image/upload/v1749852328/theblog/zwh7epljbewsgpfzfx9o.jpg

export default nextConfig;
