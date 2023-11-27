import SquareRootPrice from '@component/tools/SquareRootPrice'
import TickPrice from '@component/tools/TickPrice'

import { FaGithub } from 'react-icons/fa'

export default function ToolCard({ toolPost, params }) {
  return (
    <div className="group relative block h-full w-full bg-white font-sans before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
      <div className="h-full overflow-auto rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
        <div className="overflow-auto p-4 sm:p-6 lg:p-10">
          {/*           {toolPost.docs ? (
            <Link href={toolPost.docs} target="_blank">
              <span class="absolute right-3 flex items-center justify-center rounded-full px-2.5 py-0.5">
                <p class="hidden whitespace-nowrap pr-2 text-sm hover:font-semibold hover:underline hover:underline-offset-1 sm:inline-block">
                  Github
                </p>
                <FaGithub />
              </span>
            </Link>
          ) : null} */}

          <h2 className="flex items-center justify-center text-lg font-medium text-gray-900 sm:text-xl">
            {toolPost.title}
          </h2>

          {params.toolId === 'square-root-price' && <SquareRootPrice />}
          {params.toolId === 'tick-price' && <TickPrice />}

        </div>
      </div>
    </div>
  )
}
