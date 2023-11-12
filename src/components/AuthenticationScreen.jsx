'use client'

import { useSession } from 'next-auth/react'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { DataTable } from '@component/dashboard/components/DataTable'
import UnauthentificationScreen from '@component/UnauthenticatedScreen'
import { columns } from '@component/dashboard/components/Columns'

const hooks = [
  {
    id: 1,
    title: 'Hook 1',
    description: 'Hook 1 description',
    creator: 'Hook 1 creator',
    website: 'Hook 1 website',
    github: 'Hook 1 github',
    status: 'todo',
  },
]

export default function AuthentificationScreen() {
  const { data: session } = useSession()

  if (!session && process.env.NODE_ENV !== 'development') {
    return (
      <>
        <Transition.Root show={true} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => {}}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-800/80" />
            </Transition.Child>

            <UnauthentificationScreen />
          </Dialog>
        </Transition.Root>
      </>
    )
  }

  return <DataTable data={hooks} columns={columns} />
}
