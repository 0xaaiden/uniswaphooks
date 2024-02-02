import { prisma } from '@lib/prisma'
import { readStream } from '@lib/utils'

export async function POST(req) {
  try {
    const bodyAsString = await readStream(req.body)
    const body = JSON.parse(bodyAsString)
    let { title, description, creator, website, github, categoryId } = body

    if (!categoryId || categoryId === '') {
      categoryId = 'from-the-community'
    }

    const newHook = await prisma.hook.create({
      data: {
        title,
        description,
        creator,
        website,
        github,
        category: {
          connect: {
            id: categoryId,
          },
        },
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

export async function GET() {
  try {
    const hooks = await prisma.hook.findMany({
      include: {
        category: true,
      },
    })
    return new Response(
      JSON.stringify({
        message: 'Hooks fetched successfully',
        data: hooks,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (err) {
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
    const {
      id,
      title,
      description,
      creator,
      website,
      github,
      status,
      categoryId,
    } = body

    const updatedHook = await prisma.hook.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        creator,
        website,
        github,
        status,
        categoryId,
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Hook updated successfully',
        data: updatedHook,
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

    const deletedHook = await prisma.hook.delete({
      where: {
        id,
      },
    })

    return new Response(
      JSON.stringify({
        message: 'Hook deleted successfully',
        data: deletedHook,
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
