import { getUrl, fetchData } from '@lib/utils'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

async function getTools() {
  const toolsPath = join(process.cwd(), '/src/data/tools')
  const toolSlugs = await fs.readdir(toolsPath)

  return Promise.allSettled(
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
}

export default async function sitemap() {
  try {
    const dataHooksCategories = await fetchData(getUrl())
    const siteSlugsHooks = dataHooksCategories.categories.map(
      (category) => `components/hooks/${category.id}`
    )

    const dataToolsResults = await getTools()
    const dataTools = dataToolsResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value)
    const siteSlugsTools = dataTools.map(
      (tool) => `components/tools/${tool.id}`
    )

    const siteSlugs = [...siteSlugsHooks, ...siteSlugsTools]
    const currentDate = new Date()

    const transformedSlugs = siteSlugs.map((siteSlug) => ({
      url: `https://www.uniswaphooks.com/${siteSlug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [
      {
        url: 'https://www.uniswaphooks.com',
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1,
      },
      ...transformedSlugs,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }
}
