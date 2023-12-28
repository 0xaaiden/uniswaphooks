'use client'

export function getUrl() {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_DEV_URL
  } else if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_PROD_URL
  } else {
    return process.env.NEXT_PUBLIC_PREVIEW_URL
  }
}
