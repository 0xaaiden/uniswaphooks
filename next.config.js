/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    domains: ['chainlist.org', "i.imgur.com", "icons.llamao.fi", "polygonscan.com"],
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}
