import { getCollectionData, getHookData, getCollections } from '@lib/utils'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import CollectionLinks from '@component/CollectionLinks'
import ComponentPreview from '@component/ComponentPreview'

export async function generateMetadata({ params }) {
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

export default async function Page({ params }) {
  const data = await getHookData(params)
  const collections = await getCollections()
  const filteredCollections = collections.filter(
    (collection) => collection.category !== 'articles'
  )
  const activeCategory = {
    category: params.category,
    emoji: '🪝',
  }

  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks
        activeCollection={params.collection}
        activeCategory={activeCategory}
        componentsData={filteredCollections.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        )}
      />

      <h3 className="text-3xl font-bold">{data[0].category.title}</h3>

      <div className="prose grid max-w-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((componentData) => (
          <ComponentPreview componentData={componentData} />
        ))}
      </div>
    </Container>
  )
}
