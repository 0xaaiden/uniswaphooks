import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

import prisma from '@lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async session(session, user) {
      return {
        ...session,
        user: user,
      }
    },
  },
}

export default NextAuth(authOptions)
