import { ImageResponse } from 'next/og'
export const runtime = 'edge'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get('title')
    console.log(title)
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            backgroundColor: 'white',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              fontSize: 50,
              letterSpacing: -2,
              fontWeight: 700,
              textAlign: 'center',
              fontFamily: 'Inter, "Material Icons"',
            }}
          >
            <div
              style={{
                backgroundImage:
                  'linear-gradient(90deg, rgb(0, 0, 0), rgb(255, 0, 128))',
                backgroundClip: 'text',
                '-webkit-background-clip': 'text',
                color: 'transparent',
              }}
            >
              Uniswap v4 Hooks
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '30px',
            }}
          >
            <img
              width="200"
              src={`https://storage.googleapis.com/ethglobal-api-production/organizations%2F026zc%2Fimages%2FUniswap-Foundation-Primary-Logo_Flickr-Pink.svg`}
            />
          </div>
        </div>
      ),

      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
