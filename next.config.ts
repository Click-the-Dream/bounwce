import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", // allow all paths under res.cloudinary.com
      },
    ],
  },
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "https://click-backend-j7yi.onrender.com/api/v1/:path*", // The real API
  //     },
  //   ];
  // },
};

export default nextConfig;
