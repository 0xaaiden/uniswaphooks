import { useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import {
  componentPreviewHtml,
  componentPreviewJsx,
  componentPreviewVue,
} from '@util/transformers'

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

// -  const [componentCode, setComponentCode] = useState('')
//   const [componentHtml, setComponentHtml] = useState('')
//   const [componentJsx, setComponentJsx] = useState('')
//   const [componentVue, setComponentVue] = useState('')
//   const [isDarkMode, setIsDarkMode] = useState(false)
//   const [isInteractive, setIsInteractive] = useState(false)
//   const [isRtl, setIsRtl] = useState(false)
  // const [previewCode, setPreviewCode] = useState('')
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

  // useEffect(() => {
  //   if (inView) {
  //     fetchHtml({
  //       useDark: isDarkMode,
  //     })
  //   }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inView])

  // useEffect(() => {
  //   if (inView) {
  //     fetchHtml({
  //       useDark: isDarkMode,
  //       useInteractive: isInteractive,
  //     })
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isDarkMode, isInteractive])

  // useEffect(() => {
  //   if (inView) {
  //     const transformedHtml = componentPreviewHtml(
  //       componentCode,
  //       trueComponentContainer,
  //       isDarkMode,
  //       isRtl
  //     )

  //     setComponentHtml(transformedHtml)
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isRtl])

  // async function fetchHtml(useOptions = {}) {
  //   const { useDark, useInteractive } = useOptions

  //   const useDarkMode = componentHasDark && useDark
  //   const useInteractiveMode = componentHasInteractive && useInteractive

  //   const componentPath = [
  //     componentId,
  //     useDarkMode && 'dark',
  //     useInteractiveMode && 'interactive',
  //   ]
  //     .filter(Boolean)
  //     .join('-')

  //   const componentUrl = `/components/${componentCategory}-${componentSlug}/${componentPath}.html`

  //   const fetchResponse = await fetch(componentUrl)
  //   const textResponse = await fetchResponse.text()
  //   const transformedHtml = componentPreviewHtml(
  //     textResponse,
  //     trueComponentContainer,
  //     useDark,
  //     isRtl
  //   )
  //   const transformedJsx = componentPreviewJsx(textResponse)
  //   const transformedVue = componentPreviewVue(textResponse)

  //   // setPreviewCode(textResponse)
  //   setComponentCode(textResponse)
  //   setComponentHtml(transformedHtml)
  //   setComponentJsx(transformedJsx)
  //   setComponentVue(transformedVue)
  // }

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
              {/* <PreviewView
                handleSetShowPreview={setShowPreview}
                showPreview={showPreview}
              /> */}

              <PreviewCopy componentCode={componentTitle + "\n" + componentDescription} />
              {/* if github is not empty */}
              {componentGithub.length > 1 && (
                                <PreviewGithub repoUrl={componentGithub} />
              )
                }

                {
                  componentWebsite.length > 1 && (
                    <PreviewWebsite websiteUrl={componentWebsite} />
                  )
                }
              {/* <PreviewWebsite componentSlug={componentSlug} /> */}

              {/* {componentHasDark && (
                <PreviewDark
                  isDarkMode={isDarkMode}
                  handleSetIsDarkMode={setIsDarkMode}
                />
              )} */}

            

              {/* <PreviewRtl isRtl={isRtl} handleSetIsRtl={setIsRtl} /> */}
            </div>
          )}
        </div>

        <div className="relative">
          <div>
            <PreviewIframe
              showPreview={showPreview}
              // componentHtml={componentHtml}
              componentTitle={componentTitle}
              componentDescription={componentDescription}
              componentCreator={componentCreator}
              previewWidth={previewWidth}
              refIframe={refIframe}
              // previewDark={componentHasDark && isDarkMode}
            />

      
          </div>
        </div>

        {componentCreator && (
          <PreviewCreator creatorGithub={componentCreator} creatorWebsite={componentWebsite} />
        )}
      </div>
    </div>
  )
}
