import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
    return process.env.NEXT_PUBLIC_DEV_URL
  } else if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PROD_URL
  } else {
    return process.env.NEXT_PUBLIC_PREVIEW_URL
  }
}

export async function fetchData(baseUrl) {
  try {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
    }

    const [categoryResponse, hookResponse] = await Promise.all([
      fetch(`${baseUrl}/api/category`, fetchOptions),
      fetch(`${baseUrl}/api/hook`, fetchOptions),
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
  data.categories.push({
    id: 'community-hub',
    title: 'Community Hub',
    description: 'Educational resources, and more!',
    emoji: '🌱',
    category: 'articles',
    tag: 'community',
  })

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

export function encodeFilePathToUrl(filePath) {
  const parts = filePath.split('/')
  const encodedParts = parts.map((part) => encodeURIComponent(part))
  return encodedParts.join('/')
}

export async function getResources() {
  const baseUrl = getUrl()

  try {
    const responseResources = await fetch(
      `${baseUrl}/api/resource?${Date.now()}`,
      {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    ).then((res) => res.json())

    return responseResources.data.filter(
      (resource) => resource.status == 'published'
    )
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
