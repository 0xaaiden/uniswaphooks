'use client'

import { useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import PreviewCreator from '@component/PreviewCreator'
import PreviewCopy, {
  PreviewGithub,
  PreviewWebsite,
} from '@component/PreviewCopy'
import PreviewIframe from '@component/PreviewIframe'
import PreviewTitle from '@component/PreviewTitle'

export default function ComponentPreview({ componentData }) {
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
    description: componentDescription,
    github: componentGithub,
    website: componentWebsite,
    creator: componentCreator,
  } = componentData

  const componentHash = `component-${componentId}`

  return (
    <div
      ref={ref}
      id={componentTitle}
      className="max-w-md p-2"
    >
      <div className="space-y-2">
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

              <PreviewGithub repoUrl={componentGithub} />
              <PreviewWebsite websiteUrl={componentWebsite} />
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
