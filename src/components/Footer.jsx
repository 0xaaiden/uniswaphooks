import Link from 'next/link'

import Container from '@component/Container'
import BrandLogo from '@component/BrandLogo'

export default function Footer() {
  const menuLinks = [
    {
      title: 'FAQs',
      href: '/about/faqs',
    },
    {
      title: 'Acknowledgements',
      href: '/about/acknowledgements',
    },
    // {
    //   title: 'Sponsors',
    //   href: '/about/sponsors',
    // },
  ]

  return (
    <footer className="border-t border-gray-200 bg-white">
    <Container classNames="py-8 lg:py-12">
    <Link href="/">
      <div className={`inline-flex gap-1.5 text-lg`}>
        <span className="font-medium text-gray-900">UniswapHooks.com</span>

     
      </div>
    </Link>

        <div className="mt-6">
            <p className="max-w-md leading-relaxed text-gray-600">
                Open source Uniswap v4 hooks. Community-contributed hooks directory.
            </p>

            <div className="mt-4 lg:flex lg:items-end lg:justify-between">
                <ul className="flex gap-4">
                    {menuLinks.map((menuLink) => (
                        <li key={menuLink.href}>
                            <Link href={menuLink.href}>
                                <div className="block text-sm font-medium text-gray-900 hover:opacity-75">
                                    {menuLink.title}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="mt-4 text-sm text-gray-600 lg:mt-0">
                    Created by{' '}
                    <a
                        href="https://github.com/0xaaiden"
                        rel="noreferrer"
                        target="_blank"
                        className="inline-block font-medium text-gray-700 hover:text-gray-900"
                    >
                        Aiden
                    </a>
                    .
                </p>
            </div>
        </div>
    </Container>
</footer>

  )
}
