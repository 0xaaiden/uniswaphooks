'use client'

import Link from 'next/link'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@component/reusable/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@component/reusable/DropdownMenu'

import EditAction from '@component/dashboard/components/EditAction'
import DeleteAction from '@component/dashboard/components/DeleteAction'

import { hookSchema } from '@component/dashboard/data/schema'
import { statuses } from '@component/dashboard/data/data'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
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
          <Link target="_blank" href={hook.github}>
            View
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* @ts-ignore: It is really a random error of spreading. */}
        <EditAction {...hook} />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={hook.title}>
              {statuses.map((status) => (
                <DropdownMenuRadioItem key={status.value} value={status.value}>
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />

        {/* @ts-ignore: It is really a random error of spreading. */}
        <DeleteAction {...hook} />
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
