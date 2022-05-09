/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["tmdb.org", "themoviedb.org", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
