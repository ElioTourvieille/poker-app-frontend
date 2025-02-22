import { User } from "next-auth"

export async function getUserFromDb(email: string, passwordHash: Promise<string>): Promise<any> {
  try {
    // TODO: Implement this
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return null
  }
} 