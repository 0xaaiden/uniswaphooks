import { getToolData, getTools } from '@lib/utils'

import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import CollectionLinks from '@component/CollectionLinks'

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

export default async function Page({ params }) {
  const data = await getToolData(params)
  const tools = await getTools()

  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks
        activeCollection={params.toolId}
        activeCategory={params.tool}
        componentsData={tools}
      />

      <div className="prose grid max-w-none grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
    </Container>
  )
}
