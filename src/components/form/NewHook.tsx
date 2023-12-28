'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { extractCreator } from '@lib/utils'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@component/reusable/Form'
import { Button } from '@component/reusable/Button'
import { Input } from '@component/reusable/Input'
import { Textarea } from '@component/reusable/Textarea'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
  github: z.string().url(),
  website: z.string().url(),
})

export default function NewHookForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      github: '',
      website: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const creator = extractCreator(values.github)

    try {
      await fetch('/api/hook', {
        method: 'POST',
        body: JSON.stringify({ ...values, creator }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      router.push('/thank-you')

      await fetch('/api/mailer', {
        method: 'POST',
        body: JSON.stringify({ ...values, creator, type: 'hooks' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.log('Submission error:', error)
      router.push('/error')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hook name</FormLabel>
              <FormControl>
                <Input placeholder="Hook name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of your hook.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a description for your hook.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository</FormLabel>
                  <FormControl>
                    <Input placeholder="GitHub Repository URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the URL of your GitHub repository.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Website URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add the URL of your website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          className="inline-flex w-full items-center rounded-md border-2 border-current bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 hover:bg-white focus:outline-none focus:ring active:text-pink-500"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
