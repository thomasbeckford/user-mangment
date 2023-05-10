import { db } from '@vercel/postgres'

export async function GET() {
  const client = await db.connect()
  const result = await client.query('SELECT * FROM users')
  client.release()

  return new Response(JSON.stringify(result.rows), {
    headers: { 'content-type': 'application/json' },
  })
}

export async function POST(request: Request) {
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

export async function PUT(request: Request) {
  try {
    const { persona } = await request.json()
    const { id, name, email, image } = persona

    const client = await db.connect()
    const result = await client.query(
      `UPDATE users SET name = '${name}', email = '${email}', image = '${image}' WHERE id = ${id}`
    )
    client.release()

    return new Response(JSON.stringify(result.rows), {
      headers: { 'content-type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
}
