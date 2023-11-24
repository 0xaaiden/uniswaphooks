import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import { Badge } from '@component/reusable/Badge'

const uniswaplabs = [
  {
    id: 125,
    title: 'Truncated Oracle',
    description:
      'A truncated oracle is an onchain price oracle that records the price of an asset in a Uniswap liquidity pool using the geometric mean formula.',
    creator: 'Uniswap Labs',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/trunc-oracle/contracts/hooks/TruncGeoOracle.sol',
    status: 'published',
    createdAt: '2023-11-19T08:42:58.337Z',
    updatedAt: '2023-11-19T08:42:58.337Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      description: 'Hooks published by the Uniswap Foundation',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'NULL',
      createdAt: '2023-11-19T08:28:38.649Z',
      updatedAt: '2023-11-19T08:28:38.649Z',
    },
  },
  {
    id: 126,
    title: 'Limit Order',
    description:
      'A hook that allows users to place limit orders. This means that they can specify the price at which they are willing to buy or sell an asset. If the market price reaches the limit price, the order will be executed.',
    creator: 'Uniswap Labs',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/LimitOrder.sol',
    status: 'published',
    createdAt: '2023-11-19T08:42:58.337Z',
    updatedAt: '2023-11-19T08:42:58.337Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      description: 'Hooks published by the Uniswap Foundation',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'NULL',
      createdAt: '2023-11-19T08:28:38.649Z',
      updatedAt: '2023-11-19T08:28:38.649Z',
    },
  },
  {
    id: 127,
    title: 'TWAMM',
    description:
      'A TWAMM (Time Weighted Average Market Maker) is a type of market maker that uses time-weighted averages to calculate the prices of assets. This can be used to reduce the volatility of the market and to provide more accurate prices for assets.',
    creator: 'Uniswap Labs',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/TWAMM.sol',
    status: 'published',
    createdAt: '2023-11-19T08:42:58.337Z',
    updatedAt: '2023-11-19T08:42:58.337Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      description: 'Hooks published by the Uniswap Foundation',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'NULL',
      createdAt: '2023-11-19T08:28:38.649Z',
      updatedAt: '2023-11-19T08:28:38.649Z',
    },
  },
  {
    id: 128,
    title: 'Full Range',
    description:
      'A hook that allows a Uniswap pool to provide liquidity for a range of prices. This can be used to create a market maker for a volatile asset or to provide more liquidity for a thin market.',
    creator: 'Uniswap Labs',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/FullRange.sol',
    status: 'published',
    createdAt: '2023-11-19T08:42:58.337Z',
    updatedAt: '2023-11-19T08:42:58.337Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      description: 'Hooks published by the Uniswap Foundation',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'NULL',
      createdAt: '2023-11-19T08:28:38.649Z',
      updatedAt: '2023-11-19T08:28:38.649Z',
    },
  },
  {
    id: 129,
    title: 'Geomean Oracle',
    description:
      'A unique hook making a Uniswap pool function as an oracle. The geomean price is calculated using the prices of the assets in the pool. This can be used to get a more accurate price for an asset than a single oracle.',
    creator: 'Uniswap Labs',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/GeomeanOracle.sol',
    status: 'published',
    createdAt: '2023-11-19T08:42:58.337Z',
    updatedAt: '2023-11-19T08:42:58.337Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      description: 'Hooks published by the Uniswap Foundation',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'NULL',
      createdAt: '2023-11-19T08:28:38.649Z',
      updatedAt: '2023-11-19T08:28:38.649Z',
    },
  },
  {
    id: 130,
    title: 'Volatility Oracle',
    description:
      'A volatility oracle is a contract that provides information about the volatility of an asset. This information can be used to price options and other derivatives.',
    creator: 'Uniswap Labs',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/VolatilityOracle.sol',
    status: 'published',
    createdAt: '2023-11-19T08:42:58.337Z',
    updatedAt: '2023-11-19T08:42:58.337Z',
    categoryId: 'uniswap-labs',
    category: {
      id: 'uniswap-labs',
      title: 'Uniswap Labs',
      description: 'Hooks published by the Uniswap Foundation',
      category: 'hooks',
      emoji: '🦄',
      count: 0,
      tag: 'NULL',
      createdAt: '2023-11-19T08:28:38.649Z',
      updatedAt: '2023-11-19T08:28:38.649Z',
    },
  },
]

export default function PopularHooks() {
  const hooks = uniswaplabs.sort(() => Math.random() - 0.5)

  return (
    <>
      {hooks.slice(0, 5).map((item) => (
        <Link href={item.github} key={item.id} target="_blank">
          <Badge variant="default" className="mb-1 mr-1">
            {item.category.emoji} {item.title}
          </Badge>
        </Link>
      ))}
      <Badge>
        <Link
          href="/components/hooks/uniswap-labs"
          className="mr-1 flex items-center gap-2"
        >
          <BsThreeDots />
          View more
        </Link>
      </Badge>
    </>
  )
}
