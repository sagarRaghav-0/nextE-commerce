import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    domains: ["uskmnrcplvfskbrduxzh.supabase.co"],
  },
  reactStrictMode: false,
  devIndicators: false,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  // 👇 Cache everything
  runtimeCaching: [
    {
      urlPattern: /.*/i, // match all URLs
      handler: "NetworkFirst", // try network, fallback to cache
      options: {
        cacheName: "all-cache",
        expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30 days
      },
    },
  ],
})(nextConfig);
