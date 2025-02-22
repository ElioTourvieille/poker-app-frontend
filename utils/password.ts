import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10; // Number of rounds for salt

/**
 * Hash a password using bcrypt
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a stored hash
 * @param password - The plain text password to verify
 * @param hashedPassword - The stored hash
 * @returns boolean indicating if the password matches
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
} 