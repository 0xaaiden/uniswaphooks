'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import { cn } from '@lib/utils'
import { uploadFile } from '@lib/storage'

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@component/reusable/Command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@component/reusable/Popover'
import { Input } from '@component/reusable/Input'
import { Textarea } from '@component/reusable/Textarea'
import { Button } from '@component/reusable/Button'

import EmojiPicker from '@component/emoji-picker/EmojiPicker'

import { sections } from '@data/community-hub'

import { Check, ChevronsUpDown, SmilePlus } from 'lucide-react'

const formSchema = z.object({
  emoji: z.string().optional(),
  title: z.string(),
  section: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  resourceUrl: z.string(),
})

export default function NewResourceForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: '',
      title: '',
      section: '',
      description: '',
      imageUrl: 'https://placehold.co/400x400',
      resourceUrl: '',
    },
  })

  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [documentFile, setDocumentFile] = useState<File>()
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setDocumentFile(selectedFile)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.emoji) {
      values.emoji = sections.find((section) => section.id === values.section)
        ?.emoji
    }

    try {
      const result = await fetch('/api/resource', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const id = (await result.json()).data.id
      if (documentFile) {
        try {
          values.imageUrl = await uploadFile(
            documentFile,
            `/resources/${id}/image.png`
          )
          await fetch('/api/resource', {
            method: 'PUT',
            body: JSON.stringify({ ...values, id }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
        } catch (error) {
          console.log('Image upload error:', error)
          router.push('/error')
        }
      }

      router.push('/thank-you')

      await fetch('/api/mailer', {
        method: 'POST',
        body: JSON.stringify({ ...values, type: 'resources' }),
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
        <div className="grid sm:grid-cols-1 lg:grid-cols-6 lg:gap-4 ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="lg:col-span-5">
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="focus:outline-none">
                          {selectedEmoji ? (
                            <span className="text-2xl">{selectedEmoji}</span>
                          ) : (
                            <SmilePlus
                              className="h-6 w-6 text-gray-500"
                              role="button"
                            />
                          )}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full bg-transparent p-0">
                        <EmojiPicker
                          onSelect={(emoji) => {
                            setSelectedEmoji(emoji)
                            form.setValue('emoji', emoji)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      placeholder="Title of the educational resource..."
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Please provide the title of the educational resource.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Section <span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-full justify-between border-gray-500 text-left',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value &&
                          sections.find((section) => section.id === field.value)
                            ?.emoji}{' '}
                        {field.value
                          ? sections.find(
                            (section) => section.id === field.value
                          )?.title
                          : 'Choose a section'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search section..." />
                      <CommandEmpty>No section found.</CommandEmpty>
                      <CommandGroup>
                        {sections.map((section) => (
                          <CommandItem
                            key={section.id}
                            value={section.title}
                            onSelect={() => {
                              form.setValue('section', section.id)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === section.id
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {section.emoji} {section.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Please choose a section.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short description of the educational resource..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The content of the educational resource.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 lg:gap-4 ">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    id="imageUrl"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </FormControl>
                <FormDescription>
                  Please provide an image for the educational resource.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resourceUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Resource URL <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="URL of the educational resource..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide the URL of the educational resource.
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
