import { useState } from 'react'

import { hookSchema } from '@component/dashboard/data/schema'
import * as z from 'zod'

import { Loader2 } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@component/reusable/AlertDialog'
import { Button } from '@component/reusable/Button'

export default function DeleteAction(hook: z.infer<typeof hookSchema>) {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit() {
    setIsLoading(true)

    try {
      await fetch('/api/hook', {
        method: 'DELETE',
        body: JSON.stringify({ id: hook.id }),
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="pl-2 font-normal">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the hook, and there is no undo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onSubmit()}
            className="bg-red-500 hover:bg-red-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait ...
              </>
            ) : (
              <>Delete</>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
