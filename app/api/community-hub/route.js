import { prisma } from '@lib/prisma'
import { readStream } from '@lib/utils'

export async function POST(req) {
  try {
    const bodyAsString = await readStream(req.body)
    const body = JSON.parse(bodyAsString)
    const { title, section, authorName, authorLink, mdxContent } = body

    const newResource = await prisma.educationalresource.create({
      data: {
        title,
        section,
        authorName,
        authorLink,
        mdxContent,
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Resource created successfully',
        data: newResource,
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
