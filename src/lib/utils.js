import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function extractCreator(github) {
  return github.split('/')[3]
}

export async function readStream(stream) {
  const reader = stream.getReader()
  let chunks = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks += new TextDecoder().decode(value)
  }

  return chunks
}
