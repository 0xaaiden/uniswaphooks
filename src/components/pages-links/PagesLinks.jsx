import Link from 'next/link'
import ButtonStyle from '@component/ButtonStyle'

export default async function PagesLinks({ componentsData }) {
  return (
    <div>
      <ul className="-mt-6 flex flex-wrap gap-2 py-4">
        {componentsData.map((componentData) => {
          const buttonText = componentData.count
            ? `${componentData.title} (${componentData.count})`
            : componentData.title

          return (
            <li key={componentData.id} className="shrink-0 md:shrink">
              <Link href={`${componentData.href}`}>
                <ButtonStyle
                  buttonEmoji={componentData.emoji}
                  buttonText={buttonText}
                  buttonActive={componentData.active}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
