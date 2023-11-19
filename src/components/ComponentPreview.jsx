import { useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import PreviewCreator from '@component/PreviewCreator'
import PreviewCopy, {
  PreviewGithub,
  PreviewWebsite,
} from '@component/PreviewCopy'
import PreviewIframe from '@component/PreviewIframe'
import PreviewTitle from '@component/PreviewTitle'

export default function ComponentPreview({
  componentData,
  componentContainer,
}) {
  const refIframe = useRef(null)

  const [previewWidth, setPreviewWidth] = useState('100%')
  const [showPreview, setShowPreview] = useState(true)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const {
    id: componentId,
    title: componentTitle,
    slug: componentSlug,
    category: componentCategory,
    description: componentDescription,
    github: componentGithub,
    website: componentWebsite,
    container: componentSpace,
    creator: componentCreator,
    dark: componentHasDark,
    interactive: componentHasInteractive,
  } = componentData

  const trueComponentContainer = componentSpace
    ? componentSpace
    : componentContainer

  const componentHash = `component-${componentId}`

  return (
    <div ref={ref} id={componentTitle}>
      <div className="space-y-4">
        <PreviewTitle
          componentTitle={componentTitle}
          componentHash={componentHash}
        />

        <div className="lg:flex lg:items-end">
          {true && (
            <div className="flex flex-wrap items-end gap-2">
              <PreviewCopy
                componentCode={componentTitle + '\n' + componentDescription}
              />

              {componentGithub.length > 1 && (
                <PreviewGithub repoUrl={componentGithub} />
              )}

              {componentWebsite.length > 1 && (
                <PreviewWebsite websiteUrl={componentWebsite} />
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <div>
            <PreviewIframe
              showPreview={showPreview}
              componentTitle={componentTitle}
              componentDescription={componentDescription}
              componentCreator={componentCreator}
              previewWidth={previewWidth}
              refIframe={refIframe}
            />
          </div>
        </div>

        {componentCreator && (
          <PreviewCreator
            creatorGithub={componentCreator}
            creatorWebsite={componentWebsite}
          />
        )}
      </div>
    </div>
  )
}
