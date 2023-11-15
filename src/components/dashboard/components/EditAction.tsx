import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { Input } from '@component/reusable/Input'
import { Button } from '@component/reusable/Button'
import { Textarea } from '@component/reusable/Textarea'

import { hookSchema } from '@component/dashboard/data/schema'

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  creator: z.string(),
  github: z.string().url(),
  website: z.string().url(),
  status: z.enum(['published', 'accepted', 'pending', 'canceled']),
  category: z.string(),
})

export default function EditAction(hook: z.infer<typeof hookSchema>) {
  console.log(hook)
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: hook.title ?? '',
      description: hook.description ?? '',
      creator: hook.creator ?? '',
      github: hook.github ?? '',
      website: hook.website ?? '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="m-0">
        <Button variant="ghost" className="pl-2">
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
            <div className="flex gap-4 space-x-2">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hook title</FormLabel>
                    <FormControl>
                      <Input placeholder={hook.title} {...field} />
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
                      <Input placeholder={hook.creator} {...field} />
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
                    <Textarea placeholder={hook.description} {...field} />
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
                      <Input placeholder={hook.github} {...field} />
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
                      <Input placeholder={hook.website} {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the website of the hook.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
