"use client"

import { useSession } from 'next-auth/react'
import UnauthentificationScreen from '@component/UnauthenticatedScreen'

export default function AuthentificationScreen() {
  const { data: session } = useSession()

  if (!session) {
    return <UnauthentificationScreen />
  }

  console.log(session)
  return (
    <div>
      <h1>Authentification</h1>
    </div>
  )
}
