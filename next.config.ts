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
  dest: "public", // 👈 service worker + manifest will be stored here
  register: true,
  skipWaiting: true,
})(nextConfig);
