import { sql } from '@vercel/postgres'
import type { UserProps } from '@/types'

export async function getPersonas() {
  try {
    const { rows } = (await sql`SELECT * from users`) as {
      rows: UserProps[]
    }

    return rows
  } catch (error) {
    console.error(error)
  }
}
