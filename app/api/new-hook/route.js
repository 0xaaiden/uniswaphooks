import { prisma } from '@lib/prisma'
import { readStream } from '@lib/utils'

export async function POST(req) {
  try {
    const bodyAsString = await readStream(req.body)
    const body = JSON.parse(bodyAsString)
    const { title, description, creator, website, github } = body

    const newHook = await prisma.component.create({
      data: {
        title,
        description,
        creator,
        website,
        github,
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Hook created successfully',
        data: newHook,
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
