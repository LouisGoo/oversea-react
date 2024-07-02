/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{
      source: '/m2/:path*',
      destination: 'https://mock.apipark.cn/m2/:path*',
    }]
  }
}

module.exports = nextConfig
