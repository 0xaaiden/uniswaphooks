import HeroBanner from '@component/HeroBanner'
import Container from '@component/Container'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import BlogGrid from '@component/BlogGrid'

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
        type: postData.type,
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
    if (postA.type == 'getting-started') {
      return -1
    } else if (postB.type == 'getting-started') {
      return 1
    } else {
      return 0
    }
  })

  return (
    <>
      <HeroBanner
        title="Community Hub"
        subtitle="Learn about Uniswap v4, with these educational resources"
      />
      <Container classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={sortedPosts} />
      </Container>
    </>
  )
}
