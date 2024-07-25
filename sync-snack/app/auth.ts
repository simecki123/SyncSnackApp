import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        if (!res.ok) {
          throw new Error("Invalid credentials...")
        }


        const token = await res.json()

        const user = await fetch(`${process.env.BACKEND_URL}/api/auth/fetchMe`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.accessToken}`
          },
        })

        if (!user.ok) {
          throw new Error("Invalid credentials...")
        }

        let returnUser = await user.json()
        returnUser.accessToken = token?.accessToken;

        console.log(returnUser, 'user user user')

        return returnUser;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
  },
},
)

