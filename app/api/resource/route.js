import { prisma } from '@lib/prisma'
import { readStream } from '@lib/utils'

export async function POST(req) {
  try {
    const bodyAsString = await readStream(req.body)
    const body = JSON.parse(bodyAsString)
    const { emoji, title, section, description, imageUrl, resourceUrl } = body

    const newResource = await prisma.resource.create({
      data: {
        emoji,
        title,
        section,
        description,
        imageUrl,
        resourceUrl,
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

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Resources fetched successfully',
        data: resources,
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

export async function PUT(req) {
  try {
    const bodyAsString = await readStream(req.body)
    const body = JSON.parse(bodyAsString)
    const { id, emoji, title, section, description, imageUrl, resourceUrl, status } =
      body

    const updatedResource = await prisma.resource.update({
      where: {
        id,
      },
      data: {
        emoji,
        title,
        section,
        description,
        imageUrl,
        resourceUrl,
        status,
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Resource updated successfully',
        data: updatedResource,
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

export async function DELETE(req) {
  try {
    const bodyAsString = await readStream(req.body)
    const body = JSON.parse(bodyAsString)
    const { id } = body

    const deletedResource = await prisma.resource.delete({
      where: {
        id,
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Resource deleted successfully',
        data: deletedResource,
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
