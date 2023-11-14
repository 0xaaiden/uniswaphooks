import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import NewHookForm from '@component/NewHookForm'

export const metadata = {
  title: 'Add a new Hook | UniswapHooks',
  description: 'Want to add a new hook to the site? Fill out the form below.',
  openGraph: {
    title: 'Add a new Hook | UniswapHooks',
    description: 'Want to add a new hook to the site? Fill out the form below.',
    ...ogMeta,
  },
  twitter: {
    title: ' Add a new Hook | UniswapHooks',
    description: 'Want to add a new hook to the site? Fill out the form below.',
    ...twitterMeta,
  },
}
export default async function Page() {
  return (
    <>
      <HeroBanner
        title="Add a new Hook"
        subtitle="Please ensure your hook adheres to the standards and guidelines of the UniswapHooks community."
      ></HeroBanner>

      <Container classNames="max-w-md px-32 pb-8 lg:pb-12">
        <NewHookForm />
      </Container>
    </>
  )
}
