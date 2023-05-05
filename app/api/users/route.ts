import { db } from '@vercel/postgres'

export async function GET(request: Request, response: any) {
  const client = await db.connect()
  const result = await client.query('SELECT * FROM users')
  client.release()

  return new Response(JSON.stringify(result.rows), {
    headers: { 'content-type': 'application/json' },
  })
}

export async function POST(request: Request, response: any) {
  const { persona } = await request.json()
  const { name, email, image } = persona

  const client = await db.connect()
  const result = await client.query(
    `INSERT INTO users (name, email, image) VALUES ('${name}', '${email}', '${image}')`
  )
  client.release()

  return new Response(JSON.stringify(result.rows), {
    headers: { 'content-type': 'application/json' },
  })
}
