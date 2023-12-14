'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@lib/utils'

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
import TipTap from '@component/reusable/TipTap'

import { sections } from '@data/community-hub'

import { Check, ChevronsUpDown } from 'lucide-react'

const formSchema = z.object({
  title: z.string(),
  section: z.string(),
  authorName: z.string(),
  authorLink: z.string().url(),
  mdxContent: z.string(),
})

export default function NewResourceForm() {
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      section: '',
      authorName: '',
      authorLink: '',
      mdxContent: '# f',
    },
  })

  async function onSubmit(values) {
    console.log(values)
  }

  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid sm:grid-cols-1 lg:grid-cols-6 lg:gap-4 ">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="lg:col-span-5">
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title of the educational resource..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide the title of the educational resource.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
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
                          'w-full justify-between',
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
                              setValue('section', section.id)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                section.id === field.value
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
          control={control}
          name="mdxContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Textarea
                    placeholder="Description of the educational resource... Use Markdown to format your text."
                    {...field}
                  />
                  <TipTap value={field.value} onChange={field.onChange()} />
                </>
              </FormControl>
              <FormDescription>
                The content of the educational resource in MDX format.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
