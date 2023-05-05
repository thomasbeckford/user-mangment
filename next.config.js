/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },

  images: {
    domains: ['pbs.twimg.com', 'picsum.photos', 'uploadthing.com'],
  },
}

module.exports = nextConfig
