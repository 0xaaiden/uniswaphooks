import { prisma } from '@lib/prisma'
import { readStream } from '@lib/utils'

export async function POST(req) {
  try {
    const bodyAsString = await readStream(req.body)
    const body = JSON.parse(bodyAsString)
    const { id, title, description, category, emoji, tag } = body

    const newCategory = await prisma.category.create({
      data: {
        id,
        title,
        description,
        category,
        emoji,
        tag,
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Category created successfully',
        data: newCategory,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
    console.log(err)
    return new Response(
      JSON.stringify({
        message: 'Something went wrong',
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return new Response(
      JSON.stringify({
        message: 'Categories fetched successfully',
        data: categories,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
    console.log(err)
    return new Response(
      JSON.stringify({
        message: 'Something went wrong',
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
