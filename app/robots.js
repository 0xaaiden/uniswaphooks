export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/components/', '/blogs/']
      },
      sitemap: 'https://www.uniswaphooks.com/sitemap.xml',
    }
  }
