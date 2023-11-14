import { ogMeta, twitterMeta } from '@data/metadata'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import NewCategoryForm from '@component/NewCategoryForm'

export const metadata = {
  title: 'Add a new Category | UniswapHooks',
  description:
    'Want to add a new category to the site? Fill out the form below.',
  openGraph: {
    title: 'Add a new Category | UniswapHooks',
    description:
      'Want to add a new category to the site? Fill out the form below.',
    ...ogMeta,
  },
  twitter: {
    title: ' Add a new Category | UniswapHooks',
    description:
      'Want to add a new category to the site? Fill out the form below.',
    ...twitterMeta,
  },
}
export default async function Page() {
  return (
    <>
      <HeroBanner
        title="Add a new Category"
        subtitle="Please ensure your category adheres to the standards and guidelines of the UniswapHooks community."
      ></HeroBanner>

      <Container classNames="max-w-md px-32 pb-8 lg:pb-12">
        <NewCategoryForm />
      </Container>
    </>
  )
}
