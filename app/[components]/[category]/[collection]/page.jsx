import { getCollectionData, getHookData } from '@lib/utils'

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

  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks
        activeCollection={params.collection}
        activeCategory={params.category}
      />

      <h3 className="text-3xl font-bold">Hook {data[0].category.title}</h3>
      <div className="prose -pt-8 grid max-w-none grid-cols-3">
        {data.map((componentData) => (
          <ComponentPreview componentData={componentData} />
        ))}
      </div>
    </Container>
  )
}
