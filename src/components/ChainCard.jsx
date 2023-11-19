'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Copy } from 'lucide-react'

export default function ChainCard({ chainPost }) {
  return (
    <div className="group  relative block h-full w-full bg-white font-sans before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed  before:border-gray-900">
      <div className="h-full overflow-auto rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
        <div className="max-w-md overflow-auto p-4 sm:p-6 lg:p-4">
          {/* Top center: Name of chain and its logo */}
          {chainPost.docs ? (
            <Link href={chainPost.docs} target="_blank">
              <span class="absolute right-3 flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="whitespace-nowrap text-sm">Official</p>
              </span>
            </Link>
          ) : null}
          <div className="mb-6 mt-1 flex items-center justify-center gap-2 align-baseline ">
            <Image
              aria-hidden="true"
              src={chainPost.logo}
              alt={chainPost.title}
              width={32}
              height={32}
            />

            <h2 className="text-lg font-medium text-gray-900 sm:text-xl">
              {chainPost.title}
            </h2>
          </div>

          {/* 2nd row: Chain ID and Currency */}
          <div className="mt-4 flex justify-between px-12">
            <p className="sm:text-md flex flex-col items-center gap-2 text-sm">
              <span className="text-md font-semibold text-slate-600">
                ChainID
              </span>
              <span
                className="
                    overflow-hidden text-ellipsis text-lg font-bold text-slate-900
                    "
              >
                {chainPost.chainID}
              </span>
            </p>
            <p className="sm:text-md flex flex-col items-center gap-2 text-sm">
              <span className="text-md font-semibold text-slate-600">
                Currency
              </span>{' '}
              <span
                className="
                        text-lg font-bold text-slate-900
                        "
              >
                {chainPost.currency}
              </span>
            </p>
          </div>

          {/* 3rd row: Snippet with PoolManager and address of the pool manager */}
          <div className="overflow-none mt-4 flex w-full justify-between">
            <div className="sm:text-md flex w-full flex-col items-center gap-2 text-sm">
              <div class="flex w-[280px]  items-center justify-between rounded-md border border-gray-800 bg-white px-4 py-3 align-bottom font-mono text-sm text-gray-800">
                <div class="flex w-[90%] max-w-full items-center gap-1 overflow-auto">
                  <span className="text-md font-semibold text-slate-600">
                    PoolManager
                  </span>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {chainPost.poolManager}
                  </span>
                </div>
                <span
                  class="ml-2 cursor-pointer  text-gray-800 duration-200 hover:text-gray-400 active:text-gray-600 lg:ml-0
                  "
                >
                  <Copy
                    onClick={() => {
                      navigator.clipboard.writeText(chainPost.poolManager)
                    }}
                    width={20}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* 4th row: RPC Urls */}
        </div>
      </div>
    </div>
  )
}
