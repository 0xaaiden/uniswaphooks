import Link from 'next/link'
import ButtonStyle from '@component/ButtonStyle'

export default async function CollectionLinks({
  activeCollection,
  activeCategory,
  componentsData,
}) {
  return (
    <div>
      <ul className="flex gap-4">
        <li className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" role="img" className="text-sm">
            🪝
          </span>

          <span className="text-xs font-medium text-gray-900">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </span>
        </li>
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1 ">
        {componentsData.map((componentData) => {
          const buttonText = componentData.count
            ? `${componentData.title} (${componentData.count})`
            : componentData.title

          const isActive =
            activeCategory === componentData.category &&
            activeCollection === componentData.slug

          return (
            <li key={componentData.id} className="shrink-0 md:shrink">
              {activeCategory === 'hooks' && (
                <Link
                  href={`/components/${componentData.category}/${componentData.id}`}
                >
                  <ButtonStyle
                    buttonEmoji={componentData.emoji}
                    buttonText={buttonText}
                    buttonActive={isActive}
                  />
                </Link>
              )}
              {activeCategory === 'tool' && (
                <Link href={`/tools/${activeCategory}/${componentData.id}`}>
                  <ButtonStyle
                    buttonEmoji={componentData.emoji}
                    buttonText={buttonText}
                    buttonActive={isActive}
                  />
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
