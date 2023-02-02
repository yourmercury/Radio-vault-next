/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    IPFS_GATEWAY: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
  }
}

module.exports = nextConfig
