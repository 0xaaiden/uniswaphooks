'use client'

import * as z from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

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

import CopyOutput from '@component/tools/CopyOutput'
import { FaGithub, FaEquals } from 'react-icons/fa'

const formSchema = z.object({
  tokenOne: z.string(),
  tokenTwo: z.string(),
  sqrtPrice: z.string(),
})

export default function ToolCard(toolPost) {
  const [calculatedPrice, setCalculatedPrice] = useState('')
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values) {
    const univ3prices = require('@thanpolas/univ3prices')

    const price = univ3prices(
      [values.tokenOne, values.tokenTwo],
      values.sqrtPrice
    ).toAuto()

    setCalculatedPrice(price)
  }

  return (
    <div className="group relative block h-full w-full bg-white font-sans before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
      <div className="h-full overflow-auto rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
        <div className="overflow-auto p-4 sm:p-6 lg:p-10">
          {/*           {toolPost.docs ? (
            <Link href={toolPost.docs} target="_blank">
              <span class="absolute right-3 flex items-center justify-center rounded-full px-2.5 py-0.5">
                <p class="hidden whitespace-nowrap pr-2 text-sm hover:font-semibold hover:underline hover:underline-offset-1 sm:inline-block">
                  Github
                </p>
                <FaGithub />
              </span>
            </Link>
          ) : null} */}

          <h2 className="flex items-center justify-center text-lg font-medium text-gray-900 sm:text-xl">
            {toolPost.title}
          </h2>

          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 flex flex-col justify-between gap-6 px-4 sm:flex-row sm:px-8 md:px-12 lg:px-80">
                <FormField
                  control={control}
                  name="tokenOne"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-slate-600">
                        Token One
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="18.."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Token One Decimals.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="tokenTwo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-slate-600">
                        Token Two
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="18.."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Token Two Decimals.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="sqrtPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-semibold text-slate-600">
                        Square Root Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="A very large number.."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the Square Root Price.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="flex items-center justify-center gap-4">
                  <Button type="submit" className="p-6">
                    <FaEquals />
                  </Button>
                  <div className="flex items-center justify-between rounded-md border border-gray-800 bg-white px-4 py-3 font-mono text-sm text-gray-800">
                    <div className="flex items-center gap-1 overflow-auto">
                      <span className="text-md font-semibold text-slate-600">
                        Price
                      </span>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {calculatedPrice
                          ? calculatedPrice.length > 15
                            ? `${calculatedPrice.substring(0, 15)}...`
                            : calculatedPrice
                          : '0'}
                      </span>
                    </div>
                    <span className="ml-2 cursor-pointer text-gray-800 duration-200 hover:text-gray-400 active:text-gray-600">
                      <CopyOutput value={calculatedPrice} />
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
