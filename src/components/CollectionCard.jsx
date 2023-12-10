import Link from 'next/link'

export default function CollectionCard({ componentData }) {
  const hasTag = !!componentData.tag
  return (
    <>
      {componentData.category === 'hooks' && (
        <Link
          href={`/components/${componentData.category}/${componentData.id}`}
        >
          <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
            <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    role="img"
                    className="text-lg sm:text-xl"
                  >
                    {componentData.emoji}
                  </span>

                  {hasTag && <CardTag tagType={componentData.tag} />}
                </div>

                <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
                  {componentData.title}
                </h2>

                <p className="mt-1 text-xs text-gray-700">
                  {componentData.count}{' '}
                  {componentData.count > 1 ? 'Hooks' : 'Hook'}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {componentData.category === 'tools' && (
        <Link href={`/tools/tool/${componentData.id}`}>
          <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
            <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    role="img"
                    className="text-lg sm:text-xl"
                  >
                    {componentData.emoji}
                  </span>

                  {hasTag && <CardTag tagType={componentData.tag} />}
                </div>

                <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
                  {componentData.title}
                </h2>

                <p className="mt-1 text-xs text-gray-700">
                  {componentData.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}

      {componentData.category === 'articles' && (
        <Link href={`/${componentData.id}`}>
          <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
            <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    role="img"
                    className="text-lg sm:text-xl"
                  >
                    {componentData.emoji}
                  </span>

                  {hasTag && <CardTag tagType={componentData.tag} />}
                </div>

                <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
                  {componentData.title}
                </h2>

                <p className="mt-1 text-xs text-gray-700">
                  {componentData.description}
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  )
}

function CardTag({ tagType }) {
  const isNew = tagType === 'new'
  const isSoon = tagType === 'soon'
  const isUpdated = tagType === 'updated'
  const isCustom = tagType === 'community'

  if (!isNew && !isUpdated && !isSoon && !isCustom) {
    return <></>
  }

  return (
    <span
      className={`-me-1.5 -mt-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium capitalize sm:-me-3 sm:-mt-3 ${
        isNew && 'bg-green-100 text-green-700'
      } ${isUpdated && 'bg-blue-100 text-blue-700'} ${
        isSoon && 'bg-yellow-100 text-yellow-700'
      } ${isCustom && 'bg-purple-100 text-purple-700'}`}
    >
      {tagType}
    </span>
  )
}
