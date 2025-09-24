/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    domains: ["img.clerk.com"],
  },
};

export default nextConfig;
