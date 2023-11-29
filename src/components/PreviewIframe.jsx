import Link from 'next/link'
import ShowMoreText from 'react-show-more-text'

export default function PreviewIframe({
  showPreview,
  componentTitle,
  componentCreator,
  componentDescription,
  previewDark,
}) {
  const iframeTheme = previewDark ? 'bg-gray-950' : 'bg-white'

  return (
    <div
      {...(!showPreview && {
        hidden: true,
      })}
      className="rounded-lg bg-white bg-[linear-gradient(45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(-45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgb(249_250_251)_75%),_linear-gradient(-45deg,_transparent_75%,_rgb(249_250_251)_75%)] bg-[length:_20px_20px] [background-position:_0_0,_0_10px,_10px_-10px,_-10px_0px] "
    >
      <div
        className={`${iframeTheme} space-between mt-4 flex min-h-[200px] w-full rounded-lg ring-2 ring-gray-900 lg:transition-all`}
      >
        <div className="items-left m-4 ml-4 flex w-4/5 flex-col gap-2">
          <Link
            href={`#${componentTitle}`}
            className="text-xl font-medium text-black no-underline"
          >
            {componentTitle}
            <div className="text-md align-start flex">
              <span
                className="text-sm font-medium text-gray-600
            "
              >
                {componentCreator}
              </span>
            </div>
          </Link>

          <div className="text-md align-start flex gap-1">
            <span
              aria-hidden="true"
              role="img"
              className="text-md text-gray-900"
            >
              📖
            </span>
            <span className="text-md font-medium text-gray-900 ">
              <ShowMoreText
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                expanded={false}
                truncatedEndingComponent={'... '}
              >
                {componentDescription}
              </ShowMoreText>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
