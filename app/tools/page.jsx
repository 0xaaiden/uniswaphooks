import { ogMeta, twitterMeta } from '@data/metadata'

export const metadata = {
  title: 'Tools | UniswapHooks',
  description: '.',
  openGraph: {
    title: 'Tools | UniswapHooks',
    description: '',
    ...ogMeta,
  },
  twitter: {
    title: 'Tools | UniswapHooks',
    description: '.',
    ...twitterMeta,
  },
}

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionCard from '@component/CollectionCard'

import { getTools } from '@lib/utils'

export default async function Page() {
  const toolPosts = await getTools()

  return (
    <>
      {/**
       * TODO: What to write in the Subtitle
       */}
      <HeroBanner
        title="Tools"
        subtitle="Got no idea what to write here lols.."
      ></HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        {toolPosts.map((toolPost) => (
          <li
            key={toolPost.id}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <CollectionCard componentData={toolPost} />
          </li>
        ))}
      </Container>
    </>
  )
}
