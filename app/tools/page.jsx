import { ogMeta, twitterMeta } from '@data/metadata'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionCard from '@component/CollectionCard'

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

async function getTools() {
  const toolsPath = join(process.cwd(), '/src/data/tools')
  const toolSlugs = await fs.readdir(toolsPath)

  const toolPosts = await Promise.all(
    toolSlugs.map(async (toolSlug) => {
      const postPath = join(toolsPath, toolSlug)
      const toolItem = await fs.readFile(postPath, 'utf-8')

      const { data: toolData } = matter(toolItem)

      return {
        id: toolData.id,
        title: toolData.title,
        description: toolData.description,
        tag: toolData?.tag,
        emoji: toolData.emoji,
        category: toolData.category,
      }
    })
  )

  return toolPosts
}

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
