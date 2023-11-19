'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { DataTable } from '@component/dashboard/components/DataTable'
import { columns } from '@component/dashboard/components/Columns'

import UnauthentificationScreen from '@component/UnauthenticatedScreen'

export default function AuthentificationScreen() {
  const { data: session } = useSession()
  const [hooksData, setHooksData] = useState([])

  useEffect(() => {
    Promise.all([
      fetch('/api/category', { method: 'GET' }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }),
      fetch('/api/hook', { method: 'GET' }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      }),
    ])
      .then(([categoriesResponse, hooksResponse]) => {
        const categoriesData = categoriesResponse.data
        const hooksData = hooksResponse.data

        const hooksWithCategories = hooksData.map((hook) => ({
          ...hook,
          categories: categoriesData,
        }))

        setHooksData(hooksWithCategories)
      })
      .catch((error) => {
        console.error('Fetch error:', error)
      })
  }, [])

  if (!session && process.env.NODE_ENV === 'developmenet') {
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

  return (
    <div className="px-20 py-20">
      <DataTable data={hooksData} columns={columns} />
    </div>
  )
}