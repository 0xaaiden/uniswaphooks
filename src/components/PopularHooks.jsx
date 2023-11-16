import Link from 'next/link'
import { Badge } from '@component/reusable/Badge'

const uniswaplabs = [
  {
    id: 15,
    title: 'Full Range',
    description:
      'A hook that allows a Uniswap pool to provide liquidity for a range of prices. This can be used to create a market maker for a volatile asset or to provide more liquidity for a thin market.\n' +
      '',
    creator: 'Uniswap',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/FullRange.sol',
    status: 'published',
    createdAt: '2023-11-16T17:31:57.329Z',
    updatedAt: '2023-11-16T17:37:25.048Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'Verified',
      createdAt: '2023-11-16T17:36:33.658Z',
      updatedAt: '2023-11-16T17:36:33.658Z',
    },
  },
  {
    id: 16,
    title: 'Geomean Oracle',
    description:
      'A unique hook making a Uniswap pool function as an oracle. The geomean price is calculated using the prices of the assets in the pool. This can be used to get a more accurate price for an asset than a single oracle.\n' +
      '',
    creator: 'Uniswap',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/GeomeanOracle.sol',
    status: 'published',
    createdAt: '2023-11-16T17:32:33.462Z',
    updatedAt: '2023-11-16T17:37:59.195Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'Verified',
      createdAt: '2023-11-16T17:36:33.658Z',
      updatedAt: '2023-11-16T17:36:33.658Z',
    },
  },
  {
    id: 17,
    title: 'Limit Order',
    description:
      'A hook that allows users to place limit orders. This means that they can specify the price at which they are willing to buy or sell an asset. If the market price reaches the limit price, the order will be executed.\n' +
      '',
    creator: 'Uniswap',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/LimitOrder.sol',
    status: 'published',
    createdAt: '2023-11-16T17:33:02.369Z',
    updatedAt: '2023-11-16T17:38:16.566Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'Verified',
      createdAt: '2023-11-16T17:36:33.658Z',
      updatedAt: '2023-11-16T17:36:33.658Z',
    },
  },
  {
    id: 18,
    title: 'TWAMM',
    description:
      ' A TWAMM (Time Weighted Average Market Maker) is a type of market maker that uses time-weighted averages to calculate the prices of assets. This can be used to reduce the volatility of the market and to provide more accurate prices for assets.\n' +
      '',
    creator: 'Uniswap',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/TWAMM.sol',
    status: 'published',
    createdAt: '2023-11-16T17:33:30.819Z',
    updatedAt: '2023-11-16T17:38:26.977Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'Verified',
      createdAt: '2023-11-16T17:36:33.658Z',
      updatedAt: '2023-11-16T17:36:33.658Z',
    },
  },
  {
    id: 20,
    title: 'Truncated Oracle',
    description:
      'A truncated oracle is an onchain price oracle that records the price of an asset in a Uniswap liquidity pool using the geometric mean formula.\n' +
      '',
    creator: 'Uniswap',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/trunc-oracle/contracts/hooks/TruncGeoOracle.sol',
    status: 'published',
    createdAt: '2023-11-16T17:34:24.403Z',
    updatedAt: '2023-11-16T17:38:39.448Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'Verified',
      createdAt: '2023-11-16T17:36:33.658Z',
      updatedAt: '2023-11-16T17:36:33.658Z',
    },
  },
]

export default function PopularHooks() {
  return (
    <>
      {uniswaplabs.slice(0, 4).map((item) => (
        <Link href={item.github} key={item.id} target="_blank">
          <Badge variant="default" className="mb-1 mr-1">
            {item.category.emoji} {item.title}
          </Badge>
        </Link>
      ))}
    </>
  )
}
