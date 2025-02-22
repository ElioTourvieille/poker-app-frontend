import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import Discord from "next-auth/providers/discord"
import { signInSchema } from "./lib/zod"
// Your own logic for dealing with plaintext password strings; be careful!
import { hashPassword } from "./utils/password"
import { getUserFromDb } from "./utils/db"
 
export const { handlers, auth } = NextAuth({
  providers: [
    Discord,
    Credentials({
      // Customizing the Credentials provider
      name: "Email",
      credentials: {
        email: { 
          label: "Adresse email",
          type: "email",
          placeholder: "exemple@domain.com"
        },
        password: { 
          label: "Mot de passe",
          type: "password",
          placeholder: "••••••••"
        },
      },
      authorize: async (credentials) => {
        try {
          let user = null
 
          const { email, password } = await signInSchema.parseAsync(credentials)
 
          // logic to salt and hash password
          const pwHash = hashPassword(password)
 
          // logic to verify if the user exists
          user = await getUserFromDb(email, pwHash)
 
          if (!user) {
            throw new Error("Invalid credentials.")
          }
 
          // return JSON object with the user data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "light",
    logo: "/img/logo.png",
  },
})