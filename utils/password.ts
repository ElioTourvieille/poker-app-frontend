import { randomBytes, pbkdf2Sync } from 'crypto';

// Constants for the password hashing
const SALT_LENGTH = 16; // Length of the salt in bytes
const HASH_LENGTH = 64; // Length of the final hash in bytes
const ITERATIONS = 10000; // Number of iterations for PBKDF2

/**
 * Salts and hashes a password using PBKDF2
 * @param password - The plain text password to hash
 * @returns The hashed password string in format: 'hash:salt'
 */
export function saltAndHashPassword(password: string): string {
  // Generate a random salt
  const salt = randomBytes(SALT_LENGTH).toString('hex');
  
  // Hash the password with the salt using PBKDF2
  const hash = pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    HASH_LENGTH,
    'sha512'
  ).toString('hex');

  // Return the combined hash:salt string
  return `${hash}:${salt}`;
}

/**
 * Verifies a password against a stored hash
 * @param password - The plain text password to verify
 * @param storedHash - The stored hash:salt string
 * @returns boolean indicating if the password matches
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  // Split the stored hash string to get the salt
  const [hash, salt] = storedHash.split(':');

  // Hash the provided password with the stored salt
  const verifyHash = pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    HASH_LENGTH,
    'sha512'
  ).toString('hex');

  // Compare the hashes
  return hash === verifyHash;
} 