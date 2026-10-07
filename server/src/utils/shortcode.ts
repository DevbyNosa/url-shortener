import { customAlphabet } from "nanoid";

const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";

const generate = customAlphabet(ALPHABET, 7);

export function generateShortCode(): string {
  return generate();
}