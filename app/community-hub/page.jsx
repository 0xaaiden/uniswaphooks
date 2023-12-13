import Link from 'next/link'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import HeroBanner from '@component/HeroBanner'
import Container from '@component/Container'
import BlogGrid from '@component/BlogGrid'
import CollectionLinks from '@component/CollectionLinks'

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

export default async function Page() {
  const postPosts = await getPosts()
  const sortedPosts = postPosts.sort((postA, postB) => {
    if (postA.section == 'getting-started') {
      return -1
    } else if (postB.section == 'getting-started') {
      return 1
    } else {
      return 0
    }
  })

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
        <BlogGrid blogPosts={sortedPosts} />
      </Container>
    </>
  )
}
