import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "diva2ast20wqu.cloudfront.net",
        pathname: "/**",
      },
      // Keep the old S3 one temporarily until you confirm
      // everything works, then remove it
      {
        protocol: "https",
        hostname: "infinity-client-documents.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
