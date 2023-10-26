import Head from 'next/head'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

import { Inter } from 'next/font/google'

import 'prismjs/themes/prism-okaidia.css'
import '@style/site.css'

// import Ads from '@/ads'
import Footer from '@component/Footer'
import Header from '@component/Header'
import HeaderBanner from '@component/HeaderBanner'
import Ads from './ads'

export const metadata = {
  title: 'Uniswap v4 Hooks Directory',
  description: 'Curated Uniswap v4 Hooks.',
  openGraph: {
    title: 'Uniswap v4 Hooks Directory | Curated Open Source Hooks',
    description:
      'Discover top Uniswap v4 Hooks for seamless DeFi integrations.',
    url: 'https://www.uniswaphooks.com/',
    siteName: 'UniswapHooks',
    type: 'website',
    images: ['https://www.uniswaphooks.com/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curated Uniswap v4 Hooks Directory',
    description:
      'Community-Curated Uniswap v4 Hooks for seamless DeFi integrations.',
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html className="h-full scroll-smooth" lang="en" dir="ltr">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_KEY}`}
      />
      {/* <script async src="https://unpkg.com/emojisplosion/lib/easy.js"></script> */}

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GA_KEY}');
        `}
      </Script>

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>

      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <HeaderBanner />
        <Ads />
        <main className="bg-white">{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
