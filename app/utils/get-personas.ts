import { sql } from '@vercel/postgres'
import type { UserProps } from '../types'

export async function getPersonas() {
  const { rows } = (await sql`SELECT * from users`) as {
    rows: UserProps[]
  }

  return rows
}
