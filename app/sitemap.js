import { fetchData, getUrl, getResources } from '@lib/utils'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

async function getPosts() {
  const postsPath = join(process.cwd(), '/src/data/posts')
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
    const dataTools = dataToolsResults.map((result) => result.value)
    const siteSlugsTools = dataTools.map((tool) => `tools/tool/${tool.id}`)

    const dataPosts = await getPosts()
    const siteSlugsPosts = dataPosts.map((post) => `blog/${post.slug}`)

    const resourcesPosts = await getResources()
    const siteSlugsResourcesPosts = resourcesPosts.map(
      (post) => `community-hub/${post.section}#${post.id}`
    )

    const siteSlugs = [
      ...siteSlugsHooks,
      ...siteSlugsTools,
      ...siteSlugsPosts,
      ...siteSlugsResourcesPosts,
    ]
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
