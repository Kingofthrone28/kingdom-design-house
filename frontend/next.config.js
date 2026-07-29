/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/case-studies/northwell-concept/',
        destination: '/case-studies/northwell/',
        permanent: true
      }
    ];
  }
}

module.exports = nextConfig
