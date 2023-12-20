import Link from 'next/link'

import { getResources } from '@lib/utils'

import HeroBanner from '@component/HeroBanner'
import Container from '@component/Container'
import BlogGrid from '@component/BlogGrid'
import CollectionLinks from '@component/CollectionLinks'

import { sections } from '@data/community-hub'

export default async function Page() {
  const postPosts = await getResources()

  const activeCategory = {
    category: 'Educational Resources',
    emoji: '📚',
  }

  return (
    <>
      <HeroBanner
        title="Community Hub"
        subtitle="Learn about Uniswap v4, with these educational resources"
      >
        <p className="-mt-6 text-base text-gray-900">
          Do you have a resource you'd like to add?{' '}
          <Link
            className="text-pink-600 hover:underline"
            href="/community-hub/new"
          >
            Add it here
          </Link>
          .
        </p>
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <CollectionLinks
          activeCollection={sections}
          activeCategory={activeCategory}
          componentsData={sections}
        />
        <div className="h-8" />
        <BlogGrid blogPosts={postPosts} />
      </Container>
    </>
  )
}
