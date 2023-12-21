'use client'

import Link from 'next/link'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@component/reusable/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@component/reusable/DropdownMenu'

import {
  EditActionHook,
  EditActionResource,
} from '@component/dashboard/components/EditAction'
import {
  DeleteActionHook,
  DeleteActionResource,
} from '@component/dashboard/components/DeleteAction'

import { getUrl } from '@lib/get-url'

import { hookSchema } from '@component/dashboard/data/schema'
import { resourceSchema } from '@component/dashboard/data/schema'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  // @ts-ignore: Unreachable code error
  if (row.original.category?.category === 'hooks') {
    const hook = hookSchema.parse(row.original)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>
            <Link target="_blank" href={hook.github || '#'}>
              Open Hook
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              target="_blank"
              href={
                getUrl() +
                '/components/hooks/' +
                hook.categoryId +
                '#' +
                hook.id
              }
            >
              View
            </Link>
          </DropdownMenuItem>

          <EditActionHook {...hook} />

          <DropdownMenuSeparator />

          <DeleteActionHook {...hook} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  } else {
    const resource = resourceSchema.parse(row.original)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuItem>
            <Link target="_blank" href={resource.resourceUrl}>
              Open Resource
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              target="_blank"
              href={`/community-hub/${resource.section}#${resource.id}`}
            >
              View
            </Link>
          </DropdownMenuItem>
          <EditActionResource {...resource} />
          <DropdownMenuSeparator />
          <DeleteActionResource {...resource} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
