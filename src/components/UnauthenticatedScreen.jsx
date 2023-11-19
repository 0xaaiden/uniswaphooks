import { Fragment } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Dialog, Transition } from '@headlessui/react'

import { signIn } from 'next-auth/react'

import { Button } from '@component/reusable/Button'

export default function UnauthentificationScreen() {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Sign in
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Login with your Google account, to access the dashboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <Button
                className="inline-flex w-full justify-center"
                onClick={async () => {
                  await signIn('google')
                }}
              >
                <FaGoogle className="mr-2 h-4 w-4" /> Login with Google
              </Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}