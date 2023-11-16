'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'

import Fuse from 'fuse.js'

export default function HeaderSearch() {
  const routerPathname = usePathname()

  const refDropdown = useRef(null)

  const [showDropdown, setShowDropdown] = useState(false)
  const [initialResults, setInitialResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryDebounced, setSearchQueryDebounced] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [fuse, setFuse] = useState(null)

  const fuseOptions = {
    includeScore: true,
    keys: ['title'],
  }

  useEffect(() => {
    const getSearchResults = async () => {
      const searchResults = await fetchSearchResults()
      const fuseInstance = new Fuse(searchResults, fuseOptions)
      setFuse(fuseInstance)
      setInitialResults(searchResults)
    }

    getSearchResults()
  }, [])

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(initialResults.slice(0, 4))
      return
    }

    if (fuse) {
      const filteredResults = fuse
        .search(searchQuery.trim())
        .map((result) => result.item)
        .slice(0, 4)
      setSearchResults(filteredResults)
    }
  }, [searchQueryDebounced, fuse])

  useEffect(() => {
    setSearchQuery('')
    setShowDropdown(false)
  }, [routerPathname])

  useClickAway(refDropdown, () => setShowDropdown(false))

  useDebounce(() => setSearchQueryDebounced(searchQuery), 500, [searchQuery])

  async function fetchSearchResults() {
    const searchResults = await fetch('/api/hook', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const searchJson = await searchResults.json()
    const publishedSearchJson = searchJson.data.filter(
      (item) => item.status === 'published'
    )

    return publishedSearchJson
  }

  return (
    <div ref={refDropdown} className="relative flex h-16 items-center py-8">
      <form role="search" className="w-full sm:max-w-none">
        <label htmlFor="SiteSearch" className="sr-only">
          Search
        </label>

        <input
          type="text"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          onFocus={() => setShowDropdown(true)}
          value={searchQuery}
          placeholder="Search..."
          id="SiteSearch"
          autoComplete="off"
          className="w-full rounded-md border-gray-500 text-sm"
        />

        <button tabIndex={-1} className="sr-only">
          Submit
        </button>
      </form>

      {showDropdown && (
        <div className="absolute right-0 top-14 z-50 w-full rounded-lg border border-gray-100 bg-white shadow-lg">
          {searchResults.length ? (
            <ul className="max-h-64 space-y-1 overflow-auto p-2">
              {searchResults.map((searchResult) => (
                <li key={searchResult.id}>
                  <Link target="_blank" href={searchResult.github}>
                    <div className="flex items-center justify-between rounded-md px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:bg-gray-50">
                      <span>{searchResult.title}</span>

                      <span className="block rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white">
                        {searchResult.categoryId}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              Uh-no! There are no results 😢
            </div>
          )}
        </div>
      )}
    </div>
  )
}
