import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import ChainGrid from '@component/ChainGrid'

export const metadata = {
  title: ' Chains | UniswapHooks',
  description: '.',
  openGraph: {
    title: 'Chains | UniswapHooks',
    description: '',
    ...ogMeta,
  },
  twitter: {
    title: ' Chains | UniswapHooks',
    description: '.',
    ...twitterMeta,
  },
}

const chainsPath = join(process.cwd(), '/src/data/chains')

async function getChains() {
  const chainSlugs = await fs.readdir(chainsPath)

  const chainPosts = await Promise.all(
    chainSlugs.map(async (chainSlug) => {
      const postPath = join(chainsPath, chainSlug)
      const chainItem = await fs.readFile(postPath, 'utf-8')

      const { data: chainData } = matter(chainItem)

      return {
        title: chainData.title,
        logo: chainData.logo,
        chainID: chainData.ChainID,
        currency: chainData.currency,
        poolManager: chainData.poolManagerAddress,
        slug: chainSlug.replace('.mdx', ''),
      }
    })
  )

  return chainPosts
}

export default async function Page() {
  const chainPosts = await getChains()

  return (
    <>
      <HeroBanner
        title="Chains"
        subtitle="
          List of EVM networks where Uniswap v4 is deployed.
        "
      ></HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <ChainGrid chainPosts={chainPosts} />
      </Container>
    </>
  )
}
