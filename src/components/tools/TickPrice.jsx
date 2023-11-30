'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@component/reusable/Select'
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
import { FaEquals } from 'react-icons/fa'

const formSchema = z.object({
  tokenOne: z.string(),
  tokenTwo: z.string(),
  tick: z.string(),
})

export default function TickPrice() {
  const [calculatedPrice, setCalculatedPrice] = useState()
  const { handleSubmit, control, value } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenOne: '18',
      tokenTwo: '18',
    },
  })

  async function onSubmit(values) {
    const univ3prices = require('@thanpolas/univ3prices')

    const price = univ3prices
      .tickPrice([values.tokenOne, values.tokenTwo], values.tick)
      .toAuto()
    setCalculatedPrice(price)
  }

  return (
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
                  <Input autoComplete="off" placeholder="18.." {...field} />
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
                  <Input autoComplete="off" placeholder="18.." {...field} />
                </FormControl>
                <FormDescription>Token Two Decimals.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tick"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold text-slate-600">
                  Tick
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="A very large number.."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Tick Price in Q128 format.</FormDescription>
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
  )
}
