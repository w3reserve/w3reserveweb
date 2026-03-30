import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cavagiro.com' },
      { protocol: 'https', hostname: 'cayetanodelpino.com' },
      { protocol: 'https', hostname: 'www.cavagiro.com' },
      { protocol: 'https', hostname: 'www.cayetanodelpino.com' }
    ]
  }
};

export default nextConfig;
