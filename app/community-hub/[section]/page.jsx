import Link from 'next/link'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionLinks from '@component/CollectionLinks'
import BlogGrid from '@component/BlogGrid'
import NewResourceForm from '@component/form/NewResource'

import { sections } from '@data/community-hub'

const postsPath = join(process.cwd(), '/src/data/community-hub')

async function getPosts() {
  const postSlugs = await fs.readdir(postsPath)

  const postPosts = await Promise.all(
    postSlugs.map(async (postSlug) => {
      const postPath = join(postsPath, postSlug)
      const postItem = await fs.readFile(postPath, 'utf-8')

      const { data: postData } = matter(postItem)

      return {
        title: postData.title,
        date: postData.date,
        emoji: postData.emoji,
        tag: postData.tag,
        section: postData.section,
        slug: postSlug.replace('.mdx', ''),
      }
    })
  )

  return postPosts.sort((postA, postB) => {
    const dateA = new Date(postA.date)
    const dateB = new Date(postB.date)

    return dateB - dateA
  })
}

// Params is compososed section and id
// Example: /community-hub/section/id
// The section must be always from @data/community-hub, if not, it will return 404
// Unless the section = 'new' then it will get a form to add new resources

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
    const postPosts = await getPosts()
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
