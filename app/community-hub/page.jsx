import { quickLinks } from '@data/menuLinks'

import HeroBanner from '@component/HeroBanner'
import Container from '@component/Container'
import PagesLinks from '@component/pages-links/PagesLinks'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'
import BlogPreview from '@component/BlogPreview'

import MdxRemoteRender from '@component/MdxRemoteRender'
const mdxComponents = {
  BlogPreview,
}

async function getTools() {
  const toolsPath = join(
    process.cwd(),
    '/src/data/community-hub/getting-started.mdx'
  )
  const postItem = await fs.readFile(toolsPath, 'utf-8')

  const { content, data: frontmatter } = matter(postItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
    },
    scope: frontmatter,
  })

  return {
    blogData: frontmatter,
    blogContent: mdxSource,
  }
}

export default async function Page() {
  const { blogData, blogContent } = await getTools()
  return (
    <>
      <HeroBanner
        title="Community Hub"
        subtitle="Learn about Uniswap v4, with these educational resources"
      />
      <Container classNames="pb-8 lg:pb-12">
        <PagesLinks componentsData={quickLinks} />
        <article className="prose prose-img:rounded-lg max-w-7xl">
          <MdxRemoteRender
            mdxSource={blogContent}
            mdxComponents={mdxComponents}
          />
        </article>
      </Container>
    </>
  )
}
