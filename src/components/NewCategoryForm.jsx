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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@component/reusable/Select'
import { Button } from '@component/reusable/Button'
import { Input } from '@component/reusable/Input'

const formSchema = z.object({
  title: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
  emoji: z.string().nonempty(),
  tag: z.string().min(3).max(50),
})

export default function NewcategoryForm() {
  const router = useRouter()
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: 'hooks',
      emoji: '',
      tag: '',
    },
  })

  async function onSubmit(values) {
    values.id = values.title.replace(/\s+/g, '-').toLowerCase()

    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      router.push('/thank-you')
    } catch (error) {
      console.log('Submission error:', error)
      router.push('/error')
    }
  }

  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex space-x-4">
          <FormField
            control={control}
            name="emoji"
            render={({ field }) => (
              <FormItem className="mt-3 flex w-60 flex-col">
                <FormLabel>Emoji</FormLabel>
                <FormControl>
                  <Input placeholder="Emoji" {...field} />
                </FormControl>
                <FormDescription>Emoji for your category.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category title</FormLabel>
                <FormControl>
                  <Input placeholder="Category title" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the title of your category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem className="mt-3 flex w-60 flex-col">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hooks">Hooks</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Please select the category for your hook.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="tag"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input placeholder="Tag" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the tag for your category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
