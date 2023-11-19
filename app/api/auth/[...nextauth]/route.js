import NextAuth from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_URL_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_URL_GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const allowedEmails = ['malekgarahellalbus@gmail.com', 'aiden@fn03.xyz']
      if (user.email && allowedEmails.includes(user.email)) {
        return true
      } else {
        return false
      }
    },

    async session(session, user) {
      return {
        ...session,
        user: user,
      }
    },
  },
})

export { handler as GET, handler as POST }