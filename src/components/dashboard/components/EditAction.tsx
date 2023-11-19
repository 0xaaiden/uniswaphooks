import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useState, createElement } from 'react'

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@component/reusable/Select'
import { Input } from '@component/reusable/Input'
import { Button } from '@component/reusable/Button'
import { Textarea } from '@component/reusable/Textarea'

import { hookSchema } from '@component/dashboard/data/schema'
import { statuses } from '@component/dashboard/data/data'

const formSchema = z.object({
  id: z.number(),
  categoryId: z.string(),
  title: z.string(),
  description: z.string(),
  creator: z.string(),
  github: z.string().url(),
  website: z.string().url(),
  status: z.string(),
})

export default function EditAction(hook: z.infer<typeof hookSchema>) {
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        <Form>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={control}
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
                control={control}
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
                control={control}
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
              control={control}
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
                control={control}
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
                control={control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Link
                        target="_blank"
                        href={hook.website}
                        className="hover:underline hover:underline-offset-1"
                      >
                        Website
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={hook.website}
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
                control={control}
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