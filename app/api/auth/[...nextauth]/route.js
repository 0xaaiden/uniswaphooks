import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

/* import prisma from '@lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
 */
const handler = NextAuth({
  /*   adapter: PrismaAdapter(prisma),
   */
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
})

export { handler as GET, handler as POST }
