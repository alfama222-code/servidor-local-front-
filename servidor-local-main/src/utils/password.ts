import { hash, compare } from "bcrypt"

export async function hashPassword(passwordEmTexto: string) {
  return  await hash(passwordEmTexto, 12)
}

export async function comparePassword(passwordEmTexto: string, passwordEmHash: string) {
  return await compare(passwordEmTexto, passwordEmHash)
}
