'use client'

import Link from 'next/link'

import { formatDistanceToNow } from 'date-fns'

import { ColumnDef } from '@tanstack/react-table'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@component/reusable/Tooltip'
import { Checkbox } from '@component/reusable/Checkbox'

import { Hook } from '@component/dashboard/data/schema'
import { Resource } from '@component/dashboard/data/schema'

import { statuses } from '@component/dashboard/data/data'
import { DataTableColumnHeader } from '@component/dashboard/components/ColumnHeader'
import { DataTableRowActions } from '@component/dashboard/components/RowActions'

export const columnsHook: ColumnDef<Hook>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hook ID" />
    ),
    cell: ({ row }) => <div>HOOK-{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'website',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link
            href={row.getValue('website')}
            target="_blank"
            className="max-w-[100px] truncate font-medium text-blue-600 hover:underline"
          >
            Website Link
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: 'github',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Github" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link
            target="_blank"
            href={row.getValue('github')}
            className="max-w-[150px] truncate font-medium text-blue-600 hover:underline"
          >
            Github Repository
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

export const columnsResource: ColumnDef<Resource>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Resource ID" />
    ),
    cell: ({ row }) => <div>RESOURCE-{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="text-muted-foreground mr-2 h-4 w-4" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      const relativeTime = formatDistanceToNow(date, { addSuffix: true })

      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>{relativeTime}</TooltipTrigger>
                <TooltipContent>{formattedDate}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
