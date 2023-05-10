import { sql } from '@vercel/postgres'
import type { UserProps } from '@/types'

export async function getPersona(persona: number) {
  try {
    const { rows } = (await sql`SELECT * from users WHERE id = ${persona}`) as {
      rows: UserProps[]
    }
    const data = rows[0]

    return data
  } catch (error) {
    console.error(error)
  }
}
