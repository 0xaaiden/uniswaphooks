import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { join } from 'path'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function extractCreator(github) {
  return github.split('/')[3]
}

export async function readStream(stream) {
  const reader = stream.getReader()
  let chunks = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks += new TextDecoder().decode(value)
  }

  return chunks
}

export function getUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else if (process.env.NODE_ENV === 'production')
    return 'https://uniswaphooks.com'
  else {
    return 'https://uniswaphooks-preview.vercel.app'
  }
}

export async function fetchData(baseUrl) {
  try {
    const [categoryResponse, hookResponse] = await Promise.all([
      fetch(`${baseUrl}/api/category`, { method: 'GET' }),
      fetch(`${baseUrl}/api/hook`, { method: 'GET' }),
    ])

    if (!categoryResponse.ok) {
      throw new Error(
        `Network response for categories was not ok: ${categoryResponse.status}`
      )
    }
    if (!hookResponse.ok) {
      throw new Error(
        `Network response for hooks was not ok: ${hookResponse.status}`
      )
    }

    const categoriesData = await categoryResponse.json()
    const hooksData = await hookResponse.json()

    const categoryCounts = categoriesData.data.reduce((acc, category) => {
      acc[category.id] = 0
      return acc
    }, {})

    hooksData.data.forEach((hook) => {
      if (categoryCounts.hasOwnProperty(hook.categoryId)) {
        categoryCounts[hook.categoryId]++
      }
    })

    const updatedCategories = categoriesData.data.map((category) => ({
      ...category,
      count: categoryCounts[category.id] || 0,
    }))

    return { categories: updatedCategories, hooks: hooksData.data }
  } catch (error) {
    throw error
  }
}

export async function getCollections() {
  const data = await fetchData(getUrl())

  return data.categories
}

export async function getCollectionData(params) {
  const data = await fetchData(getUrl())

  return data.categories.filter(
    (category) => category.id === params.collection
  )[0]
}

export async function getHookData(params) {
  const data = await fetchData(getUrl())

  return data.hooks.filter(
    (hook) =>
      hook.status === 'published' && hook.categoryId === params.collection
  )
}

export async function getTools() {
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

export async function getToolData(params) {
  const toolPosts = await getTools()

  return toolPosts.filter((tool) => tool.id === params.toolId)[0]
}
