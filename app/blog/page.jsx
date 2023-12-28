import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import BlogGrid from '@component/BlogGrid'

export const metadata = {
  title: 'Blog | UniswapHooks',
  description: '.',
  openGraph: {
    title: 'Blog | UniswapHooks',
    description: '',
    ...ogMeta,
  },
  twitter: {
    title: 'Blog | UniswapHooks',
    description: '.',
    ...twitterMeta,
  },
}

const postsPath = join(process.cwd(), '/src/data/posts')

async function getPosts() {
  const blogSlugs = await fs.readdir(postsPath)

  const blogPosts = await Promise.all(
    blogSlugs.map(async (blogSlug) => {
      const postPath = join(postsPath, blogSlug)
      const blogItem = await fs.readFile(postPath, 'utf-8')

      const { data: blogData } = matter(blogItem)

      return {
        title: blogData.title,
        date: blogData.date,
        emoji: blogData.emoji,
        tag: blogData.tag,
        slug: blogSlug.replace('.mdx', ''),
      }
    })
  )

  return blogPosts.sort((blogA, blogB) => {
    const dateA = new Date(blogA.date)
    const dateB = new Date(blogB.date)

    return dateB - dateA
  })
}

export default async function Page() {
  const blogPosts = await getPosts()

  return (
    <>
      <HeroBanner title="Blog" subtitle=""></HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <BlogGrid blogPosts={blogPosts} />
      </Container>
    </>
  )
}
