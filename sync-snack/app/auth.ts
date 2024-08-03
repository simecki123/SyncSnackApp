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
        try {
          let user = null

          const { email, password } = credentials

          user = { email: 'pero' }

          if (!user) {
            throw new Error("User not found.")
          }

          // return JSON object with the user data
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
})

