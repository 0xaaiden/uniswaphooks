import Link from 'next/link'
import Image from 'next/image'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, createElement, ChangeEvent } from 'react'
import * as z from 'zod'

import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@component/reusable/Dialog'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@component/reusable/Select'
import { Input } from '@component/reusable/Input'
import { Button } from '@component/reusable/Button'
import { Textarea } from '@component/reusable/Textarea'

import EmojiPicker from '@component/emoji-picker/EmojiPicker'

import { hookSchema } from '@component/dashboard/data/schema'
import { resourceSchema } from '@component/dashboard/data/schema'
import { statuses } from '@component/dashboard/data/data'

import { Check, ChevronsUpDown, SmilePlus } from 'lucide-react'
import { sections } from '@data/community-hub'

import { uploadFile } from '@lib/storage'
import { cn } from '@lib/utils'

const formSchemaHook = z.object({
  id: z.number(),
  categoryId: z.string(),
  title: z.string(),
  description: z.string(),
  creator: z.string(),
  github: z.string().url(),
  website: z.string().url(),
  status: z.string(),
})

const formSchemaResource = z.object({
  id: z.number(),
  emoji: z.string(),
  title: z.string(),
  description: z.string(),
  section: z.string(),
  resourceUrl: z.string(),
  imageUrl: z.string(),
  status: z.string(),
})

export function EditActionHook(hook: z.infer<typeof hookSchema>) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchemaHook>>({
    resolver: zodResolver(formSchemaHook),
    defaultValues: {
      id: hook.id,
      categoryId: hook.categoryId,
      title: hook.title,
      description: hook.description,
      creator: hook.creator,
      github: hook.github,
      website: hook.website,
      status: hook.status,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchemaHook>) {
    setIsLoading(true)
    values.id = hook.id

    try {
      await fetch('/api/hook', {
        method: 'PUT',
        body: JSON.stringify(values),
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="m-0">
        <Button variant="ghost" className="pl-2 font-normal">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="">
          <DialogTitle>Edit hook</DialogTitle>
          <DialogDescription>
            Make changes to the hook, then save your changes.
          </DialogDescription>
        </DialogHeader>

        {/* @ts-ignore: It is really a random error of spreading. */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hook.categories.map((category) => (
                        <SelectItem value={category.id}>
                          {category.emoji}
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 space-x-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={hook.title}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the title of the hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Creator</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={hook.creator}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the name of the creator.
                    </FormDescription>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={hook.description}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the description of the hook.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 space-x-2">
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Link
                        target="_blank"
                        href={hook.github}
                        className="hover:underline hover:underline-offset-1"
                      >
                        Github
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={hook.github}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the public github repository.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Link
                        target="_blank"
                        href={hook.website || '#'}
                        className="hover:underline hover:underline-offset-1"
                      >
                        Website
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={hook.website || '#'}
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the website of the hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex w-full justify-between">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center space-x-2">
                              <span className="mr-8">
                                {status.icon && createElement(status.icon)}
                              </span>
                              <span>{status.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <Button
                  disabled={true}
                  className="flex w-full items-center justify-center "
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait ...
                </Button>
              ) : (
                <Button type="submit">Save changes</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export function EditActionResource(resource: z.infer<typeof resourceSchema>) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchemaResource>>({
    resolver: zodResolver(formSchemaResource),
    defaultValues: {
      id: resource.id,
      emoji: resource.emoji,
      title: resource.title,
      description: resource.description,
      section: resource.section,
      imageUrl: resource.imageUrl,
      resourceUrl: resource.resourceUrl,
      status: resource.status,
    },
  })

  const [selectedEmoji, setSelectedEmoji] = useState(null)
  const [documentFile, setDocumentFile] = useState<File>()
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setDocumentFile(selectedFile)
  }

  async function onSubmit(values: z.infer<typeof formSchemaResource>) {
    setIsLoading(true)
    try {
      if (documentFile) {
        values.imageUrl = await uploadFile(
          documentFile,
          `resources/${values.id}/image.png`
        )
      }

      await fetch('/api/resource', {
        method: 'PUT',
        body: JSON.stringify(values),
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="m-0">
        <Button variant="ghost" className="pl-2 font-normal">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="">
          <DialogTitle>Edit resource</DialogTitle>
          <DialogDescription>
            Make changes to the resource, then save your changes.
          </DialogDescription>
        </DialogHeader>

        {/* @ts-ignore: It is really a random error of spreading. */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-4 space-x-2">
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
                                <span className="text-2xl">
                                  {selectedEmoji}
                                </span>
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
                    <FormLabel>Section</FormLabel>
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
                              sections.find(
                                (section) => section.id === field.value
                              )?.emoji}{' '}
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={resource.description}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the description of the resource.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 space-x-2">
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

              <Image
                src={`${resource.imageUrl}?${Date.now()}}`}
                width={50}
                height={50}
                alt={resource.title}
              />
            </div>

            <FormField
              control={form.control}
              name="resourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Link
                      target="_blank"
                      href={resource.resourceUrl}
                      className="hover:underline hover:underline-offset-1"
                    >
                      Resource URL
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={resource.resourceUrl}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the URL of the resource.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex w-full justify-between">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center space-x-2">
                              <span className="mr-8">
                                {status.icon && createElement(status.icon)}
                              </span>
                              <span>{status.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isLoading ? (
                <Button
                  disabled={true}
                  className="flex w-full items-center justify-center "
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait ...
                </Button>
              ) : (
                <Button type="submit">Save changes</Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
