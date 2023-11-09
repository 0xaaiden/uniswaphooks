import { SessionProvider } from 'next-auth/react'
import AuthentificationScreen from '@component/AuthenticationScreen'

export default function Page() {

  return (
    <SessionProvider>
      <AuthentificationScreen />
    </SessionProvider>
  )
}
