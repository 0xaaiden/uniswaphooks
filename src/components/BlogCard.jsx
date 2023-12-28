'use client'

import Link from 'next/link'
import ShowMoreText from 'react-show-more-text'

import { Badge } from '@component/reusable/Badge'

export default function BlogCard({ blogPost }) {
  if (blogPost.tag === 'community') {

    return (
      <Link target="_blank" href={blogPost.resourceUrl}>
        <section
          id={blogPost.id}
          className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900"
        >
          <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="mt-16 sm:mt-20 lg:mt-24">
                <span
                  aria-hidden="true"
                  role="img"
                  className="first-letter-only text-3xl sm:text-4xl"
                >
                  {blogPost.emoji}
                </span>

                <h2 className="mt-4 text-lg font-medium text-gray-900 sm:text-xl">
                  {blogPost.title}
                </h2>

                <ShowMoreText
                  lines={3}
                  more="Show more"
                  less="Show less"
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent={'... '}
                >
                  {blogPost.description}
                </ShowMoreText>

                <Badge
                  className="mt-4"
                >
                  # {blogPost.section}
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </Link>
    )
  } else {
    return (
      <>
        {blogPost.tag === 'blog' && (
          <Link href="/blog/[slug]" as={`/blog/${blogPost.slug}`}>
            <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
              <div className="h-full rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="mt-16 sm:mt-20 lg:mt-24">
                    <span
                      aria-hidden="true"
                      role="img"
                      className="text-3xl sm:text-4xl"
                    >
                      {blogPost.emoji}
                    </span>

                    <h2 className="mt-4 text-lg font-medium text-gray-900 sm:text-xl">
                      {blogPost.title}
                    </h2>

                    <time className="mt-1 text-xs text-gray-700">
                      {blogPost.date}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
      </>
    )
  }
}
