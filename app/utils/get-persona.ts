import { sql } from '@vercel/postgres'
import type { UserProps } from '../types'

export async function getPersona(persona: number) {
  const { rows } = (await sql`SELECT * from users WHERE id = ${persona}`) as {
    rows: UserProps[]
  }

  return rows
}
