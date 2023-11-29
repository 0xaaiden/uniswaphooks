import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export async function generateMetadata({ params }) {
  const { categoryData } = await getCategory(params)

  return {
    title: `${categoryData.title} Hooks | UniswapHooks`,
    description: categoryData.description,
    openGraph: {
      title: `${categoryData.title} Hooks | UniswapHooks`,
      description: categoryData.description,
      ...ogMeta,
    },
    twitter: {
      title: ` ${categoryData.title} Hooks | UniswapHooks`,
      description: categoryData.description,
      ...twitterMeta,
    },
  }
}

export async function generateStaticParams() {
  return ['hooks']
}

async function getCategory(params) {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlug = params.category
  const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)

  const componentSlugs = await fs.readdir(componentsPath)
  const categoryItem = await fs.readFile(categoryPath, 'utf-8')

  const { data: categoryData } = matter(categoryItem)

  const componentItems = await Promise.all(
    componentSlugs
      .filter((componentSlug) => componentSlug.includes(categorySlug))
      .map(async (componentSlug) => {
        const componentPath = join(componentsPath, componentSlug)
        const componentItem = await fs.readFile(componentPath, 'utf-8')

        const { data: componentData } = matter(componentItem)

        const componentSlugFormatted = componentSlug.replace('.mdx', '')
        const componentSlugTrue = componentSlugFormatted.replace(
          `${categorySlug}-`,
          ''
        )
        const componentCount = componentData.components
          ? Object.values(componentData.components).length
          : 0

        return {
          title: componentData.title,
          slug: componentSlugTrue,
          category: componentData.category,
          emoji: componentData.emoji,
          count: componentCount,
          tag: componentData.tag,
          id: componentSlugFormatted,
        }
      })
  )

  return {
    categoryData,
    componentItems,
  }
}

export default async function Page({ params }) {
  const { categoryData, componentItems } = await getCategory(params)

  return (
    <>
      <HeroBanner
        title={`${categoryData.title}`}
        subtitle={categoryData.subtitle}
      >
        {categoryData.description}
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}
