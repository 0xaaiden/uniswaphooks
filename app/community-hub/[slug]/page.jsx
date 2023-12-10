import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeExternalLinks from 'rehype-external-links'
import remarkSlug from 'remark-slug'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import BlogPreview from '@component/BlogPreview'
import TableContent from '@component/BlogTableContent'
import MdxRemoteRender from '@component/MdxRemoteRender'

const mdxComponents = {
  BlogPreview,
}

const postsPath = join(process.cwd(), '/src/data/community-hub')

export async function generateMetadata({ params }) {
  const { postData } = await getPost(params)

  return {
    title: `${postData.title} | UniswapHooks`,
    description: postData.description,
    openGraph: {
      title: `${postData.title} | UniswapHooks`,
      description: postData.description,
      ...ogMeta,
    },
    twitter: {
      title: `${postData.title} | UniswapHooks`,
      description: postData.description,
      ...twitterMeta,
    },
  }
}

export async function generateStaticParams() {
  return await fs.readdir(postsPath)
}

async function getPost(params) {
  const postPath = join(postsPath, `${params.slug}.mdx`)
  const postItem = await fs.readFile(postPath, 'utf-8')

  const { content, data: frontmatter } = matter(postItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkSlug],
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
    },
    scope: frontmatter,
  })

  return {
    postData: frontmatter,
    postContent: mdxSource,
  }
}

export default async function Page({ params }) {
  const { postData, postContent } = await getPost(params)

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'NewsArticle',
    headline: `${postData.title}`,
    image: 'https://www.uniswaphooks.com/og.jpg',
    type: `${postData.type}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Container classNames="py-8 lg:py-12">
        <article className="prose prose-img:rounded-lg mx-auto">
          <header>
            <span className="text-sm text-gray-700"># {postData.type}</span>

            <h1 className="mt-1">{postData.title}</h1>
          </header>

          <TableContent />

          <MdxRemoteRender
            mdxSource={postContent}
            mdxComponents={mdxComponents}
          />
        </article>
      </Container>
    </>
  )
}
