
import ShowMoreText from "react-show-more-text";

export default function PreviewIframe({
  showPreview,
  componentTitle,
  componentCreator,
  componentDescription,
  previewWidth = '100%',
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
      {/* <iframe
        className={`h-[400px] w-full rounded-lg ring-2 ring-gray-900 lg:h-[600px] lg:transition-all ${iframeTheme}`}
        loading="lazy"
        srcDoc={componentHtml}
        style={{ maxWidth: previewWidth }}
        title={`${componentTitle} Component`}
        ref={refIframe}
      ></iframe> */}

      {/* /Preview Title description, linkk etc */}
      <div
        className={`${iframeTheme} space-between mt-4 flex min-h-[200px] w-full rounded-lg ring-2 ring-gray-900 lg:transition-all`}
      >
        <div className="items-left  m-4 ml-4 flex flex-col  gap-2 w-4/5">
          <a
            href={`#${componentTitle}`}
            className="text-xl font-medium text-black"
          >
            {componentTitle}
            <div className="text-md align-start flex">

            <span className="text-sm font-medium text-gray-600
            ">
              {componentCreator}
            </span>
          </div>
          </a>
          {/* Owner */}
          
          {/* Description */}
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
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                // onClick={this.executeOnClick}
                expanded={false}
                // width={"100%"}
                truncatedEndingComponent={"... "}
            >
              {componentDescription}
            </ShowMoreText>            
             </span>
          </div>
          {/* <div
            className="text-md align-center flex text-gray-900"
            // dangerouslySetInnerHTML={{ __html: componentHtml }}
          >
            <span
              aria-hidden="true"
              role="img"
              className="text-sm text-gray-900"
            >
              🔗
            </span>
            <span className="text-md font-medium text-gray-900">
              Link to component
            </span>
          </div> */}
          {/* Link to component */}
        </div>
        {/* Link to component */}
      </div>
    </div>
  )
}
