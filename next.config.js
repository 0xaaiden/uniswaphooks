/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'chainlist.org',
      'i.imgur.com',
      'icons.llamao.fi',
      'coinbase.com',
      'zsexknpkikhnetgdoayv.supabase.co',
      'placehold.co',
    ],
  },
  reactStrictMode: true,
}
