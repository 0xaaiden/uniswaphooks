'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function Ads() {
  const routerPathname = usePathname()

  useEffect(() => {

    const chatScript = document.createElement('script')
    chatScript.src = "https://chat.fn03.xyz/chat.js"
    chatScript.async = true


    document.body.appendChild(chatScript)

  }, [routerPathname])

  return (
    <Script
    strategy='afterInteractive'
        src="https://chat.fn03.xyz/chat.js"
        onLoad={() => {
          console.log('chat loaded')

            var chatConfig = {
              token: 'O31Eo7GPVzdYKwQNPTue',
    
            }
            initializeChatWidget(chatConfig)

        }
      }
        
      />

  )
}

