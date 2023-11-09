

import { useSession } from 'next-auth/react'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import UnauthentificationScreen from '@component/UnauthenticatedScreen'

export default function AuthentificationScreen() {
  const { data: session } = useSession()
  console.log(session)

  return (
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
  )
}
