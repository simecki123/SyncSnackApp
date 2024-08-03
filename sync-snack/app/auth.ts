import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { fetchImproved } from "./fetch"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//
//         const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
//           method: "POST",
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(credentials),
//         })
//
//         const token = await res.json()
//
//         const user = await fetch(`${process.env.BACKEND_URL}/api/auth/fetchMe`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token?.accessToken}`
//           },
//         })
//
//         if (!user.ok) {
//           throw new Error("Invalid credentials...")
//         }
//
//         let returnUser = await user.json()
//         returnUser.accessToken = token?.accessToken;
//
//         return returnUser;
//       }
//     })
//   ],
//   session: {
//     strategy: 'jwt',
//     maxAge: 60 * 60 * 24
//   },
//   callbacks: {
//     async signIn() {
//       return true;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: any, token: any }) {
//       if (token.user) {
//         session.user = token.user;
//       }
//       return session;
//     }
//   },
//   pages: {
//     signIn: '/login'
//   }
// },
// )

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        console.log(credentials, '>>> user credentials')

        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        if (!res.ok) {
          return null
        }

        const token = await res.json()
        console.log('token retrieved')

        const user = await fetch(`${process.env.BACKEND_URL}/api/auth/fetchMe`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.accessToken}`
          },
        })

        if (!user.ok) {
          console.log('the user is NOT ok')
          return null
        }

        let returnUser = await user.json()
        returnUser.accessToken = token?.accessToken;

        console.log(returnUser, 'returned user')

        return returnUser;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
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
    },
    async redirect({ url, baseUrl }) {
      console.log(url, 'url in callback')
      console.log(baseUrl, 'baseUrl in callback')
      return baseUrl
    },
  },
  pages: {
    signIn: '/signin',
  },
})

