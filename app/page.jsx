import { getUrl, fetchData } from '@lib/utils'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionCard from '@component/CollectionCard'
import HeaderSearch from '@component/HeaderSearch'
import PopularHooks from '@component/PopularHooks'

export default async function Page() {
  const data = await fetchData(getUrl())

  return (
    <>
      <HeroBanner
        title="Uniswap v4 Hooks"
        subtitle="Open Source Directory for Uniswap v4 Hooks"
      >
        <p>
          A community-curated collection of hooks implementations for Uniswap v4
          that can be used in your project. Each hook is self-contained and can
          be used independently.
        </p>

        <HeaderSearch />
        <PopularHooks />
      </HeroBanner>

      <Container classNames="pb-8 lg:pb-12">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.categories.map((category) => {
            return (
              <li className="space-y-4" key={category.id}>
                <CollectionCard componentData={category} />
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
