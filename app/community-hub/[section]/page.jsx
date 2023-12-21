import Link from 'next/link'

import { getUrl } from '@lib/utils'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionLinks from '@component/CollectionLinks'
import BlogGrid from '@component/BlogGrid'
import NewResourceForm from '@component/form/NewResource'

import { sections } from '@data/community-hub'

async function getResources() {
  const baseUrl = getUrl()

  try {
    const responseResources = await fetch(
      `${baseUrl}/api/resource?${Date.now()}`,
      {
        method: 'GET',
      }
    ).then((res) => res.json())

    return responseResources.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default async function Page({ params }) {
  if (params.section && params.section == 'new') {
    const activeCategory = {
      category: 'New Resource',
      emoji: '📝',
    }
    return (
      <>
        <HeroBanner
          title="Add a new Resource"
          subtitle="Help the community by adding a new resource, and share your knowledge."
        >
          <p className="-mt-6 text-base text-gray-900">
            We will review it and add it to the list.
          </p>
        </HeroBanner>

        <Container classNames="pb-8 lg:pb-12">
          <CollectionLinks
            activeCollection={params.section}
            activeCategory={activeCategory}
            componentsData={sections}
          />
          <NewResourceForm />
        </Container>
      </>
    )
  } else if (
    params.section &&
    sections.find((section) => section.id == params.section)
  ) {
    const postPosts = await getResources()
    const postPostsFromSection = postPosts.filter(
      (post) => post.section == params.section
    )

    const activeCategory = {
      category: 'Educational Resources',
      emoji: '📚',
    }

    return (
      <>
        <HeroBanner
          title={params.section
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
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
            activeCollection={params.section}
            activeCategory={activeCategory}
            componentsData={sections}
          />
          <div className="h-8" />
          <BlogGrid blogPosts={postPostsFromSection} />
        </Container>
      </>
    )
  }
}
