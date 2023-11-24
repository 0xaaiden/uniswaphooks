import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import { Badge } from '@component/reusable/Badge'

const uniswaplabs = [
  {
    id: 125,
    title: 'Truncated Oracle',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/trunc-oracle/contracts/hooks/TruncGeoOracle.sol',
    categoryId: 'uniswap-labs',
  },
  {
    id: 126,
    title: 'Limit Order',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/LimitOrder.sol',
    categoryId: 'uniswap-labs',
  },
  {
    id: 127,
    title: 'TWAMM',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/TWAMM.sol',
    categoryId: 'uniswap-labs',
  },
  {
    id: 128,
    title: 'Full Range',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/FullRange.sol',
    categoryId: 'uniswap-labs',
  },
  {
    id: 129,
    title: 'Geomean Oracle',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/GeomeanOracle.sol',
    categoryId: 'uniswap-labs',
  },
  {
    id: 130,
    title: 'Volatility Oracle',
    website: 'https://github.com/Uniswap/v4-periphery',
    github:
      'https://github.com/Uniswap/v4-periphery/blob/main/contracts/hooks/examples/VolatilityOracle.sol',
    categoryId: 'uniswap-labs',
  },
]

export default function PopularHooks() {
  const hooks = uniswaplabs.sort(() => Math.random() - 0.5)

  return (
    <>
      {hooks.slice(0, 5).map((item) => (
        <Link href={item.github} key={item.id} target="_blank">
          <Badge variant="default" className="mb-1 mr-1">
            🦄 {item.title}
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
