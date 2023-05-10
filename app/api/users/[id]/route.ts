import { db } from '@vercel/postgres'

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params

    const client = await db.connect()
    const result = await client.query(`DELETE FROM users WHERE id = ${id}`)
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
