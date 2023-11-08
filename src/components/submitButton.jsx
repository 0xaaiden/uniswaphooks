'use client'

import Link from 'next/link'
import { emojisplosion } from 'emojisplosion'

export default function SubmitButton() {
  const handleClick = () => {
    const element = document.getElementById('submit-button')
    setTimeout(() => {}, 500)
    let cumulativeOffset = function (element) {
      var top = 0,
        left = 0
      do {
        top += element.offsetTop || 0
        left += element.offsetLeft || 0
        element = element.offsetParent
      } while (element)

      return {
        top: top,
        left: left,
      }
    }

    emojisplosion({
      physics: {
        fontSize: {
          max: 43,
          min: 24,
        },
      },
      //emoji hook
      emojis: ['🪝', '🦄'],
      position() {
        // https://stackoverflow.com/questions/1480133
        const offset = cumulativeOffset(element)

        return {
          x: offset.left + element.clientWidth / 2,
          y: offset.top + element.clientHeight / 2,
        }
      },
    })
  }

  return (
    <div className="flex justify-center">
      <Link
        className="inline-flex items-center rounded-md border-2 border-current px-3 py-1.5 text-xs font-semibold text-gray-900 transition hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-pink-500"
        id="submit-button"
        href="/add-new-hook"
        onClick={() => {
          handleClick()
        }}
      >
        <span className="mr-2">🎉</span> Submit a new Hook
      </Link>
    </div>
  )
}
