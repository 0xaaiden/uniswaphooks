import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

import { getCollectionData } from '@lib/utils'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
import CollectionLinks from '@component/CollectionLinks'
import CollectionList from '@component/CollectionList'

const mdxComponents = {
  CollectionList,
}

const componentsDirectory = join(process.cwd(), '/src/data/components')

export async function generateMetadata({ params }) {
  const { collectionData } = await getCollection(params)
  console.log(collectionData)
  try {
    const data = await getCollectionData(params)

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

export async function generateStaticParams() {
  return await fs.readdir(componentsDirectory)
}

async function getCollection(params) {
  const componentPath = join(
    componentsDirectory,
    `${params.category}-${params.collection}.mdx`
  )

  const postItem = await fs.readFile(componentPath, 'utf-8')

  const { content, data: hook_info } = matter(postItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: hook_info,
  })

  return {
    collectionData: {
      ...hook_info,
      slug: params.collection,
    },
    collectionContent: mdxSource,
  }
}

export default async function Page({ params }) {
  const { collectionData, collectionContent } = await getCollection(params)

  const componentsData = {
    componentContainer: collectionData.container || '',
    componentsData: collectionData.components
      ? Object.entries(collectionData.components).map(
          ([componentId, componentItem]) => {
            return {
              id: componentId,
              title: componentItem.title,
              description: componentItem.description,
              github: componentItem.github,
              website: componentItem.website,
              slug: collectionData.slug,
              category: collectionData.category,
              container: componentItem.container || '',
              creator: componentItem.creator || '',
              dark: !!componentItem.dark,
            }
          }
        )
      : [],
  }

  console.log(collectionData)
  console.log(collectionContent)
  console.log(componentsData)

  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks
        activeCollection={params.collection}
        activeCategory={params.category}
      />

      <div className="prose max-w-none">
        {/* TODO: Render with this componenet : ComponentPreview */}
        <MdxRemoteRender
          mdxSource={collectionContent}
          mdxComponents={mdxComponents}
          mdxScope={componentsData}
        />
      </div>
    </Container>
  )
}
