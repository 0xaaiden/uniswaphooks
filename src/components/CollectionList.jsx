'use client'

import ComponentPreview from '@component/ComponentPreview'

export default function CollectionList({ componentsData, componentContainer }) {

  return (
    <div className="not-prose mx-auto">
      <ul className="grid grid-cols-1 items-end gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:max-w-[1348px]">
        {componentsData.map((componentData) => (
          <li key={componentData.id}>
            <ComponentPreview
              componentData={componentData}
              componentContainer={componentContainer}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
