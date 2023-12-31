import { ogMeta, twitterMeta } from '@data/metadata'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

import Container from '@component/Container'
import CollectionLinks from '@component/CollectionLinks'
import ToolCard from '@component/tools/ToolCard'

export async function generateMetadata({ params }) {
  try {
    const data = await getToolData(params)

    return {
      title: `${data.title} | UniswapHooks`,
      description: data.description,
      openGraph: {
        title: `${data.title} | UniswapHooks`,
        description: data.description,
        ...ogMeta,
      },
      twitter: {
        title: `${data.title} | UniswapHooks`,
        description: data.description,
        ...twitterMeta,
      },
    }
  } catch (error) {
    console.error('Error fetching collection data:', error)
  }
}

async function getToolData(params) {
  const toolPosts = await getTools()

  return toolPosts.filter((tool) => tool.id === params.toolId)[0]
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
        docs: toolData.docs,
        tag: toolData?.tag,
        emoji: toolData.emoji,
        category: toolData.category,
      }
    })
  )

  return toolPosts
}

export default async function Page({ params }) {
  const data = await getToolData(params)
  const tools = await getTools()
  const activeCategory = {
    category: params.tool,
    emoji: '🔧',
  }
  
  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks
        activeCollection={params.toolId}
        activeCategory={activeCategory}
        componentsData={tools}
      />

      <div>
        <ToolCard toolPost={data} params={params} />
      </div>
    </Container>
  )
}
